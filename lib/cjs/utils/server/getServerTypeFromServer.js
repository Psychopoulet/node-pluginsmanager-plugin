"use strict";
// types & interfaces
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getServerTypeFromServer;
// module
function getServerTypeFromServer(server) {
    if ("undefined" === typeof server || null === server) {
        return "NO_SERVER";
    }
    if ("object" === typeof server.clients) {
        const { clients } = server;
        if ("function" === typeof clients.forEach) {
            return "WEBSOCKET";
        }
    }
    if ("object" === typeof server.sockets) {
        const { sockets } = server;
        if ("function" === typeof sockets.emit) { // both versions of Socket.IO have an "emit" property
            return "SOCKETIO";
        }
    }
    return "UNKNOWN";
}
