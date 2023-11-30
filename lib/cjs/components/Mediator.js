"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkObject_1 = require("../checkers/TypeError/checkObject");
const checkString_1 = require("../checkers/TypeError/checkString");
const checkNonEmptyString_1 = require("../checkers/RangeError/checkNonEmptyString");
const checkNonEmptyObject_1 = require("../checkers/RangeError/checkNonEmptyObject");
const extractPathMethodByOperationId_1 = __importDefault(require("../utils/descriptor/extractPathMethodByOperationId"));
const DescriptorUser_1 = __importDefault(require("./DescriptorUser"));
// types & interfaces
// externals
const express_openapi_validate_1 = require("express-openapi-validate");
// module
class Mediator extends DescriptorUser_1.default {
    // constructor
    constructor(options) {
        super(options);
        this._validator = null;
    }
    // public
    // Check sended parameters by method name (used by the Server)
    checkParameters(operationId, urlParams, bodyParams) {
        // parameters validation
        return this.checkDescriptor().then(() => {
            return (0, checkNonEmptyString_1.checkNonEmptyString)("operationId", operationId);
        }).then(() => {
            return (0, checkNonEmptyObject_1.checkNonEmptyObject)("urlParams", urlParams).then(() => {
                return (0, checkObject_1.checkObject)("urlParams.path", urlParams.path);
            }).then(() => {
                return (0, checkObject_1.checkObject)("urlParams.query", urlParams.query);
            }).then(() => {
                return (0, checkObject_1.checkObject)("urlParams.headers", urlParams.headers);
            }).then(() => {
                return (0, checkObject_1.checkObject)("urlParams.cookies", urlParams.cookies);
            });
        }).then(() => {
            return (0, checkString_1.checkString)("bodyParams", bodyParams);
        }).then(() => {
            // search wanted operation
            const foundPathMethod = (0, extractPathMethodByOperationId_1.default)(this._Descriptor.paths, operationId);
            return !foundPathMethod ? Promise.reject(new ReferenceError("Unknown operationId \"" + operationId + "\"")) : new Promise((resolve, reject) => {
                const req = {
                    "path": foundPathMethod.path,
                    "method": foundPathMethod.method,
                    "params": urlParams.path,
                    "query": urlParams.query,
                    "headers": urlParams.headers,
                    "cookies": urlParams.cookies,
                    "body": bodyParams
                };
                const validateRequest = this._validator.validate(req.method, req.path); // set to "any" for ts validation
                validateRequest(req, null, (err) => {
                    return err ? reject(err) : resolve();
                });
            });
        }).catch((err) => {
            return err instanceof express_openapi_validate_1.ValidationError ? Promise.resolve().then(() => {
                switch (err.data[0].keyword) { // extract first Error
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
    }
    // Check sended parameters by method name (used by the Server)
    checkResponse(operationId, res) {
        // parameters validation
        return this.checkDescriptor().then(() => {
            return (0, checkNonEmptyString_1.checkNonEmptyString)("operationId", operationId);
        }).then(() => {
            // search wanted operation
            const foundPathMethod = (0, extractPathMethodByOperationId_1.default)(this._Descriptor.paths, operationId);
            return !foundPathMethod ? Promise.reject(new ReferenceError("Unknown operationId \"" + operationId + "\"")) : new Promise((resolve, reject) => {
                // no content, no validation
                if (204 === res.statusCode) {
                    return "undefined" !== typeof res.body ? reject(new ReferenceError("You should not have content data with 204 statusCode")) : resolve();
                }
                // no content, no validation (put requests)
                else if (201 === res.statusCode && "undefined" === typeof res.body) {
                    return resolve();
                }
                // validator cannot correctly check pure boolean return
                else if ("undefined" !== typeof res.body && ["true", "false"].includes(res.body)) {
                    return resolve();
                }
                else {
                    try {
                        const mutedRes = Object.assign({}, res);
                        mutedRes.headers = res.getHeaders();
                        if ("undefined" === typeof res.body) {
                            mutedRes.body = "";
                        }
                        else if (res.headers.includes("Content-Type") && res.headers.includes("Content-Type").includes("application/json")) {
                            mutedRes.body = "string" === typeof res.body ? JSON.parse(res.body) : res.body;
                        }
                        const validateResponse = this._validator.validateResponse(foundPathMethod.method, foundPathMethod.path);
                        validateResponse(mutedRes);
                        return resolve();
                    }
                    catch (e) {
                        return reject(new Error("[" + foundPathMethod.method + "]" +
                            foundPathMethod.path +
                            " (" + foundPathMethod.operationId + ") => " +
                            res.statusCode +
                            "\r\n" +
                            (e.message ? e.message : e)));
                    }
                }
            });
        });
    }
    // init / release
    init(...data) {
        return this._initWorkSpace(...data).then(() => {
            this._validator = new express_openapi_validate_1.OpenApiValidator(this._Descriptor);
            this.initialized = true;
            this.emit("initialized", ...data);
        });
    }
    release(...data) {
        return this._releaseWorkSpace(...data).then(() => {
            // can only be released by Orchestrator
            this._Descriptor = null;
            this._validator = null;
            this.initialized = false;
            this.emit("released", ...data);
        }).then(() => {
            this.removeAllListeners();
        });
    }
}
exports.default = Mediator;
;
