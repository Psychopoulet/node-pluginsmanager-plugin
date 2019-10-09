"use strict";

// deps

	// natives
	const { join } = require("path");
	const { parse } = require("url");

	// locals
	const MediatorUser = require(join(__dirname, "MediatorUser.js"));
	const errToString = require(join(__dirname, "..", "utils", "errToString.js"));
	const extractPath = require(join(__dirname, "..", "utils", "checkParameters", "extractFromDescriptor", "extractPath.js"));
	const send = require(join(__dirname, "..", "utils", "send.js"));

// consts

	const WEBSOCKET_STATE_OPEN = 1;

// module

module.exports = class Server extends MediatorUser {

	constructor (opt) {

		super(opt);

		this._socketServer = null;
		this._checkParameters = true;

	}

	// public

		disableCheckParameters () {

			this._checkParameters = false;

			return this;

		}

		enableCheckParameters () {

			this._checkParameters = true;

			return this;

		}

		appMiddleware (req, res, next) { // req, res, next : void

			this.checkDescriptor().then(() => {

				if (!this._Descriptor.paths) {
					return next();
				}

				const { pathname, query } = parse(req.url, true);
				const method = req.method.toLowerCase();

				const path = extractPath(this._Descriptor.paths, pathname);

				if (!path || !this._Descriptor.paths[path] || !this._Descriptor.paths[path][method]) {
					return next();
				}

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

				// no "Content-Type" header found
				else if (
					"object" !== typeof req.headers ||
					null === req.headers ||
					"undefined" === typeof req.headers["content-type"]
				) {

					send(req, res, {
						"code": "MISSING_HEADER",
						"message": "No \"Content-Type\" header found"
					}, 400);

				}

				// no "Content-Length" header found
				else if (
					"object" !== typeof req.headers ||
					null === req.headers ||
					"undefined" === typeof req.headers["content-length"]
				) {

					send(req, res, {
						"code": "MISSING_HEADER",
						"message": "No \"Content-Length\" header found"
					}, 411);

				}

				// "Content-Length" header is not a number
				else if (Number.isNaN(parseInt(req.headers["content-length"], 10))) {

					send(req, res, {
						"code": "MISSING_HEADER",
						"message": "\"Content-Length\" header is not a number"
					}, 411);

				}

				else {

					// extract url path params
					if (path.includes("{")) {

						const pathnamePaths = pathname.substr(1, pathname.length).split("/");
						const pathPaths = path.substr(1, path.length).split("/");

						for (let i = 0; i < pathPaths.length; ++i) {

							if (pathPaths[i].includes("{")) {
								query[pathPaths[i].replace("{", "").replace("}", "")] = pathnamePaths[i];
							}

						}

					}

					// extract body params
					new Promise((resolve, reject) => {

						let queryData = "";
						req.on("data", (data) => {
							queryData += data.toString("utf8");
						}).on("end", () => {

							if ("" === queryData || "null" === queryData) {
								resolve();
							}
							else {

								req.headers["content-length"] = parseInt(req.headers["content-length"], 10);

								if (req.headers["content-length"] !== Buffer.byteLength(queryData)) {

									reject(new Error(
										"\"Content-Length\" header (" + Buffer.byteLength(queryData) + ")" +
										" is not as expected (" + req.headers["content-length"] + ")." +
										" Do not forget the fact that it is a 8-bit bytes number."
									));

								}
								else {

									try {
										resolve(JSON.parse(queryData));
									}
									catch (e) {
										reject(e);
									}

								}

							}

						});

					// ensure body parameters
					}).then((bodyParams) => {

						return Promise.resolve(bodyParams || {});

					}).then((bodyParams) => {

						const contentType = req.headers["content-type"].includes(";") ?
							req.headers["content-type"].split(";")[0].trim() :
							req.headers["content-type"];

						let parsed = {
							"url": query,
							"body": bodyParams
						};

						// check parameters
						return Promise.resolve().then(() => {

							return this._checkParameters ? this._Mediator.checkParameters(
								operationId, query, bodyParams, contentType
							).then((parsedData) => {
								parsed = parsedData;
							}) : Promise.resolve();

						// execute Mediator method
						}).then(() => {

							return this._Mediator[operationId](parsed.url, parsed.body, contentType);

						});

					// send response
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
						else if (err instanceof SyntaxError) {

							send(req, res, {
								"code": "JSON_PARSE",
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

				return Promise.resolve(); // for eslint

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

					// WebSocket
					if (this._socketServer.clients && "function" === typeof this._socketServer.clients.forEach) {

						this._socketServer.clients.forEach((client) => {

							if (WEBSOCKET_STATE_OPEN === client.readyState) {
								client.send(result);
							}

						});

					}

					// SocketIO
					else if (this._socketServer.sockets && "function" === typeof this._socketServer.sockets.emit) {
						this._socketServer.sockets.emit("message", result);
					}

					// unknow
					else {
						this.emit("error", new Error("Unknown socket server type"));
					}

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
