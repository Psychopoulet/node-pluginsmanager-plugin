/*
	eslint complexity: 0, max-statements: 0
*/

"use strict";

// deps

	// natives
	const { join } = require("path");
	const { parse } = require("url");
	const { EOL } = require("os");

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

				const ip = ((req.headers["x-forwarded-for"] || "").split(",").pop() ||
					req.connection.remoteAddress ||
					req.socket.remoteAddress ||
					req.connection.socket.remoteAddress)
						.replace("::ffff:", "")
						.replace("localhost", "127.0.0.1")
						.replace("::1", "127.0.0.1");

				const path = extractPath(this._Descriptor.paths, pathname);

				if (!path || !this._Descriptor.paths[path] || !this._Descriptor.paths[path][method]) {
					return next();
				}

				const { operationId } = this._Descriptor.paths[path][method];

				this._log("info", "" +
					"=> [" + ip + "] " + req.url + " (" + method.toUpperCase() + ")" +
					(operationId ? EOL + "operationId    : " + operationId : "") +
					(req.headers["content-type"] ? EOL + "content-type   : " + req.headers["content-type"] : "") +
					(
						"get" !== method && req.headers["content-length"] && 4 < req.headers["content-length"] ?
							EOL + "content-length : " + req.headers["content-length"] : ""
					)
				);

				if ("/" + this._Descriptor.info.title + "/descriptor" === path && "get" === method) {

					this._log("info", "<= [" + ip + "] " + JSON.stringify(this._Descriptor));
					send(req, res, this._Descriptor, 200);

				}

				// missing operationId
				else if (!operationId) {

					const result = {
						"code": "NOT_IMPLEMENTED",
						"message": "Missing \"operationId\" in the Descriptor for this request"
					};

					this._log("error", "<= [" + ip + "] " + JSON.stringify(result));
					send(req, res, result, 501);

				}

				// not implemented operationId
				else if ("function" !== typeof this._Mediator[operationId]) {

					const result = {
						"code": "NOT_IMPLEMENTED",
						"message": "Unknown Mediator's \"operationId\" method for this request"
					};

					this._log("error", "<= [" + ip + "] " + JSON.stringify(result));
					send(req, res, result, 501);

				}

				// no "Content-Type" header found
				else if (
					"object" !== typeof req.headers ||
					null === req.headers ||
					"undefined" === typeof req.headers["content-type"]
				) {

					const result = {
						"code": "MISSING_HEADER",
						"message": "No \"Content-Type\" header found"
					};

					this._log("error", "<= [" + ip + "] " + JSON.stringify(result));
					send(req, res, result, 400);

				}

				// no "Content-Length" header found
				else if ("get" !== method && (
					"object" !== typeof req.headers ||
					null === req.headers ||
					"undefined" === typeof req.headers["content-length"]
				)) {

					const result = {
						"code": "MISSING_HEADER",
						"message": "No \"Content-Length\" header found"
					};

					this._log("error", "<= [" + ip + "] " + JSON.stringify(result));
					send(req, res, result, 411);

				}

				// "Content-Length" header is not a number
				else if (
					"get" !== method &&
					Number.isNaN(parseInt(req.headers["content-length"], 10))
				) {

					const result = {
						"code": "MISSING_HEADER",
						"message": "\"Content-Length\" header is not a number"
					};

					this._log("error", "<= [" + ip + "] " + JSON.stringify(result));
					send(req, res, result, 411);

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

										if (queryData.length) {
											this._log("log", queryData);
										}

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
							this._log("success", "<= [" + ip + "] " + content);
							send(req, res, content, 201);
						}

						// no content get
						else if ("get" === method && ("undefined" === typeof content || null === content)) {
							this._log("warning", "<= [" + ip + "] not found");
							send(req, res, content, 404);
						}

						// no content
						else if ("undefined" === typeof content) {
							this._log("warning", "<= [" + ip + "] no content");
							send(req, res, content, 204);
						}

						else {
							this._log("success", "<= [" + ip + "] " + JSON.stringify(content));
							send(req, res, content, 200);
						}

					}).catch((err) => {

						if (err instanceof ReferenceError) {

							const result = {
								"code": "MISSING_PARAMETER",
								"message": errToString(err)
							};

							this._log("error", "<= [" + ip + "] " + JSON.stringify(result));
							send(req, res, result, 400);

						}
						else if (err instanceof TypeError) {

							const result = {
								"code": "WRONG_TYPE_PARAMETER",
								"message": errToString(err)
							};

							this._log("error", "<= [" + ip + "] " + JSON.stringify(result));
							send(req, res, result, 400);

						}
						else if (err instanceof RangeError) {

							const result = {
								"code": "RANGE_OR_EMPTY_PARAMETER",
								"message": errToString(err)
							};

							this._log("error", "<= [" + ip + "] " + JSON.stringify(result));
							send(req, res, result, 400);

						}
						else if (err instanceof SyntaxError) {

							const result = {
								"code": "JSON_PARSE",
								"message": errToString(err)
							};

							this._log("error", "<= [" + ip + "] " + JSON.stringify(result));
							send(req, res, result, 400);

						}
						else {

							const result = {
								"code": "INTERNAL_SERVER_ERROR",
								"message": errToString(err)
							};

							this._log("error", "<= [" + ip + "] " + JSON.stringify(result));
							send(req, res, result, 500);

						}

					});

				}

				return Promise.resolve(); // for eslint

			}).catch((err) => {

				this.emit("error", err);

				const result = {
					"code": "INTERNAL_SERVER_ERROR",
					"message": errToString(err)
				};

				this._log("error", "<= " + JSON.stringify(result));
				send(req, res, result, 500);

			});

		}

		socketMiddleware (socketServer) { // socket : WebSocket | SocketIO
			this._socketServer = socketServer;
		}

		push (command, data) {

			this.checkDescriptor().then(() => {

				if (this._socketServer) {

					let result = {
						"plugin": this._Descriptor.info.title,
						"command": command
					};

						if ("undefined" !== typeof data) {
							result.data = data;
						}

					result = JSON.stringify(result);

					this._log("info", "<= [PUSH] " + result, true);

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

				return this._releaseWorkSpace(...data).then(() => {

					// can only be released by Orchestrator
					if (this._Descriptor) {
						this._Descriptor = null;
					}

					// can only be released by Orchestrator
					if (this._Mediator) {
						this._Mediator = null;
					}

					this._externalRessourcesDirectory = "";

				}).then(() => {

					this._socketServer = null;

					this.removeAllListeners();

				});

			}

};
