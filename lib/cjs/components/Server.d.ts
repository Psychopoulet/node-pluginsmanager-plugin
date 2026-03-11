import MediatorUser, { type iMediatorUserOptions } from "./MediatorUser";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Server as WebSocketServer } from "ws";
import type { Server as SocketIOServer } from "socket.io";
import type { Server as SocketIOServerV2 } from "../../../@types/socket.io-v2";
import type { tMethod } from "../openAPITypes";
import type { tEventMap, iEventsMinimal } from "./DescriptorUser";
export interface iClient {
    "id": string;
    "status": "CONNECTED" | "DISCONNECTED";
}
export interface iIncomingMessage extends IncomingMessage {
    "method": tMethod;
    "pattern": string;
    "validatedIp": string;
    "params": Record<string, string | number | boolean>;
    "query": Record<string, unknown>;
    "header"?: Record<string, unknown>;
    "cookies": Record<string, unknown>;
    "cookie"?: Record<string, unknown>;
    "body": unknown;
    "ip": string;
}
export interface iFormatedServerResponseForValidation extends ServerResponse {
    "body": string;
    "headers": Record<string, unknown>;
}
export default class Server<T extends tEventMap<T> = iEventsMinimal> extends MediatorUser<T> {
    protected _socketServer: WebSocketServer | SocketIOServer | SocketIOServerV2 | null;
    protected _checkParameters: boolean;
    protected _checkResponse: boolean;
    protected _cors: boolean;
    constructor(opt: iMediatorUserOptions);
    protected _getServerType(): "NO_SERVER" | "WEBSOCKET" | "SOCKETIO" | "UNKNOWN";
    protected _getSocketIOVersion(): "NO_SERVER" | "V2" | "V3-V4" | "UNKNOWN";
    protected _getUsableSocketIOClient(clientId: string): {
        "emit": (event: string, ...data: unknown[]) => void;
    } | undefined;
    disableCheckParameters(): this;
    enableCheckParameters(): this;
    disableCheckResponse(): this;
    enableCheckResponse(): this;
    disableCors(): this;
    enableCors(): this;
    appMiddleware(_req: IncomingMessage, res: ServerResponse, next: (err?: Error) => void): void;
    socketMiddleware(socketServer: WebSocketServer | SocketIOServer | SocketIOServerV2): void;
    push(command: string, data?: unknown, log?: boolean): this;
    getClients(): iClient[];
    pushClient(clientId: string, command: string, data?: unknown, log?: boolean): this;
    init(...data: unknown[]): Promise<void>;
    release(...data: unknown[]): Promise<void>;
}
