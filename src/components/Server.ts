"use strict";

// deps

	// natives
	import { join } from "path";
	import { parse } from "url";
	import { EOL } from "os";
	import { IncomingMessage, ServerResponse } from "http";

	// externals

	import { OpenApiDocument } from "express-openapi-validate";

	import { Server as WebSocketServer } from "ws";
	import { Server as SocketIOServer } from "socket.io";

	// locals

	import checkInteger from "../checkers/TypeError/checkInteger";
	import checkNonEmptyObject from "../checkers/RangeError/checkNonEmptyObject";
	import checkNonEmptyString from "../checkers/RangeError/checkNonEmptyString";

	import extractPattern from "../utils/descriptor/extractPattern";
	import extractParams from "../utils/descriptor/extractParams";
	import extractSchemaType from "../utils/descriptor/extractSchemaType";
	import extractBody from "../utils/request/extractBody";
	import extractIp from "../utils/request/extractIp";
	import extractCookies from "../utils/request/extractCookies";
	import send from "../utils/send";
	import getUniqueID from "../utils/getUniqueID";
	import cleanSendedError from "../utils/cleanSendedError";

	import MediatorUser, { iMediatorUserOptions } from "./MediatorUser";
	import Mediator from "./Mediator";
	import NotFoundError from "./NotFoundError";

// types & interfaces

	interface iIncomingMessage extends IncomingMessage {
		"pattern": string;
		"validatedIp": string;
		"headers": { [key:string]: any; };
		"cookies": { [key:string]: any; };
		"query": { [key:string]: any; };
		"params": { [key:string]: any; };
	}

// consts

	const WEBSOCKET_STATE_OPEN: number = 1;
	const SERVER_CODES: { [key:string]: number } = require(join(__dirname, "..", "utils", "serverCodes.json"));

// module

// Please note the fact that "init" and "release" method MUST NOT be re-writted. Each child has is own init logic.
export default class Server extends MediatorUser {

	// attributes

		// protected

			protected _socketServer: WebSocketServer | SocketIOServer | null;
			protected _checkParameters: boolean;
			protected _checkResponse: boolean;
			protected _cors: boolean;

	// constructor

	public constructor (opt: iMediatorUserOptions) {

		super(opt);

		this._socketServer = null;
		this._checkParameters = true;
		this._checkResponse = false;
		this._cors = false;

	}

	// protected

		protected _serverType (): "NO_SERVER" | "WEBSOCKET" | "SOCKETIO" | "UNKNOWN" {

			if (!this._socketServer) {
				return "NO_SERVER";
			}
			else if ((this._socketServer as WebSocketServer).clients && "function" === typeof (this._socketServer as WebSocketServer).clients.forEach) {
				return "WEBSOCKET";
			}
			else if ((this._socketServer as SocketIOServer).sockets && "function" === typeof (this._socketServer as SocketIOServer).sockets.emit) {
				return "SOCKETIO";
			}
			else {
				return "UNKNOWN";
			}

		}

	// public

		public disableCheckParameters (): this {
			this._checkParameters = false; return this;
		}

		public enableCheckParameters (): this {
			this._checkParameters = true; return this;
		}

		public disableCheckResponse (): this {
			this._checkResponse = false; return this;
		}

		public enableCheckResponse (): this {
			this._checkResponse = true; return this;
		}

		public disableCors (): this {
			this._cors = false; return this;
		}

		public enableCors (): this {
			this._cors = true; return this;
		}

		public appMiddleware (_req: IncomingMessage | iIncomingMessage, res: ServerResponse, next: Function): void { // req, res, next : void

			const req: iIncomingMessage = _req as iIncomingMessage;

			if (!this._Descriptor) {
				return next();
			}

			if (!(this._Descriptor as OpenApiDocument).paths) {
				return next();
			}

			this.checkDescriptor().then(() => {

				// parse
				const { pathname, query } = parse((req.url as string), true);
				req.method = (req.method as string).toLowerCase();
				req.pattern = !checkNonEmptyString("pattern", req.pattern, false) ? req.pattern : extractPattern(
					(this._Descriptor as OpenApiDocument).paths, pathname, req.method
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
				if ("undefined" === typeof req.headers["content-length"]) {
					req.headers["content-length"] = 0;
				}
				else if ("string" === typeof req.headers["content-length"]) {
					req.headers["content-length"] = parseInt(req.headers["content-length"], 10);
				}

				// set default content-type
				if ("string" !== typeof req.headers["content-type"]) {
					req.headers["content-type"] = "application/json";
				}

				if (!req.pattern || !(this._Descriptor as OpenApiDocument).paths[req.pattern] || !(this._Descriptor as OpenApiDocument).paths[req.pattern][req.method]) {
					return next();
				}

				const { operationId } = (this._Descriptor as OpenApiDocument).paths[req.pattern][req.method];

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
				if ("/" + (this._Descriptor as OpenApiDocument).info.title + "/api/descriptor" === req.pattern && "get" === req.method) {

					return new Promise((resolve: (api: OpenApiDocument) => void, reject: (err: Error) => void): void => {

						const { validate } = require("@apidevtools/swagger-parser");

						validate(this._Descriptor, (err: Error, api: OpenApiDocument): void => {
							return err ? reject(err) : resolve(api);
						});

					// add current server
					}).then((api: OpenApiDocument): Promise<OpenApiDocument> => {

						const protocol: "https" | "http" = res.socket && Boolean(res.socket.encrypted) ? "https" : "http";

						let port: number = res.socket && res.socket.localPort ? res.socket.localPort : 0;
						if (!port) {
							port = "http" === protocol ? 80 : 443;
						}

						if (!api.servers) {
							api.servers = [];
						}

						api.servers.push({
							"url": protocol + "://" + req.validatedIp + ":" + port,
							"description": "Actual current server"
						});

						return Promise.resolve(api);

					}).then((api: OpenApiDocument) => {

						this._log("info", "<= [" + req.validatedIp + "] " + JSON.stringify(api));
						return send(req, res, SERVER_CODES.OK, api, (this._Descriptor as OpenApiDocument).info.version, this._cors);

					}).catch((err: Error) => {

						this._log("error", err);

						const result: { "code": string; "message": string; } = {
							"code": "INTERNAL_SERVER_ERROR",
							"message": cleanSendedError(err)
						};

						this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
						return send(req, res, SERVER_CODES.INTERNAL_SERVER_ERROR, result, (this._Descriptor as OpenApiDocument).info.version, this._cors);

					});

				}

				// get plugin status
				else if ("/" + (this._Descriptor as OpenApiDocument).info.title + "/api/status" === req.pattern && "get" === req.method) {

					const initialized: boolean = this.initialized && (this._Mediator as Mediator).initialized;
					const status: "INITIALIZED" | "ENABLED"  = initialized ? "INITIALIZED" : "ENABLED";

					this._log("info", "<= [" + req.validatedIp + "] " + status);
					return send(req, res, SERVER_CODES.OK, status, (this._Descriptor as OpenApiDocument).info.version, this._cors);

				}

				// missing operationId
				else if (!operationId) {

					const result: { "code": string; "message": string; } = {
						"code": "NOT_IMPLEMENTED",
						"message": "Missing \"operationId\" in the Descriptor for this request"
					};

					this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
					return send(req, res, SERVER_CODES.NOT_IMPLEMENTED, result, (this._Descriptor as OpenApiDocument).info.version, this._cors);

				}

				// not implemented operationId
				else if ("function" !== typeof (this._Mediator as Mediator)[operationId]) {

					const result: { "code": string; "message": string; } = {
						"code": "NOT_IMPLEMENTED",
						"message": "Unknown Mediator's \"operationId\" method for this request"
					};

					this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
					return send(req, res, SERVER_CODES.NOT_IMPLEMENTED, result, (this._Descriptor as OpenApiDocument).info.version, this._cors);

				}

				// no "Content-Length" header found
				else if ("get" !== req.method && null !== checkInteger(
					"headers[\"content-length\"]", req.headers["content-length"], false
				)) {

					const result: { "code": string; "message": string; } = {
						"code": "MISSING_HEADER",
						"message": "No valid \"Content-Length\" header found"
					};

					this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
					return send(req, res, SERVER_CODES.MISSING_HEADER, result, (this._Descriptor as OpenApiDocument).info.version, this._cors);

				}

				else {

					// force formate for path parameters
					return Promise.resolve().then(() => {

						const keys = Object.keys(req.params);
						return !keys.length ? Promise.resolve() : Promise.resolve().then(() => {

							const docParameters = (this._Descriptor as OpenApiDocument).paths[req.pattern][req.method].parameters.filter((p) => {
								return "path" === p.in;
							});

							return !docParameters.length ? Promise.resolve() : Promise.resolve().then(() => {

								let err: Error | null = null;
								for (let i = 0; i < keys.length; ++i) {

									const key = keys[i];

									const schema = docParameters.find((dp) => {
										return dp.name === key;
									}).schema || null;

									if (!schema) {
										err = new ReferenceError("Unknown parameter: request.params['" + key + "']"); break;
									}

									switch (extractSchemaType(schema, (this._Descriptor as OpenApiDocument).components.schemas)) {

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
								return send(req, res, SERVER_CODES.OK_PUT, undefined, (this._Descriptor as OpenApiDocument).info.version, this._cors);
							}

							else {
								this._log("success", "<= [" + req.validatedIp + "] " + JSON.stringify(content));
								return send(req, res, SERVER_CODES.OK_PUT, content, (this._Descriptor as OpenApiDocument).info.version, this._cors);
							}

						}

						// no content
						else if ("undefined" === typeof content || null === content) {
							this._log("warning", "<= [" + req.validatedIp + "] no content");
							return send(req, res, SERVER_CODES.OK_NO_CONTENT, undefined, (this._Descriptor as OpenApiDocument).info.version, this._cors);
						}

						else {
							this._log("success", "<= [" + req.validatedIp + "] " + JSON.stringify(content));
							return send(req, res, SERVER_CODES.OK, content, (this._Descriptor as OpenApiDocument).info.version, this._cors);
						}

					}).catch((err) => {

						if (err instanceof ReferenceError) {

							const result = {
								"code": "MISSING_PARAMETER",
								"message": cleanSendedError(err)
							};

							this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
							return send(req, res, SERVER_CODES.MISSING_PARAMETER, result, (this._Descriptor as OpenApiDocument).info.version, this._cors);

						}
						else if (err instanceof TypeError) {

							const result = {
								"code": "WRONG_TYPE_PARAMETER",
								"message": cleanSendedError(err)
							};

							this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
							return send(req, res, SERVER_CODES.WRONG_TYPE_PARAMETER, result, (this._Descriptor as OpenApiDocument).info.version, this._cors);

						}
						else if (err instanceof RangeError) {

							const result = {
								"code": "EMPTY_OR_RANGE_OR_ENUM_PARAMETER",
								"message": cleanSendedError(err)
							};

							this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
							return send(req, res, SERVER_CODES.EMPTY_OR_RANGE_OR_ENUM_PARAMETER, result, (this._Descriptor as OpenApiDocument).info.version, this._cors);

						}
						else if (err instanceof SyntaxError) {

							const result = {
								"code": "JSON_PARSE",
								"message": cleanSendedError(err)
							};

							this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
							return send(req, res, SERVER_CODES.JSON_PARSE, result, (this._Descriptor as OpenApiDocument).info.version, this._cors);

						}
						else if (err instanceof NotFoundError) {

							const result = {
								"code": "NOT_FOUND",
								"message": cleanSendedError(err)
							};

							this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
							return send(req, res, SERVER_CODES.NOT_FOUND, result, (this._Descriptor as OpenApiDocument).info.version, this._cors);

						}
						else {

							this._log("error", err);

							const result = {
								"code": "INTERNAL_SERVER_ERROR",
								"message": cleanSendedError(err)
							};

							this._log("error", "<= [" + req.validatedIp + "] " + JSON.stringify(result));
							return send(req, res, SERVER_CODES.INTERNAL_SERVER_ERROR, result, (this._Descriptor as OpenApiDocument).info.version, this._cors);

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
				this._log("error", err);
			});

		}

		public socketMiddleware (socketServer: WebSocketServer | SocketIOServer): void {
			this._socketServer = socketServer;
		}

		public push (command: string, data?: any, log: boolean = true): this {

			const serverType = this._serverType();

			if (![ "WEBSOCKET", "SOCKETIO" ].includes(serverType)) {
				return this;
			}

			// valid descriptor && formate data
			this.checkDescriptor().then((): Promise<string> => {

				const result = {
					"plugin": (this._Descriptor as OpenApiDocument).info.title,
					command
				};

					if ("undefined" !== typeof data) {
						result.data = cleanSendedError(data);
					}

				return Promise.resolve(JSON.stringify(result));

			// log & send data
			}).then((result) => {

				if (log) {
					this._log("info", "<= [PUSH] " + result, true);
				}

				switch (serverType) {

					case "WEBSOCKET":

						this._socketServer.clients.forEach((client) => {

							if (!client.id) {
								client.id = getUniqueID();
							}

							if (WEBSOCKET_STATE_OPEN === client.readyState) {
								client.send(result);
							}

						});

					break;

					case "SOCKETIO":
						this._socketServer.sockets.emit("message", result);
					break;

					default:
						// nothing to do here
					break;

				}

			}).catch((err) => {
				this._log("error", err);
			});

			return this;

		}

		public getClients () {

			switch (this._serverType()) {

				case "WEBSOCKET":

					return this._socketServer.clients.map((s) => {

						if (!s.id) {
							s.id = getUniqueID();
						}

						return {
							"id": s.id,
							"status": WEBSOCKET_STATE_OPEN === s.readyState ? "CONNECTED" : "DISCONNECTED"
						};

					});

				case "SOCKETIO": {

					const result = [];

						this._socketServer.sockets.sockets.forEach((s) => {

							result.push({
								"id": s.id,
								"status": s.connected ? "CONNECTED" : "DISCONNECTED"
							});

						});

					return result;

				}

				default:
					return [];

			}

		}

		public pushClient (clientId, command, data, log = true) {

			const serverType = this._serverType();

			if (![ "WEBSOCKET", "SOCKETIO" ].includes(serverType)) {
				return this;
			}

			// valid descriptor && formate data
			this.checkDescriptor().then(() => {

				const result = {
					"plugin": (this._Descriptor as OpenApiDocument).info.title,
					command
				};

					if ("undefined" !== typeof data) {
						result.data = cleanSendedError(data);
					}

				return Promise.resolve(JSON.stringify(result));

			// log & send data
			}).then((result) => {

				switch (serverType) {

					case "WEBSOCKET":

						this._socketServer.clients.forEach((client) => {

							if (!client.id) {
								client.id = getUniqueID();
							}
							else if (client.id === clientId && WEBSOCKET_STATE_OPEN === client.readyState) {

								if (log) {
									this._log("info", "<= [PUSH|" + clientId + "] " + result);
								}

								client.send(result);

							}

						});

					break;

					case "SOCKETIO":

						if (this._socketServer.sockets.sockets.has(clientId)) {

							const socket = this._socketServer.sockets.sockets.get(clientId);

							if (socket.connected) {

								if (log) {
									this._log("info", "<= [PUSH|" + clientId + "] " + result);
								}

								socket.emit("message", result);

							}

						}

					break;

					default:
						// nothing to do here
					break;

				}
			}).catch((err) => {
				this._log("error", err);
			});

			return this;

		}

		// init / release

			public init (...data) {

				return this.checkDescriptor().then(() => {
					return this.checkMediator();
				}).then(() => {
					return this._initWorkSpace(...data);
				}).then(() => {

					this.initialized = true;
					this.emit("initialized", ...data);

				});

			}

			public release (...data) {

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