/*
	eslint callback-return: 0, max-depth: 0
*/

"use strict";

// deps

	// natives
	const { join } = require("path");
	const { parse } = require("url");

	// locals
	const MediatorUser = require(join(__dirname, "MediatorUser.js"));
	const errToString = require(join(__dirname, "..", "utils", "errToString.js"));
	const send = require(join(__dirname, "..", "utils", "send.js"));

// consts

	const WEBSOCKET_STATE_OPEN = 1;

// module

module.exports = class Server extends MediatorUser {

	constructor (opt) {

		super(opt);

		this._socketServer = null;

	}

	// public

		appMiddleware (req, res, next) { // req, res, next : void

			this.checkDescriptor().then(() => {

				const { pathname, query } = parse(req.url, true);
				const method = req.method.toLowerCase();

				// pathname without path parameters
				let path = this._Descriptor.paths[pathname] ? pathname : "";

				// pathname with path parameters
				if (!path) {

					const pathnamePaths = pathname.substr(1, pathname.length).split("/");

					path = Object.keys(this._Descriptor.paths).filter((p) => {

						const pathPaths = p.split("/").filter((d) => {
							return "" !== d;
						});

						if (pathPaths.length !== pathnamePaths.length) {
							return false;
						}
						else {

							for (let i = 0; i < pathPaths.length; ++i) {

								if (!pathPaths[i].includes("{") && pathPaths[i] !== pathnamePaths[i]) {
									return false;
								}

							}

							return true;

						}

					})[0] || "";

				}

				if (!path || !this._Descriptor.paths[path] || !this._Descriptor.paths[path][method]) {
					next();
				}
				else {

					const { operationId } = this._Descriptor.paths[path][method];

					if ("/" + this._Descriptor.info.title + "/descriptor" === path && "get" === method) {
						send(req, res, this._Descriptor, 200);
					}

					// missing operationId
					else if (!operationId) {

						send(req, res, {
							"code": "NOT_IMPLEMENTED",
							"message": "Missing \"operationId\" in the Descriptor for this request"
						}, 501);

					}

					// not implemented operationId
					else if ("function" !== typeof this._Mediator[operationId]) {

						send(req, res, {
							"code": "NOT_IMPLEMENTED",
							"message": "Unknown Mediator's \"operationId\" method for this request"
						}, 501);

					}

					else {

						if (path.includes("{")) {

							const pathnamePaths = pathname.substr(1, pathname.length).split("/");
							const pathPaths = path.substr(1, path.length).split("/");

							for (let i = 0; i < pathPaths.length; ++i) {

								if (pathPaths[i].includes("{")) {
									query[pathPaths[i].replace("{", "").replace("}", "")] = pathnamePaths[i];
								}

							}

						}

						new Promise((resolve) => {

							let queryData = "";
							req.on("data", (data) => {
								queryData += data.toString("utf8");
							}).on("end", () => {
								resolve("" !== queryData ? JSON.parse(queryData) : null);
							});

						}).then((bodyParams) => {

							return this._Mediator[operationId](query, bodyParams);

						}).then((content) => {

							// created
							if ("put" === method) {
								send(req, res, content, 201);
							}

							// no content get
							else if ("get" === method && ("undefined" === typeof content || null === content)) {
								send(req, res, content, 404);
							}

							// no content
							else if ("undefined" === typeof content) {
								send(req, res, content, 204);
							}

							else {
								send(req, res, content, 200);
							}

						}).catch((err) => {

							if (err instanceof ReferenceError) {

								send(req, res, {
									"code": "MISSING_PARAMETER",
									"message": errToString(err)
								}, 400);

							}
							else if (err instanceof TypeError) {

								send(req, res, {
									"code": "WRONG_TYPE_PARAMETER",
									"message": errToString(err)
								}, 400);

							}
							else if (err instanceof RangeError) {

								send(req, res, {
									"code": "RANGE_OR_EMPTY_PARAMETER",
									"message": errToString(err)
								}, 400);

							}
							else {

								send(req, res, {
									"code": "INTERNAL_SERVER_ERROR",
									"message": errToString(err)
								}, 500);

							}

						});

					}

				}

			}).catch((err) => {

				this.emit("error", err);

				send(req, res, {
					"code": "INTERNAL_SERVER_ERROR",
					"message": errToString(err)
				}, 500);

			});

		}

		socketMiddleware (socketServer) { // socket : WebSocket | SocketIO
			this._socketServer = socketServer;
		}

		push (command, data) {

			this.checkDescriptor().then(() => {

				if (this._Descriptor && this._Descriptor.info && this._Descriptor.info.title && this._socketServer) {

					let result = {
						"plugin": this._Descriptor.info.title,
						"command": command
					};

						if ("undefined" !== typeof data) {
							result.data = data;
						}

					result = JSON.stringify(result);

					this._socketServer.clients.forEach((client) => {

						if (WEBSOCKET_STATE_OPEN === client.readyState) {
							client.send(result);
						}

					});

				}

			}).catch((err) => {
				this.emit("error", err);
			});

			return this;

		}

		// init / release

			init (...data) {

				return this.checkDescriptor().then(() => {
					return this.checkMediator();
				}).then(() => {
					return this._initWorkSpace(...data);
				});

			}

			release (...data) {

				return this._releaseWorkSpace(...data).then((...result) => {

					// can only be released by Orchestrator
					if (this._Descriptor) {
						this._Descriptor = null;
					}

					// can only be released by Orchestrator
					if (this._Mediator) {
						this._Mediator = null;
					}

					this._externalRessourcesDirectory = "";

					return Promise.resolve(...result);

				}).then((...result) => {

					this._socketServer = null;

					this.removeAllListeners();

					return Promise.resolve(...result);

				});

			}

};
