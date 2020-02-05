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
	const { checkNonEmptyInteger } = require(join(__dirname, "..", "checkers", "main.js"));
	const errToString = require(join(__dirname, "..", "utils", "errToString.js"));
	const { extractPattern, extractParams } = require(join(__dirname, "..", "utils", "descriptor", "main.js"));
	const { extractBody, extractIp } = require(join(__dirname, "..", "utils", "request", "main.js"));
	const send = require(join(__dirname, "..", "utils", "send.js"));

// consts

	const WEBSOCKET_STATE_OPEN = 1;

// private

	// methods

		/**
			Asynchrous check without error
			@param {object} obj: Data to check
			@returns {boolean} Check result
		*/
		function _isNonEmptyObject (obj) {
			return "object" === typeof obj && Object.keys(obj).length;
		}

// module

module.exports = class Server extends MediatorUser {

	constructor (opt) {

		super(opt);

		this._socketServer = null;
		this._checkParameters = true;
		this._pluginName = "";

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

				if (!this._pluginName) {
					this._pluginName = this._Descriptor.info.title;
				}

				if (!this._Descriptor.paths) {
					return next();
				}

				const { pathname, query } = parse(req.url, true);

				req.headers = _isNonEmptyObject(req.headers) ? req.headers : {};
				req.cookies = _isNonEmptyObject(req.cookies) ? req.cookies : {}; // @TODO
				req.pathname = req.pathname ? req.pathname : pathname;
				req.query = _isNonEmptyObject(req.query) ? req.query : query || {};
				req.method = req.method.toLowerCase();
				req.validatedIp = extractIp(req);
				req.pattern = extractPattern(this._Descriptor.paths, req.pathname, req.method);

				if (!req.pattern || !this._Descriptor.paths[req.pattern] || !this._Descriptor.paths[req.pattern][req.method]) {
					return next();
				}

				const { operationId } = this._Descriptor.paths[req.pattern][req.method];

				this._log("info", "" +
					"=> [" + req.validatedIp + "] " + req.url + " (" + req.method.toUpperCase() + ")" +
					(operationId ? EOL + "operationId    : " + operationId : "") +
					(req.headers["content-type"] ? EOL + "content-type   : " + req.headers["content-type"] : "") +
					(
						"get" !== req.method && req.headers["content-length"] && 4 < req.headers["content-length"] ?
							EOL + "content-length : " + req.headers["content-length"] : ""
					)
				);

				if ("/" + this._Descriptor.info.title + "/descriptor" === req.pattern && "get" === req.method) {

					this._log("info", "<= [" + req.validatedIp + "] " + JSON.stringify(this._Descriptor));
					send(req, res, this._Descriptor, 200);

				}

				// missing operationId
				else if (!operationId) {

					const result = {
						"code": "NOT_IMPLEMENTED",
						"message": "Missing \"operationId\" in the Descriptor for this request"
					};

					this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
					send(req, res, result, 501);

				}

				// not implemented operationId
				else if ("function" !== typeof this._Mediator[operationId]) {

					const result = {
						"code": "NOT_IMPLEMENTED",
						"message": "Unknown Mediator's \"operationId\" method for this request"
					};

					this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
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

					this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
					send(req, res, result, 400);

				}

				// no "Content-Length" header found
				else if ("get" !== req.method && (
					"object" !== typeof req.headers ||
					null === req.headers ||
					"undefined" === typeof req.headers["content-length"]
				)) {

					const result = {
						"code": "MISSING_HEADER",
						"message": "No \"Content-Length\" header found"
					};

					this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
					send(req, res, result, 411);

				}

				else {

					// "Content-Length" header is not a number
					new Promise((resolve) => {

						if ("string" === typeof req.headers["content-length"]) {
							req.headers["content-length"] = parseInt(req.headers["content-length"], 10);
						}

						checkNonEmptyInteger("Content-Length", req.headers["content-length"]).then(resolve).catch((err) => {

							const result = {
								"code": "MISSING_HEADER",
								"message": err.message ? err.message : err
							};

							this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
							send(req, res, result, 411);

						});

					}).then(() => {

						req.params = _isNonEmptyObject(req.params) ? req.params :
							extractParams(req.pattern, req.pathname);

					}).then(() => {

						if ("get" === req.method.toLowerCase()) {
							return Promise.resolve({});
						}
						else if (_isNonEmptyObject(req.body)) {
							return Promise.resolve(req.body);
						}
						else {

							return extractBody(req).then((body) => {

								req.body = body.parsed;

								if (body.value.length) {
									this._log("log", body.value);
								}

								return Promise.resolve(req.body);

							});

						}

					}).then((body) => {

						const parsed = {
							"url": {
								"path": req.params,
								"query": req.query,
								"headers": req.headers,
								"cookie": req.cookies
							},
							"body": body
						};

						// check parameters
						return Promise.resolve().then(() => {

							return this._checkParameters ? this._Mediator.checkParameters(
								operationId, parsed.url, parsed.body
							) : Promise.resolve();

						// execute Mediator method
						}).then(() => {

							return this._Mediator[operationId](parsed.url, parsed.body);

						});

					// send response
					}).then((content) => {

						// created
						if ("put" === req.method) {
							this._log("success", "<= [" + req.validatedIp + "] " + content);
							send(req, res, content, 201);
						}

						// no content get
						else if ("get" === req.method && ("undefined" === typeof content || null === content)) {
							this._log("warning", "<= [" + req.validatedIp + "] not found");
							send(req, res, content, 404);
						}

						// no content
						else if ("undefined" === typeof content) {
							this._log("warning", "<= [" + req.validatedIp + "] no content");
							send(req, res, content, 204);
						}

						else {
							this._log("success", "<= [" + req.validatedIp + "] " + JSON.stringify(content));
							send(req, res, content, 200);
						}

					}).catch((err) => {

						if (err instanceof ReferenceError) {

							const result = {
								"code": "MISSING_PARAMETER",
								"message": errToString(err)
							};

							this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
							send(req, res, result, 400);

						}
						else if (err instanceof TypeError) {

							const result = {
								"code": "WRONG_TYPE_PARAMETER",
								"message": errToString(err)
							};

							this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
							send(req, res, result, 400);

						}
						else if (err instanceof RangeError) {

							const result = {
								"code": "EMPTY_OR_RANGE_OR_ENUM_PARAMETER",
								"message": errToString(err)
							};

							this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
							send(req, res, result, 400);

						}
						else if (err instanceof SyntaxError) {

							const result = {
								"code": "JSON_PARSE",
								"message": errToString(err)
							};

							this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
							send(req, res, result, 400);

						}
						else {

							const result = {
								"code": "INTERNAL_SERVER_ERROR",
								"message": errToString(err)
							};

							this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
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

				if (!this._pluginName) {
					this._pluginName = this._Descriptor.info.title;
				}

				if (this._socketServer) {

					let result = {
						"plugin": this._pluginName,
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
