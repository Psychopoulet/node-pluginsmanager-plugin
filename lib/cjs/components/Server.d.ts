import MediatorUser, { type iMediatorUserOptions } from "./MediatorUser";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Server as WebSocketServer } from "ws";
import type { Server as SocketIOServer } from "socket.io";
import type { tEventMap, iEventsMinimal } from "./DescriptorUser";
export interface iClient {
    "id": string;
    "status": "CONNECTED" | "DISCONNECTED";
}
export interface iIncomingMessage extends IncomingMessage {
    "method": string;
    "pattern": string;
    "validatedIp": string;
    "params": Record<string, any>;
    "query": Record<string, unknown>;
    "headers": Record<string, any>;
    "header"?: Record<string, unknown>;
    "cookies": Record<string, any>;
    "cookie"?: Record<string, unknown>;
    "body": string;
    "ip": string;
}
export interface iServerResponse extends ServerResponse {
    "body": string;
    "headers": Record<string, any>;
}
export default class Server<T extends tEventMap<T> = iEventsMinimal> extends MediatorUser<T> {
    protected _socketServer: WebSocketServer | SocketIOServer | null;
    protected _checkParameters: boolean;
    protected _checkResponse: boolean;
    protected _cors: boolean;
    constructor(opt: iMediatorUserOptions);
    protected _serverType(): "NO_SERVER" | "WEBSOCKET" | "SOCKETIO" | "UNKNOWN";
    protected _getUsableSocketIOClient(clientId: string): {
        "emit": (event: string, ...data: unknown[]) => void;
    } | undefined;
    disableCheckParameters(): this;
    enableCheckParameters(): this;
    disableCheckResponse(): this;
    enableCheckResponse(): this;
    disableCors(): this;
    enableCors(): this;
    appMiddleware(_req: IncomingMessage, res: iServerResponse, next: (err?: Error) => void): void;
    socketMiddleware(socketServer: WebSocketServer | SocketIOServer): void;
    push(command: string, data?: any, log?: boolean): this;
    getClients(): iClient[];
    pushClient(clientId: string, command: string, data?: unknown, log?: boolean): this;
    init(...data: unknown[]): Promise<void>;
    release(...data: unknown[]): Promise<void>;
}
