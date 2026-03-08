// types & interfaces

    // externals
    import type { Server as WebSocketServer } from "ws";
    import type { Server as SocketIOServer } from "socket.io";
    import type { Server as SocketIOServerV2 } from "socket.io-v2";

// module

export default function getServerTypeFromServer (server: WebSocketServer | SocketIOServer | SocketIOServerV2 | null | undefined): "NO_SERVER" | "V2" | "V3-V4" | "UNKNOWN" {

    if ("undefined" === typeof server || null === server) {
        return "NO_SERVER";
    }

    if (
        "object" === typeof (server as unknown as Record<string, unknown>).sockets
        && "function" === typeof (server as unknown as SocketIOServer | SocketIOServerV2).sockets.emit
    ) {

        const { sockets } = server as SocketIOServer | SocketIOServerV2;

        if ("function" === typeof sockets.sockets.has) {
            return "V3-V4";
        }

        return "V2";

    }

    return "UNKNOWN";

}
