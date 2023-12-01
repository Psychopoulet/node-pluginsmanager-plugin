"use strict";

// deps

	// natives
	import { parse } from "node:url";
	import { EOL } from "node:os";
	import { AddressInfo } from "node:net";

	// externals
	import uniqid from "uniqid";

	// locals

	import { checkIntegerSync } from "../checkers/TypeError/checkInteger";
	import { checkNonEmptyObjectSync } from "../checkers/RangeError/checkNonEmptyObject";
	import { checkNonEmptyStringSync } from "../checkers/RangeError/checkNonEmptyString";

	import extractPattern from "../utils/descriptor/extractPattern";
	import extractParams from "../utils/descriptor/extractParams";
	import extractSchemaType from "../utils/descriptor/extractSchemaType";
	import extractBody from "../utils/request/extractBody";
	import extractIp from "../utils/request/extractIp";
	import extractCookies from "../utils/request/extractCookies";
	import extractMime from "../utils/request/extractMime";
	import jsonParser from "../utils/jsonParser";
	import send from "../utils/send";
	import cleanSendedError from "../utils/cleanSendedError";

	import MediatorUser from "./MediatorUser";
	import Mediator from "./Mediator";
	import NotFoundError from "./NotFoundError";

	import SERVER_CODES from "../utils/serverCodes";

// types & interfaces

	// natives
	import { IncomingMessage, ServerResponse } from "node:http";

	// externals

	import { OpenApiDocument } from "express-openapi-validate";

	import { Server as WebSocketServer, WebSocket } from "ws";
	import { Server as SocketIOServer } from "socket.io";

	// locals

	import { iMediatorUserOptions } from "./MediatorUser";

	interface iPush {
		"id": string;
		"plugin": string;
		"command": string;
		"data"?: any;
	}

	export interface iClient {
		"id": string;
		"status": "CONNECTED" | "DISCONNECTED";
	}

	export interface iIncomingMessage extends IncomingMessage {
		"method": string;
		"pattern": string;
		"validatedIp": string;
		"headers": { [key:string]: any; };
		"cookies": { [key:string]: any; };
		"query": { [key:string]: any; };
		"params": { [key:string]: any; };
		"body": string;
	}

	export interface iServerResponse extends ServerResponse {
		"body": any; // string, any for Mediator checkResponse
		"headers": { [key:string]: any; };
	}

	interface iWebSocketWithId extends WebSocket {
		"id"?: string;
	}

// consts

	const WEBSOCKET_STATE_OPEN: number = 1;

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

		public appMiddleware (req: iIncomingMessage, res: iServerResponse, next: Function): void { // req, res, next : void

			if (!this._Descriptor) {
				return next();
			}

			if (!(this._Descriptor as OpenApiDocument).paths) {
				return next();
			}

			this.checkDescriptor().then(() => {

				// parse
				const { pathname, query }: { "pathname": string | null; "query": any; } = parse((req.url as string), true);
				req.method = req.method ? req.method.toLowerCase() : "get";
				req.pattern = null === checkNonEmptyStringSync("pattern", req.pattern) ? req.pattern : extractPattern(
					(this._Descriptor as OpenApiDocument).paths, pathname as string, req.method
				);

				if (!req.pattern) {
					return next();
				}

				req.validatedIp = null === checkNonEmptyStringSync("ip", req.validatedIp) ? req.validatedIp : extractIp(req);

				// url
				req.headers = null === checkNonEmptyObjectSync("headers", req.headers) ? req.headers : {};
				req.cookies = null === checkNonEmptyObjectSync("cookies", req.cookies) ? req.cookies : extractCookies(req);
				req.query = null === checkNonEmptyObjectSync("query", req.query) ? req.query : query || {};
				req.params = null === checkNonEmptyObjectSync("params", req.params) ? req.params : extractParams(req.pattern, pathname as string);

				// ensure content length formate
				if ("undefined" === typeof req.headers["content-length"]) {
					req.headers["content-length"] = 0;
				}
				else if ("string" === typeof req.headers["content-length"]) {
					req.headers["content-length"] = parseInt(req.headers["content-length"], 10);
				}

				if (!req.pattern || !(this._Descriptor as OpenApiDocument).paths[req.pattern] || !((this._Descriptor as OpenApiDocument).paths[req.pattern] as { [key:string]: any })[req.method]) {
					return next();
				}

				const { operationId }: { "operationId": string; } = ((this._Descriptor as OpenApiDocument).paths[req.pattern] as { [key:string]: any })[req.method];
				const apiVersion: string = (this._Descriptor as OpenApiDocument).info.version;

				const contentType: string = req.headers["content-type"] || req.headers["Content-Type"] || "";
				const responses = ((this._Descriptor as OpenApiDocument).paths[req.pattern] as { [key:string]: any })[req.method].responses;

				this._log("info", "" +
					"=> [" + req.validatedIp + "] " + req.url + " (" + req.method.toUpperCase() + ")" +
					(operationId                 ? EOL + "operationId    : " + operationId : "") +
					(req.headers["content-type"] ? EOL + "content-type   : " + req.headers["content-type"] : "") +
					(
						"get" !== req.method && req.headers["content-length"] && 4 < req.headers["content-length"] ?
							EOL + "content-length : " + req.headers["content-length"] : ""
					)
				);

				// get descriptor
				if ("/" + (this._Descriptor as OpenApiDocument).info.title + "/api/descriptor" === req.pattern && "get" === req.method) {

					// add current server

					const port: number = res.socket && res.socket.localPort ? res.socket.localPort : (res.socket?.address() as AddressInfo).port;

					const descriptor: OpenApiDocument = { ...(this._Descriptor as OpenApiDocument) };

					(descriptor.servers as Array<{
						"url": string;
						"description": string;
					}>).push({
						"url":  req.validatedIp + ":" + port,
						"description": "Actual current server"
					});

					const content: string = JSON.stringify(descriptor);

					this._log("info", "<= [" + req.validatedIp + "] " + content);
					return send(req, res, SERVER_CODES.OK, content, {
						"apiVersion": apiVersion,
						"cors": this._cors,
						"mime": extractMime(contentType, SERVER_CODES.OK, responses)
					}).catch((err: Error): Promise<void> => {

						this._log("error", err);

						const result: string = JSON.stringify({
							"code": "INTERNAL_SERVER_ERROR",
							"message": cleanSendedError(err)
						});

						this._log("error", "<= [" + req.validatedIp + "] " + result);
						return send(req, res, SERVER_CODES.INTERNAL_SERVER_ERROR, result, {
							"apiVersion": apiVersion,
							"cors": this._cors,
							"mime": extractMime(contentType, SERVER_CODES.INTERNAL_SERVER_ERROR, responses)
						});

					});

				}

				// get plugin status
				else if ("/" + (this._Descriptor as OpenApiDocument).info.title + "/api/status" === req.pattern && "get" === req.method) {

					const initialized: boolean = this.initialized && (this._Mediator as Mediator).initialized;
					const status: "INITIALIZED" | "ENABLED"  = initialized ? "INITIALIZED" : "ENABLED";

					this._log("info", "<= [" + req.validatedIp + "] " + status);
					return send(req, res, SERVER_CODES.OK, JSON.stringify(status), {
						"apiVersion": apiVersion,
						"cors": this._cors,
						"mime": extractMime(contentType, SERVER_CODES.OK, responses)
					});

				}

				// missing operationId
				else if (!operationId) {

					const result: string = JSON.stringify({
						"code": "NOT_IMPLEMENTED",
						"message": "Missing \"operationId\" in the Descriptor for this request"
					});

					this._log("error", "<= [" + req.validatedIp + "] " + result);
					return send(req, res, SERVER_CODES.NOT_IMPLEMENTED, result, {
						"apiVersion": apiVersion,
						"cors": this._cors,
						"mime": extractMime(contentType, SERVER_CODES.NOT_IMPLEMENTED, responses)
					});

				}

				// not implemented operationId
				else if ("function" !== typeof (this._Mediator as { [key:string]: any })[operationId]) {

					const result: string = JSON.stringify({
						"code": "NOT_IMPLEMENTED",
						"message": "Unknown Mediator's \"operationId\" method for this request"
					});

					this._log("error", "<= [" + req.validatedIp + "] " + result);
					return send(req, res, SERVER_CODES.NOT_IMPLEMENTED, result, {
						"apiVersion": apiVersion,
						"cors": this._cors,
						"mime": extractMime(contentType, SERVER_CODES.NOT_IMPLEMENTED, responses)
					});

				}

				// no "Content-Length" header found
				else if ("get" !== req.method && null !== checkIntegerSync(
					"headers[\"content-length\"]", req.headers["content-length"]
				)) {

					const result: string = JSON.stringify({
						"code": "MISSING_HEADER",
						"message": "No valid \"Content-Length\" header found"
					});

					this._log("error", "<= [" + req.validatedIp + "] " + result);
					return send(req, res, SERVER_CODES.MISSING_HEADER, result, {
						"apiVersion": apiVersion,
						"cors": this._cors,
						"mime": extractMime(contentType, SERVER_CODES.MISSING_HEADER, responses)
					});

				}

				else {

					// force formate for path parameters
					return Promise.resolve().then((): Promise<void> => {

						const keys: Array<string> = Object.keys(req.params);
						return !keys.length ? Promise.resolve() : Promise.resolve().then((): Promise<void> => {

							const docParameters: Array<{ [key:string]: any }> = ((this._Descriptor as OpenApiDocument).paths[req.pattern] as { [key:string]: any })[req.method].parameters.filter((p: { [key:string]: any }): boolean => {
								return "path" === p.in;
							});

							return !docParameters.length ? Promise.resolve() : Promise.resolve().then((): Promise<void> => {

								let err: Error | null = null;
								for (let i: number = 0; i < keys.length; ++i) {

									const key: string = keys[i];

									const schema = docParameters.find((dp: { [key:string]: any }): boolean => {
										return dp.name === key;
									})?.schema || null;

									if (!schema) {
										err = new ReferenceError("Unknown parameter: request.params['" + key + "']"); break;
									}

									switch (extractSchemaType(schema, ((this._Descriptor as OpenApiDocument).components as { [key:string]: any }).schemas)) {

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
											if (null !== checkIntegerSync("request.params['" + key + "']", req.params[key])) {

												const value: number = parseInt(req.params[key], 10);

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

												const value: number = parseFloat(req.params[key]);

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
					}).then((): Promise<any> => {

						if ("get" === req.method.toLowerCase()) {
							return Promise.resolve("");
						}
						else if (!checkNonEmptyStringSync("body", req.body)) {
							return Promise.resolve(req.body);
						}
						else {

							return extractBody(req).then((body: string): Promise<any> => {

								if (body.length) {

									this._log("log", body);

									req.body = jsonParser(body);

								}
								else {
									req.body = "";
								}

								return Promise.resolve(req.body);

							});

						}

					// formate data
					}).then((body: any): Promise<string> => {

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
						return Promise.resolve().then((): Promise<void> => {

							return this._checkParameters ? (this._Mediator as Mediator).checkParameters(
								operationId, parsed.url, parsed.body
							) : Promise.resolve();

						// execute Mediator method
						}).then((): Promise<string> => {

							return (this._Mediator as { [key:string]: any })[operationId](parsed.url, parsed.body);

						});

					// send response
					}).then((content: string): Promise<void> => {

						// created
						if ("put" === req.method) {

							if ("undefined" === typeof content || null === content) {

								this._log("success", "<= [" + req.validatedIp + "] no content");
								return send(req, res, SERVER_CODES.OK_PUT, "", {
									"apiVersion": apiVersion,
									"cors": this._cors,
									"mime": extractMime(contentType, SERVER_CODES.OK_PUT, responses)
								});

							}

							else {

								this._log("success", "<= [" + req.validatedIp + "] " + content);
								return send(req, res, SERVER_CODES.OK_PUT, content, {
									"apiVersion": apiVersion,
									"cors": this._cors,
									"mime": extractMime(contentType, SERVER_CODES.OK_PUT, responses)
								});

							}

						}

						// no content
						else if ("undefined" === typeof content || null === content) {

							this._log("warning", "<= [" + req.validatedIp + "] no content");
							return send(req, res, SERVER_CODES.OK_NO_CONTENT, "", {
								"apiVersion": apiVersion,
								"cors": this._cors,
								"mime": extractMime(contentType, SERVER_CODES.OK_NO_CONTENT, responses)
							});

						}

						else {

							this._log("success", "<= [" + req.validatedIp + "] " + content);
							return send(req, res, SERVER_CODES.OK, content, {
								"apiVersion": apiVersion,
								"cors": this._cors,
								"mime": extractMime(contentType, SERVER_CODES.OK, responses)
							});

						}

					}).catch((err: Error): Promise<void> => {

						if (err instanceof ReferenceError) {

							const result: string = JSON.stringify({
								"code": "MISSING_PARAMETER",
								"message": cleanSendedError(err)
							});

							this._log("error", "<= [" + req.validatedIp + "] " + result);
							return send(req, res, SERVER_CODES.MISSING_PARAMETER, result, {
								"apiVersion": apiVersion,
								"cors": this._cors,
								"mime": extractMime(contentType, SERVER_CODES.MISSING_PARAMETER, responses)
							});

						}
						else if (err instanceof TypeError) {

							const result: string = JSON.stringify({
								"code": "WRONG_TYPE_PARAMETER",
								"message": cleanSendedError(err)
							});

							this._log("error", "<= [" + req.validatedIp + "] " + result);
							return send(req, res, SERVER_CODES.WRONG_TYPE_PARAMETER, result, {
								"apiVersion": apiVersion,
								"cors": this._cors,
								"mime": extractMime(contentType, SERVER_CODES.WRONG_TYPE_PARAMETER, responses)
							});

						}
						else if (err instanceof RangeError) {

							const result: string = JSON.stringify({
								"code": "EMPTY_OR_RANGE_OR_ENUM_PARAMETER",
								"message": cleanSendedError(err)
							});

							this._log("error", "<= [" + req.validatedIp + "] " + result);
							return send(req, res, SERVER_CODES.EMPTY_OR_RANGE_OR_ENUM_PARAMETER, result, {
								"apiVersion": apiVersion,
								"cors": this._cors,
								"mime": extractMime(contentType, SERVER_CODES.EMPTY_OR_RANGE_OR_ENUM_PARAMETER, responses)
							});

						}
						else if (err instanceof SyntaxError) {

							const result: string = JSON.stringify({
								"code": "JSON_PARSE",
								"message": cleanSendedError(err)
							});

							this._log("error", "<= [" + req.validatedIp + "] " + result);
							return send(req, res, SERVER_CODES.JSON_PARSE, result, {
								"apiVersion": apiVersion,
								"cors": this._cors,
								"mime": extractMime(contentType, SERVER_CODES.JSON_PARSE, responses)
							});

						}
						else if (err instanceof NotFoundError) {

							const result: string = JSON.stringify({
								"code": "NOT_FOUND",
								"message": cleanSendedError(err)
							});

							this._log("error", "<= [" + req.validatedIp + "] " + result);
							return send(req, res, SERVER_CODES.NOT_FOUND, result, {
								"apiVersion": apiVersion,
								"cors": this._cors,
								"mime": extractMime(contentType, SERVER_CODES.NOT_FOUND, responses)
							});

						}
						else {

							this._log("error", err);

							const result: string = JSON.stringify({
								"code": "INTERNAL_SERVER_ERROR",
								"message": cleanSendedError(err)
							});

							this._log("error", "<= [" + req.validatedIp + "] " + result);
							return send(req, res, SERVER_CODES.INTERNAL_SERVER_ERROR, result, {
								"apiVersion": apiVersion,
								"cors": this._cors,
								"mime": extractMime(contentType, SERVER_CODES.INTERNAL_SERVER_ERROR, responses)
							});

						}

					// check response
					}).then((): Promise<void> => {

						return this._checkResponse ? (this._Mediator as Mediator).checkResponse(operationId, res) : Promise.resolve();

					});

				}

			}).then((): void => {

				// nothing to do here
				// must not be blocking in http server or express app

			}).catch((err: Error): void => {
				this._log("error", err);
			});

		}

		public socketMiddleware (socketServer: WebSocketServer | SocketIOServer): void {
			this._socketServer = socketServer;
		}

		public push (command: string, data?: any, log: boolean = true): this {

			const serverType: "NO_SERVER" | "WEBSOCKET" | "SOCKETIO" | "UNKNOWN" = this._serverType();

			if (![ "WEBSOCKET", "SOCKETIO" ].includes(serverType)) {
				return this;
			}

			// valid descriptor && formate data
			this.checkDescriptor().then((): Promise<string> => {

				const result: iPush = {
					"id": uniqid(),
					"plugin": (this._Descriptor as OpenApiDocument).info.title,
					command
				};

					if ("undefined" !== typeof data) {
						result.data = cleanSendedError(data);
					}

				return Promise.resolve(JSON.stringify(result));

			// log & send data
			}).then((result: string): void => {

				if (log) {
					this._log("info", "<= [PUSH] " + result, true);
				}

				switch (serverType) {

					case "WEBSOCKET":

						(this._socketServer as WebSocketServer).clients.forEach((client: iWebSocketWithId): void => {

							if (!client.id) {
								client.id = uniqid();
							}

							if (WEBSOCKET_STATE_OPEN === client.readyState) {
								client.send(result);
							}

						});

					break;

					case "SOCKETIO":
						(this._socketServer as SocketIOServer).sockets.emit("message", result);
					break;

					default:
						// nothing to do here
					break;

				}

			}).catch((err: Error): void => {
				this._log("error", err);
			});

			return this;

		}

		public getClients (): Array<iClient> {

			switch (this._serverType()) {

				case "WEBSOCKET": {

					const result: Array<iClient> = [];

						(this._socketServer as WebSocketServer).clients.forEach((s: { "id"?: string; "readyState": number; }): iClient => {

							if (!s.id) {
								s.id = uniqid();
							}

							return {
								"id": s.id as string,
								"status": WEBSOCKET_STATE_OPEN === s.readyState ? "CONNECTED" : "DISCONNECTED"
							};

						});

					return result;

				}

				case "SOCKETIO": {

					const result: Array<iClient> = [];

						if ("function" !== typeof (this._socketServer as SocketIOServer).sockets?.sockets?.has) { // SocketIO V2

							for (const key in (this._socketServer as SocketIOServer).sockets.sockets) {

								const s: any = ((this._socketServer as SocketIOServer).sockets.sockets as { [key:string]: any })[key];

								result.push({
									"id": s.id,
									"status": s.connected ? "CONNECTED" : "DISCONNECTED"
								});

							}

						}
						else {

							(this._socketServer as SocketIOServer).sockets.sockets.forEach((s: any): void => { // SocketIO V3&4

								result.push({
									"id": s.id,
									"status": s.connected ? "CONNECTED" : "DISCONNECTED"
								});

							});

						}

					return result;

				}

				default:

					return [];

			}

		}

		public pushClient (clientId: string, command: string, data: any, log: boolean = true): this {

			const serverType = this._serverType();

			if (![ "WEBSOCKET", "SOCKETIO" ].includes(serverType)) {
				return this;
			}

			// valid descriptor && formate data
			this.checkDescriptor().then((): Promise<string> => {

				const result: iPush = {
					"id": uniqid(),
					"plugin": (this._Descriptor as OpenApiDocument).info.title,
					command
				};

					if ("undefined" !== typeof data) {
						result.data = cleanSendedError(data);
					}

				return Promise.resolve(JSON.stringify(result));

			// log & send data
			}).then((result: string): void => {

				switch (serverType) {

					case "WEBSOCKET":

						(this._socketServer as WebSocketServer).clients.forEach((client: iWebSocketWithId): void => {

							if (!client.id) {
								client.id = uniqid();
							}
							else if (client.id === clientId && WEBSOCKET_STATE_OPEN === client.readyState) {

								if (log) {
									this._log("info", "<= [PUSH|" + clientId + "] " + result);
								}

								client.send(result);

							}

						});

					break;

					case "SOCKETIO": {

						let socket: any | null = null;

							if ("function" !== typeof (this._socketServer as SocketIOServer).sockets?.sockets?.has) { // SocketIO V2

								for (const key in (this._socketServer as SocketIOServer).sockets.sockets) {

									if (key === clientId) {

										socket = ((this._socketServer as SocketIOServer).sockets.sockets as { [key:string]: any })[key];

										break;

									}

								}

							}
							else if ((this._socketServer as SocketIOServer).sockets.sockets.has(clientId)) { // SocketIO V3&4
								socket = (this._socketServer as SocketIOServer).sockets.sockets.get(clientId);
							}

						if (socket && socket.connected) {

							if (log) {
								this._log("info", "<= [PUSH|" + clientId + "] " + result);
							}

							socket.emit("message", result);

						}

					} break;

					default:
						// nothing to do here
					break;

				}
			}).catch((err: Error): void => {
				this._log("error", err);
			});

			return this;

		}

		// init / release

			public init (...data: any): Promise<void> {

				return this.checkDescriptor().then((): Promise<void> => {
					return this.checkMediator();
				}).then((): Promise<void> => {
					return this._initWorkSpace(...data);
				}).then((): void => {

					this.initialized = true;
					this.emit("initialized", ...data);

				});

			}

			public release (...data: any): Promise<void> {

				return this._releaseWorkSpace(...data).then((): void => {

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

				}).then((): void => {

					this.removeAllListeners();

				});

			}

};
