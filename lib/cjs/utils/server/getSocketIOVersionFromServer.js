"use strict";
// types & interfaces
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getServerTypeFromServer;
// module
function getServerTypeFromServer(server) {
    if ("undefined" === typeof server || null === server) {
        return "NO_SERVER";
    }
    if ("object" === typeof server.sockets
        && "function" === typeof server.sockets.emit) {
        const { sockets } = server;
        if ("function" === typeof sockets.sockets.has) {
            return "V3-V4";
        }
        return "V2";
    }
    return "UNKNOWN";
}
