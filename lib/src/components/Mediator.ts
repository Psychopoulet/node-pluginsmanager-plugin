// deps

    // externals
    import { OpenApiValidator, ValidationError, type OpenApiDocument } from "express-openapi-validate";

    // locals
    import { checkObject } from "../checkers/TypeError/checkObject";
    import { checkNonEmptyString } from "../checkers/RangeError/checkNonEmptyString";
    import { checkNonEmptyObject } from "../checkers/RangeError/checkNonEmptyObject";

    import extractPathMethodByOperationId from "../utils/descriptor/extractPathMethodByOperationId";
    import DescriptorUser from "./DescriptorUser";

// types & interfaces

    // locals

    import type { iDescriptorUserOptions, tEventMap, iEventsMinimal } from "./DescriptorUser";
    import type { iIncomingMessage, iServerResponse } from "./Server";
    import type { iPathMethod } from "../utils/descriptor/extractPathMethodByOperationId";

    export interface iIncomingMessageForMediatorValidation extends iIncomingMessage {
        "body": any;
    }

    export interface iServerResponseForMediatorValidation extends iServerResponse {
        "body": any;
    }

    interface iUrControlledParameters {
        "path": Record<string, any>;
        "query": Record<string, any>;
        "headers": Record<string, any>;
        "cookies": Record<string, any>;
    }

    export interface iUrlAllowedParameters {
        "path"?: Record<string, any>;
        "query"?: Record<string, any>;
        "headers"?: Record<string, any>;
        "cookies"?: Record<string, any>;
        "header"?: Record<string, any>;
        "cookie"?: Record<string, any>;
    }

// module

export default class Mediator<T extends tEventMap<T> = iEventsMinimal> extends DescriptorUser<T> {

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
        public checkParameters (operationId: string, urlParams?: iUrlAllowedParameters, bodyParams?: any): Promise<void> {

            const urlControlledParameters: iUrControlledParameters = {
                "path": urlParams ? urlParams?.path ?? {} : {},
                "query": urlParams ? urlParams?.query ?? {} : {},
                "headers": urlParams ? urlParams?.headers ?? urlParams?.header ?? {} : {},
                "cookies": urlParams ? urlParams?.cookies ?? urlParams?.cookie ?? {} : {},
            };

            // parameters validation
            return this.checkDescriptor().then((): Promise<void> => {
                return checkNonEmptyString("operationId", operationId);
            }).then((): Promise<void> => {

                return "undefined" === typeof urlParams ? Promise.resolve() : checkObject("urlParams", urlParams);

            }).then((): Promise<void> => {

                return checkNonEmptyObject("urlControlledParameters", urlControlledParameters).then((): Promise<void> => {
                    return checkObject("urlControlledParameters.path", urlControlledParameters.path);
                }).then(() => {
                    return checkObject("urlControlledParameters.query", urlControlledParameters.query);
                }).then(() => {
                    return checkObject("urlControlledParameters.headers", urlControlledParameters.headers);
                }).then(() => {
                    return checkObject("urlControlledParameters.cookies", urlControlledParameters.cookies);
                });

            }).then((): Promise<void> => {

                // search wanted operation
                const foundPathMethod: iPathMethod | null = extractPathMethodByOperationId((this._Descriptor as OpenApiDocument).paths, operationId);

                return !foundPathMethod ? Promise.reject(
                    new ReferenceError("Unknown operationId \"" + operationId + "\"")
                ) : new Promise((resolve: () => void, reject: (err: Error) => void): void => {

                    const req = {
                        "path": foundPathMethod.path,
                        "method": foundPathMethod.method,
                        "params": urlControlledParameters.path,
                        "query": urlControlledParameters.query,
                        "headers": urlControlledParameters.headers,
                        "cookies": urlControlledParameters.cookies,
                        "body": bodyParams
                    };

                    const validateRequest: any = (this._validator as OpenApiValidator).validate(req.method, req.path); // set to "any" for ts validation

                    validateRequest(req, null, (err: Error): void => {
                        return err ? reject(err) : resolve();
                    });

                });

            }).catch((err: Error): Promise<void> => {

                return err instanceof ValidationError ? Promise.resolve().then((): Promise<void> => {

                    switch ((err as ValidationError).data[0].keyword) { // extract first Error

                        case "required":
                            return Promise.reject(new ReferenceError(err.message));

                        case "type":
                        case "pattern":
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

        }

        // Check sended parameters by method name (used by the Server)
        public checkResponse (operationId: string, res: iServerResponseForMediatorValidation): Promise<void> {

            // parameters validation
            return this.checkDescriptor().then((): Promise<void> => {
                return checkNonEmptyString("operationId", operationId);
            }).then((): Promise<void> => {

                // search wanted operation
                const foundPathMethod: iPathMethod | null = extractPathMethodByOperationId((this._Descriptor as OpenApiDocument).paths, operationId);

                return !foundPathMethod ? Promise.reject(
                    new ReferenceError("Unknown operationId \"" + operationId + "\"")
                ) : new Promise((resolve: () => void, reject: (err: Error) => void): void => {

                    // no content, no validation
                    if (204 === res.statusCode) {

                        return "undefined" !== typeof res.body && "" !== res.body ? reject(
                            new ReferenceError("You should not have content data with 204 statusCode")
                        ) : resolve();

                    }

                    // no content, no validation (put requests)
                    else if (201 === res.statusCode && "undefined" === typeof res.body) {
                        return resolve();
                    }

                    // validator cannot correctly check pure boolean return
                    else if ("undefined" !== typeof res.body && [ "true", "false", true, false ].includes(res.body)) {
                        return resolve();
                    }

                    else {

                        try {

                            const mutedRes = { ...res };

                            mutedRes.headers = res.getHeaders();

                            if ("undefined" === typeof mutedRes.body || "" === mutedRes.body) {
                                mutedRes.body = {};
                            }

                            const validateResponse = (this._validator as OpenApiValidator).validateResponse(foundPathMethod.method, foundPathMethod.path);
                            validateResponse(mutedRes);

                            return resolve();

                        }
                        catch (e) {

                            return reject(new Error("[" + foundPathMethod.method + "]"
                                + foundPathMethod.path
                                + " (" + foundPathMethod.operationId + ") => "
                                + res.statusCode
                                + "\r\n"
                                + ((e as Error).message ? (e as Error).message : e) as string
                            ));

                        }

                    }

                });

            });

        }

        // init / release

        public init (...data: any): Promise<void> {

            return this._initWorkSpace(...data).then((): void => {

                this._validator = new OpenApiValidator(this._Descriptor as OpenApiDocument);

                this.initialized = true;
                this._emitEventGenericForTSPurposeDONOTUSE("initialized", [ ...data ]);

            });

        }

        public release (...data: any): Promise<void> {

            return this._releaseWorkSpace(...data).then((): void => {

                // can only be released by Orchestrator
                this._Descriptor = null;
                this._validator = null;

                this.initialized = false;
                this._emitEventGenericForTSPurposeDONOTUSE("released", [ ...data ]);

            }).then((): void => {

                this.removeAllListeners();

            });

        }

}
