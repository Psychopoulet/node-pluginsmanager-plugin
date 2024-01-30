"use strict";
// deps
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// natives
const node_url_1 = require("node:url");
const node_os_1 = require("node:os");
// externals
const uniqid_1 = __importDefault(require("uniqid"));
// locals
const checkInteger_1 = require("../checkers/TypeError/checkInteger");
const checkNonEmptyObject_1 = require("../checkers/RangeError/checkNonEmptyObject");
const checkNonEmptyString_1 = require("../checkers/RangeError/checkNonEmptyString");
const extractPattern_1 = __importDefault(require("../utils/descriptor/extractPattern"));
const extractParams_1 = __importDefault(require("../utils/descriptor/extractParams"));
const extractSchemaType_1 = __importDefault(require("../utils/descriptor/extractSchemaType"));
const extractBody_1 = __importDefault(require("../utils/request/extractBody"));
const extractIp_1 = __importDefault(require("../utils/request/extractIp"));
const extractCookies_1 = __importDefault(require("../utils/request/extractCookies"));
const extractMime_1 = __importDefault(require("../utils/request/extractMime"));
const jsonParser_1 = __importDefault(require("../utils/jsonParser"));
const send_1 = __importDefault(require("../utils/send"));
const cleanSendedError_1 = __importDefault(require("../utils/cleanSendedError"));
const MediatorUser_1 = __importDefault(require("./MediatorUser"));
const NotFoundError_1 = __importDefault(require("./NotFoundError"));
const serverCodes_1 = __importDefault(require("../utils/serverCodes"));
// consts
const WEBSOCKET_STATE_OPEN = 1;
// module
// Please note the fact that "init" and "release" method MUST NOT be re-writted. Each child has is own init logic.
class Server extends MediatorUser_1.default {
    // constructor
    constructor(opt) {
        super(opt);
        this._socketServer = null;
        this._checkParameters = true;
        this._checkResponse = false;
        this._cors = false;
    }
    // protected
    _serverType() {
        if (!this._socketServer) {
            return "NO_SERVER";
        }
        else if (this._socketServer.clients && "function" === typeof this._socketServer.clients.forEach) {
            return "WEBSOCKET";
        }
        else if (this._socketServer.sockets && "function" === typeof this._socketServer.sockets.emit) {
            return "SOCKETIO";
        }
        else {
            return "UNKNOWN";
        }
    }
    _getUsableSocketIOClient(clientId) {
        var _a, _b;
        if ("SOCKETIO" === this._serverType()) {
            let socket = null;
            if ("function" !== typeof ((_b = (_a = this._socketServer.sockets) === null || _a === void 0 ? void 0 : _a.sockets) === null || _b === void 0 ? void 0 : _b.has)) { // SocketIO V2
                for (const key in this._socketServer.sockets.sockets) {
                    if (key === clientId) {
                        socket = this._socketServer.sockets.sockets[key];
                        break;
                    }
                }
            }
            else if (this._socketServer.sockets.sockets.has(clientId)) { // SocketIO V3&4
                socket = this._socketServer.sockets.sockets.get(clientId);
            }
            if (socket && socket.connected) {
                return socket;
            }
        }
        return undefined;
    }
    // public
    disableCheckParameters() {
        this._checkParameters = false;
        return this;
    }
    enableCheckParameters() {
        this._checkParameters = true;
        return this;
    }
    disableCheckResponse() {
        this._checkResponse = false;
        return this;
    }
    enableCheckResponse() {
        this._checkResponse = true;
        return this;
    }
    disableCors() {
        this._cors = false;
        return this;
    }
    enableCors() {
        this._cors = true;
        return this;
    }
    appMiddleware(req, res, next) {
        if (!this._Descriptor) {
            return next();
        }
        if (!this._Descriptor.paths) {
            return next();
        }
        this.checkDescriptor().then(() => {
            var _a, _b, _c;
            // parse
            const { pathname, query } = (0, node_url_1.parse)(req.url, true);
            req.method = req.method ? req.method.toLowerCase() : "get";
            req.pattern = null === (0, checkNonEmptyString_1.checkNonEmptyStringSync)("pattern", req.pattern) ? req.pattern : (0, extractPattern_1.default)(this._Descriptor.paths, pathname, req.method);
            if (!req.pattern) {
                return next();
            }
            req.validatedIp = null === (0, checkNonEmptyString_1.checkNonEmptyStringSync)("ip", req.validatedIp) ? req.validatedIp : (0, extractIp_1.default)(req);
            // url
            req.headers = null === (0, checkNonEmptyObject_1.checkNonEmptyObjectSync)("headers", req.headers) ? req.headers : {};
            req.cookies = null === (0, checkNonEmptyObject_1.checkNonEmptyObjectSync)("cookies", req.cookies) ? req.cookies : (0, extractCookies_1.default)(req);
            req.query = null === (0, checkNonEmptyObject_1.checkNonEmptyObjectSync)("query", req.query) ? req.query : query !== null && query !== void 0 ? query : {};
            req.params = null === (0, checkNonEmptyObject_1.checkNonEmptyObjectSync)("params", req.params) ? req.params : (0, extractParams_1.default)(req.pattern, pathname);
            // ensure content length formate
            if ("undefined" === typeof req.headers["content-length"]) {
                req.headers["content-length"] = 0;
            }
            else if ("string" === typeof req.headers["content-length"]) {
                req.headers["content-length"] = parseInt(req.headers["content-length"], 10);
            }
            if (!req.pattern || !this._Descriptor.paths[req.pattern] || !this._Descriptor.paths[req.pattern][req.method]) {
                return next();
            }
            const { operationId } = this._Descriptor.paths[req.pattern][req.method];
            const apiVersion = this._Descriptor.info.version;
            const contentType = (_b = (_a = req.headers["content-type"]) !== null && _a !== void 0 ? _a : req.headers["Content-Type"]) !== null && _b !== void 0 ? _b : "";
            const responses = this._Descriptor.paths[req.pattern][req.method].responses;
            this._log("info", ""
                + "=> [" + req.validatedIp + "] " + req.url + " (" + req.method.toUpperCase() + ")"
                + (operationId ? node_os_1.EOL + "operationId    : " + operationId : "")
                + (req.headers["content-type"] ? node_os_1.EOL + "content-type   : " + req.headers["content-type"] : "")
                + ("get" !== req.method && req.headers["content-length"] && 4 < req.headers["content-length"]
                    ? node_os_1.EOL + "content-length : " + req.headers["content-length"]
                    : ""));
            // get descriptor
            if ("/" + this._Descriptor.info.title + "/api/descriptor" === req.pattern && "get" === req.method) {
                // add current server
                const port = res.socket && res.socket.localPort ? res.socket.localPort : ((_c = res.socket) === null || _c === void 0 ? void 0 : _c.address()).port;
                const descriptor = Object.assign({}, this._Descriptor);
                descriptor.servers.push({
                    "url": req.validatedIp + ":" + port,
                    "description": "Actual current server"
                });
                const content = JSON.stringify(descriptor);
                this._log("info", "<= [" + req.validatedIp + "] " + content);
                return (0, send_1.default)(req, res, serverCodes_1.default.OK, content, {
                    "apiVersion": apiVersion,
                    "cors": this._cors,
                    "mime": (0, extractMime_1.default)(contentType, serverCodes_1.default.OK, responses)
                }).catch((err) => {
                    this._log("error", err);
                    const result = JSON.stringify({
                        "code": "INTERNAL_SERVER_ERROR",
                        "message": (0, cleanSendedError_1.default)(err)
                    });
                    this._log("error", "<= [" + req.validatedIp + "] " + result);
                    return (0, send_1.default)(req, res, serverCodes_1.default.INTERNAL_SERVER_ERROR, result, {
                        "apiVersion": apiVersion,
                        "cors": this._cors,
                        "mime": (0, extractMime_1.default)(contentType, serverCodes_1.default.INTERNAL_SERVER_ERROR, responses)
                    });
                });
            }
            // get plugin status
            else if ("/" + this._Descriptor.info.title + "/api/status" === req.pattern && "get" === req.method) {
                const initialized = this.initialized && this._Mediator.initialized;
                const status = initialized ? "INITIALIZED" : "ENABLED";
                this._log("info", "<= [" + req.validatedIp + "] " + status);
                return (0, send_1.default)(req, res, serverCodes_1.default.OK, JSON.stringify(status), {
                    "apiVersion": apiVersion,
                    "cors": this._cors,
                    "mime": (0, extractMime_1.default)(contentType, serverCodes_1.default.OK, responses)
                });
            }
            // missing operationId
            else if (!operationId) {
                const result = JSON.stringify({
                    "code": "NOT_IMPLEMENTED",
                    "message": "Missing \"operationId\" in the Descriptor for this request"
                });
                this._log("error", "<= [" + req.validatedIp + "] " + result);
                return (0, send_1.default)(req, res, serverCodes_1.default.NOT_IMPLEMENTED, result, {
                    "apiVersion": apiVersion,
                    "cors": this._cors,
                    "mime": (0, extractMime_1.default)(contentType, serverCodes_1.default.NOT_IMPLEMENTED, responses)
                });
            }
            // not implemented operationId
            else if ("function" !== typeof this._Mediator[operationId]) {
                const result = JSON.stringify({
                    "code": "NOT_IMPLEMENTED",
                    "message": "Unknown Mediator's \"operationId\" method for this request"
                });
                this._log("error", "<= [" + req.validatedIp + "] " + result);
                return (0, send_1.default)(req, res, serverCodes_1.default.NOT_IMPLEMENTED, result, {
                    "apiVersion": apiVersion,
                    "cors": this._cors,
                    "mime": (0, extractMime_1.default)(contentType, serverCodes_1.default.NOT_IMPLEMENTED, responses)
                });
            }
            // no "Content-Length" header found
            else if ("get" !== req.method && null !== (0, checkInteger_1.checkIntegerSync)("headers[\"content-length\"]", req.headers["content-length"])) {
                const result = JSON.stringify({
                    "code": "MISSING_HEADER",
                    "message": "No valid \"Content-Length\" header found"
                });
                this._log("error", "<= [" + req.validatedIp + "] " + result);
                return (0, send_1.default)(req, res, serverCodes_1.default.MISSING_HEADER, result, {
                    "apiVersion": apiVersion,
                    "cors": this._cors,
                    "mime": (0, extractMime_1.default)(contentType, serverCodes_1.default.MISSING_HEADER, responses)
                });
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
                            var _a, _b;
                            let err = null;
                            for (let i = 0; i < keys.length; ++i) {
                                const key = keys[i];
                                const schema = (_b = (_a = docParameters.find((dp) => {
                                    return dp.name === key;
                                })) === null || _a === void 0 ? void 0 : _a.schema) !== null && _b !== void 0 ? _b : null;
                                if (!schema) {
                                    err = new ReferenceError("Unknown parameter: request.params['" + key + "']");
                                    break;
                                }
                                switch ((0, extractSchemaType_1.default)(schema, this._Descriptor.components.schemas)) {
                                    case "boolean":
                                        if ("boolean" !== typeof req.params[key]) {
                                            if ("true" === req.params[key]) {
                                                req.params[key] = true;
                                            }
                                            else if ("false" === req.params[key]) {
                                                req.params[key] = false;
                                            }
                                            else {
                                                err = new TypeError("Error while validating request: request.params['" + key + "'] should be boolean");
                                                break;
                                            }
                                        }
                                        break;
                                    case "integer":
                                        // error returned, not an integer
                                        if (null !== (0, checkInteger_1.checkIntegerSync)("request.params['" + key + "']", req.params[key])) {
                                            const value = parseInt(req.params[key], 10);
                                            if (!Number.isNaN(value)) {
                                                req.params[key] = value;
                                            }
                                            else {
                                                err = new TypeError("Error while validating request: request.params['" + key + "'] should be integer");
                                                break;
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
                                                err = new TypeError("Error while validating request: request.params['" + key + "'] should be number");
                                                break;
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
                        return Promise.resolve("");
                    }
                    else if (!(0, checkNonEmptyString_1.checkNonEmptyStringSync)("body", req.body)) {
                        return Promise.resolve(req.body);
                    }
                    else {
                        return (0, extractBody_1.default)(req).then((body) => {
                            if (body.length) {
                                this._log("log", body);
                                req.body = (0, jsonParser_1.default)(body);
                            }
                            else {
                                req.body = "";
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
                        return this._checkParameters ? this._Mediator.checkParameters(operationId, parsed.url, parsed.body) : Promise.resolve();
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
                            return (0, send_1.default)(req, res, serverCodes_1.default.OK_PUT, "", {
                                "apiVersion": apiVersion,
                                "cors": this._cors,
                                "mime": (0, extractMime_1.default)(contentType, serverCodes_1.default.OK_PUT, responses)
                            });
                        }
                        else {
                            this._log("success", "<= [" + req.validatedIp + "] " + JSON.stringify(content));
                            return (0, send_1.default)(req, res, serverCodes_1.default.OK_PUT, content, {
                                "apiVersion": apiVersion,
                                "cors": this._cors,
                                "mime": (0, extractMime_1.default)(contentType, serverCodes_1.default.OK_PUT, responses)
                            });
                        }
                    }
                    // no content
                    else if ("undefined" === typeof content || null === content) {
                        this._log("warning", "<= [" + req.validatedIp + "] no content");
                        return (0, send_1.default)(req, res, serverCodes_1.default.OK_NO_CONTENT, "", {
                            "apiVersion": apiVersion,
                            "cors": this._cors,
                            "mime": (0, extractMime_1.default)(contentType, serverCodes_1.default.OK_NO_CONTENT, responses)
                        });
                    }
                    else {
                        this._log("success", "<= [" + req.validatedIp + "] " + JSON.stringify(content));
                        return (0, send_1.default)(req, res, serverCodes_1.default.OK, content, {
                            "apiVersion": apiVersion,
                            "cors": this._cors,
                            "mime": (0, extractMime_1.default)(contentType, serverCodes_1.default.OK, responses)
                        });
                    }
                }).catch((err) => {
                    if (err instanceof ReferenceError) {
                        const result = JSON.stringify({
                            "code": "MISSING_PARAMETER",
                            "message": (0, cleanSendedError_1.default)(err)
                        });
                        this._log("error", "<= [" + req.validatedIp + "] " + result);
                        return (0, send_1.default)(req, res, serverCodes_1.default.MISSING_PARAMETER, result, {
                            "apiVersion": apiVersion,
                            "cors": this._cors,
                            "mime": (0, extractMime_1.default)(contentType, serverCodes_1.default.MISSING_PARAMETER, responses)
                        });
                    }
                    else if (err instanceof TypeError) {
                        const result = JSON.stringify({
                            "code": "WRONG_TYPE_PARAMETER",
                            "message": (0, cleanSendedError_1.default)(err)
                        });
                        this._log("error", "<= [" + req.validatedIp + "] " + result);
                        return (0, send_1.default)(req, res, serverCodes_1.default.WRONG_TYPE_PARAMETER, result, {
                            "apiVersion": apiVersion,
                            "cors": this._cors,
                            "mime": (0, extractMime_1.default)(contentType, serverCodes_1.default.WRONG_TYPE_PARAMETER, responses)
                        });
                    }
                    else if (err instanceof RangeError) {
                        const result = JSON.stringify({
                            "code": "EMPTY_OR_RANGE_OR_ENUM_PARAMETER",
                            "message": (0, cleanSendedError_1.default)(err)
                        });
                        this._log("error", "<= [" + req.validatedIp + "] " + result);
                        return (0, send_1.default)(req, res, serverCodes_1.default.EMPTY_OR_RANGE_OR_ENUM_PARAMETER, result, {
                            "apiVersion": apiVersion,
                            "cors": this._cors,
                            "mime": (0, extractMime_1.default)(contentType, serverCodes_1.default.EMPTY_OR_RANGE_OR_ENUM_PARAMETER, responses)
                        });
                    }
                    else if (err instanceof SyntaxError) {
                        const result = JSON.stringify({
                            "code": "JSON_PARSE",
                            "message": (0, cleanSendedError_1.default)(err)
                        });
                        this._log("error", "<= [" + req.validatedIp + "] " + result);
                        return (0, send_1.default)(req, res, serverCodes_1.default.JSON_PARSE, result, {
                            "apiVersion": apiVersion,
                            "cors": this._cors,
                            "mime": (0, extractMime_1.default)(contentType, serverCodes_1.default.JSON_PARSE, responses)
                        });
                    }
                    else if (err instanceof NotFoundError_1.default) {
                        const result = JSON.stringify({
                            "code": "NOT_FOUND",
                            "message": (0, cleanSendedError_1.default)(err)
                        });
                        this._log("error", "<= [" + req.validatedIp + "] " + result);
                        return (0, send_1.default)(req, res, serverCodes_1.default.NOT_FOUND, result, {
                            "apiVersion": apiVersion,
                            "cors": this._cors,
                            "mime": (0, extractMime_1.default)(contentType, serverCodes_1.default.NOT_FOUND, responses)
                        });
                    }
                    else {
                        this._log("error", err);
                        const result = JSON.stringify({
                            "code": "INTERNAL_SERVER_ERROR",
                            "message": (0, cleanSendedError_1.default)(err)
                        });
                        this._log("error", "<= [" + req.validatedIp + "] " + result);
                        return (0, send_1.default)(req, res, serverCodes_1.default.INTERNAL_SERVER_ERROR, result, {
                            "apiVersion": apiVersion,
                            "cors": this._cors,
                            "mime": (0, extractMime_1.default)(contentType, serverCodes_1.default.INTERNAL_SERVER_ERROR, responses)
                        });
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
    socketMiddleware(socketServer) {
        this._socketServer = socketServer;
    }
    push(command, data, log = true) {
        const serverType = this._serverType();
        if (!["WEBSOCKET", "SOCKETIO"].includes(serverType)) {
            return this;
        }
        // valid descriptor && formate data
        this.checkDescriptor().then(() => {
            const result = {
                "id": (0, uniqid_1.default)(),
                "plugin": this._Descriptor.info.title,
                command
            };
            if ("undefined" !== typeof data) {
                result.data = (0, cleanSendedError_1.default)(data);
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
                            client.id = (0, uniqid_1.default)();
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
    getClients() {
        var _a, _b;
        switch (this._serverType()) {
            case "WEBSOCKET": {
                const result = [];
                this._socketServer.clients.forEach((s) => {
                    if (!s.id) {
                        s.id = (0, uniqid_1.default)();
                    }
                    return {
                        "id": s.id,
                        "status": WEBSOCKET_STATE_OPEN === s.readyState ? "CONNECTED" : "DISCONNECTED"
                    };
                });
                return result;
            }
            case "SOCKETIO": {
                const result = [];
                if ("function" !== typeof ((_b = (_a = this._socketServer.sockets) === null || _a === void 0 ? void 0 : _a.sockets) === null || _b === void 0 ? void 0 : _b.has)) { // SocketIO V2
                    for (const key in this._socketServer.sockets.sockets) {
                        const s = this._socketServer.sockets.sockets[key];
                        result.push({
                            "id": s.id,
                            "status": s.connected ? "CONNECTED" : "DISCONNECTED"
                        });
                    }
                }
                else {
                    this._socketServer.sockets.sockets.forEach((s) => {
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
    pushClient(clientId, command, data, log = true) {
        const serverType = this._serverType();
        if (!["WEBSOCKET", "SOCKETIO"].includes(serverType)) {
            return this;
        }
        // valid descriptor && formate data
        this.checkDescriptor().then(() => {
            const result = {
                "id": (0, uniqid_1.default)(),
                "plugin": this._Descriptor.info.title,
                command
            };
            if ("undefined" !== typeof data) {
                result.data = (0, cleanSendedError_1.default)(data);
            }
            return Promise.resolve(JSON.stringify(result));
            // log & send data
        }).then((result) => {
            switch (serverType) {
                case "WEBSOCKET":
                    this._socketServer.clients.forEach((client) => {
                        if (!client.id) {
                            client.id = (0, uniqid_1.default)();
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
                    {
                        const socket = this._getUsableSocketIOClient(clientId);
                        if (socket) {
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
    init(...data) {
        return this.checkDescriptor().then(() => {
            return this.checkMediator();
        }).then(() => {
            return this._initWorkSpace(...data);
        }).then(() => {
            this.initialized = true;
            this.emit("initialized", ...data);
        });
    }
    release(...data) {
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
}
exports.default = Server;
