import type { Server as WebSocketServer } from "ws";
import type { Server as SocketIOServer } from "socket.io";
import type { Server as SocketIOServerV2 } from "../../../../@types/socket.io-v2";
export default function getServerTypeFromServer(server: WebSocketServer | SocketIOServer | SocketIOServerV2 | null | undefined): "NO_SERVER" | "V2" | "V3-V4" | "UNKNOWN";
