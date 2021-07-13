/*
	eslint-disable complexity, max-statements, no-undefined, max-lines
*/

"use strict";

// deps

	// natives
	const { join } = require("path");
	const { parse } = require("url");
	const { EOL } = require("os");

	// externals
	let SwaggerParser = null; // hotload

	// locals
	const MediatorUser = require(join(__dirname, "MediatorUser.js"));
	const { checkInteger, checkNonEmptyObject, checkNonEmptyString } = require(join(__dirname, "..", "checkers", "main.js"));
	const errToString = require(join(__dirname, "..", "utils", "errToString.js"));
	const { extractPattern, extractParams, extractSchemaType } = require(join(__dirname, "..", "utils", "descriptor", "main.js"));
	const { extractBody, extractIp, extractCookies } = require(join(__dirname, "..", "utils", "request", "main.js"));
	const send = require(join(__dirname, "..", "utils", "send.js"));

// consts

	const WEBSOCKET_STATE_OPEN = 1;

// module

module.exports = class Server extends MediatorUser {

	constructor (opt) {

		super(opt);

		this._socketServer = null;
		this._checkParameters = true;
		this._checkResponse = false;
		this._cors = false;

	}

	// public

		disableCheckParameters () {
			this._checkParameters = false; return this;
		}

		enableCheckParameters () {
			this._checkParameters = true; return this;
		}

		disableCheckResponse () {
			this._checkResponse = false; return this;
		}

		enableCheckResponse () {
			this._checkResponse = true; return this;
		}

		disableCors () {
			this._cors = false; return this;
		}

		enableCors () {
			this._cors = true; return this;
		}

		appMiddleware (req, res, next) { // req, res, next : void

			this.checkDescriptor().then(() => {

				if (!this._Descriptor.paths) {
					return next();
				}

				// parse
				const { pathname, query } = parse(req.url, true);
				req.method = req.method.toLowerCase();
				req.pattern = !checkNonEmptyString("pattern", req.pattern, false) ? req.pattern : extractPattern(
					this._Descriptor.paths, pathname, req.method
				);

				if (!req.pattern) {
					return next();
				}

				req.validatedIp = !checkNonEmptyString("ip", req.validatedIp, false) ? req.validatedIp : extractIp(req);

				// url
				req.headers = !checkNonEmptyObject("headers", req.headers, false) ? req.headers : {};
				req.cookies = !checkNonEmptyObject("cookies", req.cookies, false) ? req.cookies : extractCookies(req);
				req.query = !checkNonEmptyObject("query", req.query, false) ? req.query : query || {};
				req.params = !checkNonEmptyObject("params", req.params, false) ? req.params : extractParams(req.pattern, pathname);

				// ensure content length formate
				if ("string" === typeof req.headers["content-length"]) {
					req.headers["content-length"] = parseInt(req.headers["content-length"], 10);
				}

				// set default content-typ
				if ("string" !== typeof req.headers["content-length"]) {
					req.headers["content-type"] = "application/json";
				}

				if (!req.pattern || !this._Descriptor.paths[req.pattern] || !this._Descriptor.paths[req.pattern][req.method]) {
					return next();
				}

				const { operationId } = this._Descriptor.paths[req.pattern][req.method];

				this._log("info", "" +
					"=> [" + req.validatedIp + "] " + req.url + " (" + req.method.toUpperCase() + ")" +
					(operationId ? EOL + "operationId    : " + operationId : "") +
					EOL + "content-type   : " + req.headers["content-type"] +
					(
						"get" !== req.method && req.headers["content-length"] && 4 < req.headers["content-length"] ?
							EOL + "content-length : " + req.headers["content-length"] : ""
					)
				);

				// get descriptor
				if ("/" + this._Descriptor.info.title + "/descriptor" === req.pattern && "get" === req.method) {

					return new Promise((resolve, reject) => {

						if (null === SwaggerParser) {
							SwaggerParser = require("@apidevtools/swagger-parser");
						}

						SwaggerParser.validate(this._Descriptor, (err, api) => {
							return err ? reject(err) : resolve(api);
						});

					}).then((api) => {

						this._log("info", "<= [" + req.validatedIp + "] " + JSON.stringify(api));
						return send(req, res, 200, api, this._Descriptor.info.version, this._cors);

					}).catch((err) => {

						this.emit("error", err);

						const result = {
							"code": "INTERNAL_SERVER_ERROR",
							"message": errToString(err)
						};

						this._log("error", "<= " + JSON.stringify(result));
						return send(req, res, 500, result, this._Descriptor.info.version, this._cors);

					});

				}

				// get plugin status
				else if ("/" + this._Descriptor.info.title + "/status" === req.pattern && "get" === req.method) {

					const initialized = this.initialized && this._Mediator.initialized;
					const status = initialized ? "INITIALIZED" : "ENABLED";

					this._log("info", "<= [" + req.validatedIp + "] " + status);
					return send(req, res, 200, status, this._Descriptor.info.version, this._cors);

				}

				// missing operationId
				else if (!operationId) {

					const result = {
						"code": "NOT_IMPLEMENTED",
						"message": "Missing \"operationId\" in the Descriptor for this request"
					};

					this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
					return send(req, res, 501, result, this._Descriptor.info.version, this._cors);

				}

				// not implemented operationId
				else if ("function" !== typeof this._Mediator[operationId]) {

					const result = {
						"code": "NOT_IMPLEMENTED",
						"message": "Unknown Mediator's \"operationId\" method for this request"
					};

					this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
					return send(req, res, 501, result, this._Descriptor.info.version, this._cors);

				}

				// no "Content-Length" header found
				else if ("get" !== req.method && null !== checkInteger(
					"headers[\"content-length\"]", req.headers["content-length"], false
				)) {

					const result = {
						"code": "MISSING_HEADER",
						"message": "No valid \"Content-Length\" header found"
					};

					this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
					return send(req, res, 411, result, this._Descriptor.info.version, this._cors);

				}

				else {

					// force formate for path parameters
					return Promise.resolve().then(() => {

						const keys = Object.keys(req.params);
						return !keys.length ? Promise.resolve() : Promise.resolve().then(() => {

							const docParameters = this._Descriptor.paths[req.pattern][req.method].parameters.filter((p) => {
								return "path" === p.in;
							});

							return !docParameters.length ? Promise.resolve() : Promise.resolve().then(() => {

								let err = null;
								for (let i = 0; i < keys.length; ++i) {

									const key = keys[i];

									const schema = docParameters.find((dp) => {
										return dp.name === key;
									}).schema || null;

									if (!schema) {
										err = new ReferenceError("Unknown parameter: request.params['" + key + "']"); break;
									}

									switch (extractSchemaType(schema, this._Descriptor.components.schemas)) {

										case "boolean":

											if ("boolean" !== typeof req.params[key]) {

												if ("true" === req.params[key]) {
													req.params[key] = true;
												}
												else if ("false" === req.params[key]) {
													req.params[key] = false;
												}
												else {

													err = new TypeError(
														"Error while validating request: request.params['" + key + "'] should be boolean"
													); break;

												}

											}

										break;

										case "integer":

											// error returned, not an integer
											if (checkInteger("request.params['" + key + "']", req.params[key], false)) {

												const value = parseInt(req.params[key], 10);

												if (!Number.isNaN(value)) {
													req.params[key] = value;
												}
												else {

													err = new TypeError(
														"Error while validating request: request.params['" + key + "'] should be integer"
													); break;

												}

											}

										break;

										case "number":

											if ("number" !== typeof req.params[key]) {

												const value = parseFloat(req.params[key]);

												if (!Number.isNaN(value)) {
													req.params[key] = value;
												}
												else {

													err = new TypeError(
														"Error while validating request: request.params['" + key + "'] should be number"
													); break;

												}

											}

										break;

										default:
											// nothing to do here
										break;

									}

								}

								return err ? Promise.reject(err) : Promise.resolve();

							});

						});

					// extract body
					}).then(() => {

						if ("get" === req.method.toLowerCase()) {
							return Promise.resolve({});
						}
						else if (!checkNonEmptyObject("body", req.body, false)) {
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

					// formate data
					}).then((body) => {

						const parsed = {
							"url": {
								"path": req.params,
								"query": req.query,
								"headers": req.headers,
								"cookies": req.cookies
							},
							body
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

							if ("undefined" === typeof content || null === content) {
								this._log("success", "<= [" + req.validatedIp + "] no content");
								return send(req, res, 201, undefined, this._Descriptor.info.version, this._cors);
							}

							else {
								this._log("success", "<= [" + req.validatedIp + "] " + JSON.stringify(content));
								return send(req, res, 201, content, this._Descriptor.info.version, this._cors);
							}

						}

						// no content
						else if ("undefined" === typeof content || null === content) {
							this._log("warning", "<= [" + req.validatedIp + "] no content");
							return send(req, res, 204, undefined, this._Descriptor.info.version, this._cors);
						}

						else {
							this._log("success", "<= [" + req.validatedIp + "] " + JSON.stringify(content));
							return send(req, res, 200, content, this._Descriptor.info.version, this._cors);
						}

					}).catch((err) => {

						if (err instanceof ReferenceError) {

							const result = {
								"code": "MISSING_PARAMETER",
								"message": errToString(err)
							};

							this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
							return send(req, res, 400, result, this._Descriptor.info.version, this._cors);

						}
						else if (err instanceof TypeError) {

							const result = {
								"code": "WRONG_TYPE_PARAMETER",
								"message": errToString(err)
							};

							this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
							return send(req, res, 400, result, this._Descriptor.info.version, this._cors);

						}
						else if (err instanceof RangeError) {

							const result = {
								"code": "EMPTY_OR_RANGE_OR_ENUM_PARAMETER",
								"message": errToString(err)
							};

							this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
							return send(req, res, 400, result, this._Descriptor.info.version, this._cors);

						}
						else if (err instanceof SyntaxError) {

							const result = {
								"code": "JSON_PARSE",
								"message": errToString(err)
							};

							this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
							return send(req, res, 400, result, this._Descriptor.info.version, this._cors);

						}
						else {

							const result = {
								"code": "INTERNAL_SERVER_ERROR",
								"message": errToString(err)
							};

							this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
							return send(req, res, 500, result, this._Descriptor.info.version, this._cors);

						}

					// check response
					}).then(() => {

						return this._checkResponse ? this._Mediator.checkResponse(operationId, res) : Promise.resolve();

					});

				}

			}).then(() => {

				// nothing to do here
				// must not be blocking in http server or express app

			}).catch((err) => {

				this._log("error", JSON.stringify({
					"code": "INTERNAL_SERVER_ERROR",
					"message": errToString(err)
				}));

				this.emit("error", err);

			});

		}

		socketMiddleware (socketServer) { // socket : WebSocket | SocketIO
			this._socketServer = socketServer;
		}

		push (command, data, log = true) {

			this.checkDescriptor().then(() => {

				if (this._socketServer) {

					let result = {
						"plugin": this._Descriptor.info.title,
						command
					};

						if ("undefined" !== typeof data) {
							result.data = data;
						}

					result = JSON.stringify(result);

					if (log) {
						this._log("info", "<= [PUSH] " + result, true);
					}

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
				}).then(() => {

					this.initialized = true;
					this.emit("initialized", ...data);

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
					this._socketServer = null;

					this.initialized = false;
					this.emit("released", ...data);

				}).then(() => {

					this.removeAllListeners();

				});

			}

};
