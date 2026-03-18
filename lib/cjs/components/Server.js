"use strict";
/*
    eslint-disable camelcase
*/
// => camelcase is disabled because of "openapi-types" types
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// deps
// natives
const node_os_1 = require("node:os");
const node_url_1 = require("node:url");
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
const send_1 = __importDefault(require("../utils/send"));
const cleanSendedError_1 = __importDefault(require("../utils/cleanSendedError"));
const MediatorUser_1 = __importDefault(require("./MediatorUser"));
const UnauthorizedError_1 = __importDefault(require("./errors/UnauthorizedError"));
const NotFoundError_1 = __importDefault(require("./errors/NotFoundError"));
const LockedError_1 = __importDefault(require("./errors/LockedError"));
const serverCodes_1 = __importDefault(require("../utils/serverCodes"));
const getServerTypeFromServer_1 = __importDefault(require("../utils/server/getServerTypeFromServer"));
const getSocketIOVersionFromServer_1 = __importDefault(require("../utils/server/getSocketIOVersionFromServer"));
// consts
const WEBSOCKET_STATE_OPEN = 1;
// module
// Please note the fact that "init" and "release" method MUST NOT be re-written. Each child has its own init logic.
class Server extends MediatorUser_1.default {
    // attributes
    // protected
    _socketServer;
    _checkParameters;
    _checkResponse;
    _cors;
    // constructor
    constructor(opt) {
        super(opt);
        this._socketServer = null;
        this._checkParameters = true;
        this._checkResponse = false;
        this._cors = false;
    }
    // protected
    _getServerType() {
        return (0, getServerTypeFromServer_1.default)(this._socketServer);
    }
    _getSocketIOVersion() {
        return (0, getSocketIOVersionFromServer_1.default)(this._socketServer);
    }
    _getUsableSocketIOClient(clientId) {
        if ("SOCKETIO" === this._getServerType()) {
            const socketIOVersion = this._getSocketIOVersion();
            if ("V2" === socketIOVersion) {
                const { sockets } = this._socketServer.sockets;
                for (const key in sockets) {
                    if (key === clientId) {
                        if (sockets[key].connected) {
                            return sockets[key];
                        }
                        break;
                    }
                }
            }
            if ("V3-V4" === socketIOVersion) {
                const { sockets } = this._socketServer.sockets;
                if (sockets.has(clientId)) {
                    const result = sockets.get(clientId);
                    if (true === result?.connected) { // force boolean comparison to avoid lint errors with "?"
                        return result;
                    }
                }
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
    appMiddleware(_req, res, next) {
        if (!this._Descriptor?.paths) {
            next();
            return;
        }
        this.checkDescriptor().then(() => {
            const req = Object.assign(_req);
            if ("undefined" === typeof req.url) {
                return next();
            }
            // parse
            const { pathname, searchParams } = new node_url_1.URL(req.url, "http://localhost"); // any url, but "http://localhost" is used to avoid errors
            const query = Object.fromEntries(searchParams);
            if (0 >= pathname.length) {
                return next();
            }
            req.method = "string" === typeof _req.method ? _req.method.toLowerCase() : "get";
            req.pattern = null === (0, checkNonEmptyString_1.checkNonEmptyStringSync)("pattern", req.pattern) ? req.pattern : (0, extractPattern_1.default)(this._Descriptor.paths, pathname, req.method);
            if (0 >= req.pattern.length) {
                return next();
            }
            // extract specific data
            try {
                // workaround for express 5
                if ("app" in Object.getPrototypeOf(req)) {
                    Object.defineProperty(req, "query", {
                        ...Object.getOwnPropertyDescriptor(req, "query"),
                        "value": req.query,
                        "writable": true
                    });
                }
                req.validatedIp = null === (0, checkNonEmptyString_1.checkNonEmptyStringSync)("ip", req.validatedIp) ? req.validatedIp : (0, extractIp_1.default)(req);
                // url
                req.params = null === (0, checkNonEmptyObject_1.checkNonEmptyObjectSync)("params", req.params) ? req.params : (0, extractParams_1.default)(req.pattern, pathname);
                req.query = null === (0, checkNonEmptyObject_1.checkNonEmptyObjectSync)("query", req.query) ? req.query : query;
                if (null !== (0, checkNonEmptyObject_1.checkNonEmptyObjectSync)("headers", req.headers)) {
                    req.headers = null === (0, checkNonEmptyObject_1.checkNonEmptyObjectSync)("header", req.header) ? req.header : {};
                }
                if (null !== (0, checkNonEmptyObject_1.checkNonEmptyObjectSync)("cookies", req.cookies)) {
                    req.cookies = null === (0, checkNonEmptyObject_1.checkNonEmptyObjectSync)("header", req.cookie) ? req.cookie : (0, extractCookies_1.default)(req);
                }
                // ensure content length formate
                if ("undefined" === typeof req.headers["content-length"]) {
                    req.headers["content-length"] = "0";
                }
                else if ("number" === typeof req.headers["content-length"]) {
                    req.headers["content-length"] = String(req.headers["content-length"]);
                }
            }
            catch (e) {
                return next(e);
            }
            const { paths } = this._Descriptor;
            // enforce with try to avoid unexpected (data are theoretically validated by types, but can be wrong in practice, like with pure JS dev)
            try {
                if (!paths[req.pattern][req.method]) {
                    return next();
                }
            }
            catch {
                return next();
            }
            const operation = paths[req.pattern][req.method];
            const { operationId } = operation; // operationId is "any", had to specify the type to avoid lint errors
            const apiVersion = this._Descriptor.info.version;
            const contentType = req.headers["content-type"] ?? req.headers["Content-Type"] ?? "";
            const { responses } = operation; // response is "any", had to specify the type to avoid lint errors
            const contentLengthParsed = Number.parseInt(req.headers["content-length"], 10);
            this._log("info", ""
                + "=> [" + req.validatedIp + "] " + req.url + " (" + req.method.toUpperCase() + ")"
                + ("undefined" !== typeof operationId ? node_os_1.EOL + "operationId    : " + operationId : "")
                + ("undefined" !== typeof req.headers["content-type"] ? node_os_1.EOL + "content-type   : " + req.headers["content-type"] : "")
                + ("get" !== req.method && !Number.isNaN(contentLengthParsed) && 4 < contentLengthParsed
                    ? node_os_1.EOL + "content-length : " + req.headers["content-length"]
                    : ""));
            // get descriptor
            if ("/" + this._Descriptor.info.title + "/api/descriptor" === req.pattern && "get" === req.method) {
                // add current server
                const port = res.socket?.localPort ?? (res.socket?.address()).port;
                const descriptor = { ...this._Descriptor };
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
                    }).then(() => {
                        // force return nothing
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
                }).then(() => {
                    // force return nothing
                });
            }
            // missing operationId
            else if ("undefined" === typeof operationId) {
                const result = JSON.stringify({
                    "code": "NOT_IMPLEMENTED",
                    "message": "Missing \"operationId\" in the Descriptor for this request"
                });
                this._log("error", "<= [" + req.validatedIp + "] " + result);
                return (0, send_1.default)(req, res, serverCodes_1.default.NOT_IMPLEMENTED, result, {
                    "apiVersion": apiVersion,
                    "cors": this._cors,
                    "mime": (0, extractMime_1.default)(contentType, serverCodes_1.default.NOT_IMPLEMENTED, responses)
                }).then(() => {
                    // force return nothing
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
                }).then(() => {
                    // force return nothing
                });
            }
            // no "Content-Length" header found
            else if ("get" !== req.method && null !== (0, checkInteger_1.checkIntegerSync)("headers[\"content-length\"]", contentLengthParsed)) {
                const result = JSON.stringify({
                    "code": "MISSING_HEADER",
                    "message": "No valid \"Content-Length\" header found"
                });
                this._log("error", "<= [" + req.validatedIp + "] " + result);
                return (0, send_1.default)(req, res, serverCodes_1.default.MISSING_HEADER, result, {
                    "apiVersion": apiVersion,
                    "cors": this._cors,
                    "mime": (0, extractMime_1.default)(contentType, serverCodes_1.default.MISSING_HEADER, responses)
                }).then(() => {
                    // force return nothing
                });
            }
            else {
                // force formate for path parameters
                return Promise.resolve().then(() => {
                    const keys = Object.keys(req.params);
                    if (!keys.length) {
                        return;
                    }
                    const docParameters = (paths[req.pattern][req.method]?.parameters?.filter((p) => {
                        return "path" === p.in;
                    }) ?? []);
                    if (!docParameters.length) {
                        return;
                    }
                    for (let i = 0; i < keys.length; ++i) {
                        const key = keys[i];
                        const schema = docParameters.find((dp) => {
                            return dp.name === key;
                        })?.schema ?? null;
                        if (!schema) {
                            throw new ReferenceError("Unknown parameter: request.params['" + key + "']");
                        }
                        switch ((0, extractSchemaType_1.default)(schema, (this._Descriptor.components?.schemas ?? {}))) {
                            case "boolean":
                                if ("boolean" !== typeof req.params[key]) {
                                    if ("true" === req.params[key]) {
                                        req.params[key] = true;
                                    }
                                    else if ("false" === req.params[key]) {
                                        req.params[key] = false;
                                    }
                                    else {
                                        throw new TypeError("Error while validating request: request.params['" + key + "'] should be boolean");
                                    }
                                }
                                break;
                            case "integer":
                                // error returned, not an integer
                                if (null !== (0, checkInteger_1.checkIntegerSync)("request.params['" + key + "']", req.params[key])) {
                                    const value = Number.parseInt(req.params[key], 10);
                                    if (!Number.isNaN(value)) {
                                        req.params[key] = value;
                                    }
                                    else {
                                        throw new TypeError("Error while validating request: request.params['" + key + "'] should be integer");
                                    }
                                }
                                break;
                            case "number":
                                if ("number" !== typeof req.params[key]) {
                                    const value = Number.parseFloat(req.params[key]);
                                    if (!Number.isNaN(value)) {
                                        req.params[key] = value;
                                    }
                                    else {
                                        throw new TypeError("Error while validating request: request.params['" + key + "'] should be number");
                                    }
                                }
                                break;
                            default:
                                // nothing to do here
                                break;
                        }
                    }
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
                                try {
                                    req.body = JSON.parse(body);
                                }
                                catch {
                                    // nothing to do here
                                }
                            }
                            else {
                                req.body = "";
                            }
                            return req.body;
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
                    // no content
                    if ("undefined" === typeof content || null === content) {
                        this._log("success", "<= [" + req.validatedIp + "] no content");
                        const serverCode = "put" === req.method ? serverCodes_1.default.OK_PUT : serverCodes_1.default.OK_NO_CONTENT;
                        return (0, send_1.default)(req, res, serverCode, "", {
                            "apiVersion": apiVersion,
                            "cors": this._cors,
                            "mime": (0, extractMime_1.default)(contentType, serverCode, responses)
                        });
                    }
                    else {
                        if (Buffer.isBuffer(content)) {
                            this._log("success", "<= [" + req.validatedIp + "] <" + contentType + "> Buffer");
                        }
                        else if ("application/json" === contentType) {
                            this._log("success", "<= [" + req.validatedIp + "] <" + contentType + "> " + JSON.stringify(content));
                        }
                        else if (["application/xml", "text/plain"].includes(contentType) && "string" === typeof content) {
                            this._log("success", "<= [" + req.validatedIp + "] <" + contentType + "> " + content);
                        }
                        else {
                            this._log("success", "<= [" + req.validatedIp + "] <" + contentType + "> ...");
                        }
                        const serverCode = "put" === req.method ? serverCodes_1.default.OK_PUT : serverCodes_1.default.OK;
                        return (0, send_1.default)(req, res, serverCode, content, {
                            "apiVersion": apiVersion,
                            "cors": this._cors,
                            "mime": (0, extractMime_1.default)(contentType, serverCode, responses)
                        });
                    }
                    // check response
                }).then((response) => {
                    return this._checkResponse ? this._Mediator.checkResponse(operationId, response) : Promise.resolve();
                }).catch((err) => {
                    return Promise.resolve().then(() => {
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
                        else if (err instanceof UnauthorizedError_1.default) {
                            const result = JSON.stringify({
                                "code": "UNAUTHORIZED",
                                "message": (0, cleanSendedError_1.default)(err)
                            });
                            this._log("error", "<= [" + req.validatedIp + "] " + result);
                            return (0, send_1.default)(req, res, serverCodes_1.default.UNAUTHORIZED, result, {
                                "apiVersion": apiVersion,
                                "cors": this._cors,
                                "mime": (0, extractMime_1.default)(contentType, serverCodes_1.default.UNAUTHORIZED, responses)
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
                        else if (err instanceof LockedError_1.default) {
                            const result = JSON.stringify({
                                "code": "LOCKED",
                                "message": (0, cleanSendedError_1.default)(err)
                            });
                            this._log("error", "<= [" + req.validatedIp + "] " + result);
                            return (0, send_1.default)(req, res, serverCodes_1.default.LOCKED, result, {
                                "apiVersion": apiVersion,
                                "cors": this._cors,
                                "mime": (0, extractMime_1.default)(contentType, serverCodes_1.default.LOCKED, responses)
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
                        // still check response for errors
                    }).then((response) => {
                        return this._checkResponse ? this._Mediator.checkResponse(operationId, response) : Promise.resolve();
                    });
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
        const serverType = this._getServerType();
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
                        client.id ??= (0, uniqid_1.default)();
                        if (WEBSOCKET_STATE_OPEN === client.readyState) {
                            client.send(result);
                        }
                    });
                    break;
                case "SOCKETIO":
                    {
                        const sockets = this._socketServer.sockets;
                        sockets.emit("message", result);
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
    getClients() {
        switch (this._getServerType()) {
            case "WEBSOCKET": {
                const result = [];
                this._socketServer.clients.forEach((s) => {
                    s.id ??= (0, uniqid_1.default)();
                    result.push({
                        "id": s.id,
                        "status": WEBSOCKET_STATE_OPEN === s.readyState ? "CONNECTED" : "DISCONNECTED"
                    });
                });
                return result;
            }
            case "SOCKETIO": {
                const socketIOVersion = this._getSocketIOVersion();
                const result = [];
                if ("V2" === socketIOVersion) {
                    const { sockets } = this._socketServer.sockets;
                    for (const key in sockets) {
                        const s = sockets[key];
                        result.push({
                            "id": s.id,
                            "status": s.connected ? "CONNECTED" : "DISCONNECTED"
                        });
                    }
                }
                else if ("V3-V4" === socketIOVersion) {
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
        const serverType = this._getServerType();
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
                        if ("undefined" === typeof client.id) {
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
            this._externalResourcesDirectory = "";
            this._socketServer = null;
            this.initialized = false;
            this.emit("released", ...data);
        }).then(() => {
            this.removeAllListeners();
        });
    }
}
exports.default = Server;
