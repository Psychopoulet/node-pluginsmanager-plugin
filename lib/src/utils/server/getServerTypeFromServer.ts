// types & interfaces

    // externals
    import type { Server as WebSocketServer } from "ws";
    import type { Server as SocketIOServer } from "socket.io";

    // locals

    import type { Server as SocketIOServerV2 } from "../../../@types/socket.io-v2";

// module

export default function getServerTypeFromServer (server: WebSocketServer | SocketIOServer | SocketIOServerV2 | null | undefined): "NO_SERVER" | "WEBSOCKET" | "SOCKETIO" | "UNKNOWN" {

    if ("undefined" === typeof server || null === server) {
        return "NO_SERVER";
    }

    if ("object" === typeof (server as unknown as Record<string, unknown>).clients) {

        const { clients } = server as WebSocketServer;

        if ("function" === typeof clients.forEach) {
            return "WEBSOCKET";
        }

    }

    if ("object" === typeof (server as unknown as Record<string, unknown>).sockets) {

        const { sockets } = server as SocketIOServer | SocketIOServerV2;

        if ("function" === typeof sockets.emit) { // both versions of Socket.IO have an "emit" property
            return "SOCKETIO";
        }

    }

    return "UNKNOWN";

}
