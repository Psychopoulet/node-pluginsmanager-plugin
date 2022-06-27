"use strict";

// deps

	// externals
	import { OpenApiValidator, ValidationError, OpenApiDocument } from "express-openapi-validate";

	// locals

	import checkObject from "../checkers/TypeError/checkObject";
	import checkNonEmptyString from "../checkers/RangeError/checkNonEmptyString";
	import checkNonEmptyObject from "../checkers/RangeError/checkNonEmptyObject";

	import extractPathMethodByOperationId, { iPathMethod } from "../utils/descriptor/extractPathMethodByOperationId";

	import DescriptorUser, { iDescriptorUserOptions } from "./DescriptorUser";

// types & interfaces

	export interface iUrlParameters {
		"path": object;
		"query": object;
		"headers": object;
		"cookies": object;
	}

// module

export default class Mediator extends DescriptorUser {

	// attributes

		// protected

			protected _validator: OpenApiValidator | null;

	// constructor

	public constructor (options: iDescriptorUserOptions) {

		super(options);

		this._validator = null;

	}

	// public

		 // Check sended parameters by method name (used by the Server)
		public checkParameters (operationId: string, urlParams: iUrlParameters, bodyParams: { [key:string]: any }): Promise<void> {

			// parameters validation
			return this.checkDescriptor().then((): Promise<void> => {
				return (checkNonEmptyString("operationId", operationId) as Promise<void>);
			}).then((): Promise<void> => {

				return (checkNonEmptyObject("urlParams", urlParams) as Promise<void>).then((): Promise<void> => {
					return checkObject("urlParams.path", urlParams.path) as Promise<void>;
				}).then(() => {
					return checkObject("urlParams.query", urlParams.query) as Promise<void>;
				}).then(() => {
					return checkObject("urlParams.headers", urlParams.headers) as Promise<void>;
				}).then(() => {
					return checkObject("urlParams.cookies", urlParams.cookies) as Promise<void>;
				});

			}).then(() => {
				return (checkObject("bodyParams", bodyParams) as Promise<void>);
			}).then((): Promise<void> => {

				// search wanted operation
				const foundPathMethod: iPathMethod | null = extractPathMethodByOperationId((this._Descriptor as OpenApiDocument).paths, operationId);

				return !foundPathMethod ? Promise.reject(
					new ReferenceError("Unknown operationId \"" + operationId + "\"")
				) : new Promise((resolve: () => void, reject: (err: Error) => void): void => {

					const req = {
						"path": foundPathMethod.path,
						"method": foundPathMethod.method,
						"params": urlParams.path,
						"query": urlParams.query,
						"headers": urlParams.headers,
						"cookies": urlParams.cookies,
						"body": bodyParams
					};

					const validateRequest = (this._validator as OpenApiValidator).validate(req.method, req.path);

					validateRequest(req, null, (err: Error): void => {
						return err ? reject(err) : resolve();
					});

				}).catch((err: Error): Promise<void> => {

					return err instanceof ValidationError ? Promise.resolve().then((): Promise<void> => {

						switch ((err as ValidationError).data[0].keyword) { // extract first Error

							case "required":
								return Promise.reject(new ReferenceError(err.message));

							case "type":
								return Promise.reject(new TypeError(err.message));

							case "minimum":
							case "maximum":
							case "minLength":
							case "maxLength":
							case "minItems":
							case "maxItems":
							case "enum":
								return Promise.reject(new RangeError(err.message));

							default:
								return Promise.reject(new Error(err.message));

						}

					}) : Promise.reject(err);

				});

			});

		}

		// Check sended parameters by method name (used by the Server)
		public checkResponse (operationId: string, res): Promise<void> {

			// parameters validation
			return this.checkDescriptor().then((): Promise<void> => {
				return (checkNonEmptyString("operationId", operationId) as Promise<void>);
			}).then((): Promise<void> => {

				// search wanted operation
				const foundPathMethod: iPathMethod | null = extractPathMethodByOperationId((this._Descriptor as OpenApiDocument).paths, operationId);

				return !foundPathMethod ? Promise.reject(
					new ReferenceError("Unknown operationId \"" + operationId + "\"")
				) : new Promise((resolve: () => void, reject: (err: Error) => void): void => {

					// no content, no validation
					if (204 === res.statusCode) {

						return "undefined" !== typeof res.body ? reject(
							new ReferenceError("You should not have content data with 204 statusCode")
						) : resolve();

					}

					// no content, no validation (put requests)
					else if (201 === res.statusCode && "undefined" === typeof res.body) {
						return resolve();
					}

					// validator cannot correctly check pure boolean return
					else if ("undefined" !== typeof res.body && [ "true", "false" ].includes(res.body)) {
						return resolve();
					}

					else {

						const validateResponse = (this._validator as OpenApiValidator).validateResponse(foundPathMethod.method, foundPathMethod.path);

						try {

							res.headers = res.getHeaders();

							if ("undefined" === typeof res.body) {
								res.body = null;
							}
							else {
								res.body = "string" === typeof res.body ? JSON.parse(res.body) : res.body;
							}

							validateResponse(res);

							return resolve();

						}
						catch (e) {

							return reject(new Error(
								"[" + foundPathMethod.method + "]" +
								foundPathMethod.path +
								" (" + foundPathMethod.operationId + ") => " +
								res.statusCode +
								"\r\n" +
								(e.message ? e.message : e)
							));

						}

					}

				});

			});

		}

		// init / release

		public init (...data): Promise<void> {

			return this._initWorkSpace(...data).then((): void => {

				this._validator = new OpenApiValidator(this._Descriptor as OpenApiDocument);

				this.initialized = true;
				this.emit("initialized", ...data);

			});

		}

		public release (...data: any): Promise<void> {

			return this._releaseWorkSpace(...data).then((): void => {

				// can only be released by Orchestrator
				this._Descriptor = null;
				this._validator = null;

				this.initialized = false;
				this.emit("released", ...data);

			}).then((): void => {

				this.removeAllListeners();

			});

		}

};
