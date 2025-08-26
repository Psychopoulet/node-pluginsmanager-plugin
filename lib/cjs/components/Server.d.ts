import MediatorUser, { type iMediatorUserOptions } from "./MediatorUser";
import type { IncomingMessage, ServerResponse } from "node:http";
import type { Server as WebSocketServer } from "ws";
import type { Server as SocketIOServer } from "socket.io";
export interface iClient {
    "id": string;
    "status": "CONNECTED" | "DISCONNECTED";
}
export interface iIncomingMessage extends IncomingMessage {
    "method": string;
    "pattern": string;
    "validatedIp": string;
    "params": Record<string, any>;
    "query": Record<string, any>;
    "headers": Record<string, any>;
    "header"?: Record<string, any>;
    "cookies": Record<string, any>;
    "cookie"?: Record<string, any>;
    "body": string;
}
export interface iServerResponse extends ServerResponse {
    "body": string;
    "headers": Record<string, any>;
}
export default class Server extends MediatorUser {
    protected _socketServer: WebSocketServer | SocketIOServer | null;
    protected _checkParameters: boolean;
    protected _checkResponse: boolean;
    protected _cors: boolean;
    constructor(opt: iMediatorUserOptions);
    protected _serverType(): "NO_SERVER" | "WEBSOCKET" | "SOCKETIO" | "UNKNOWN";
    protected _getUsableSocketIOClient(clientId: string): {
        "emit": (event: string, data: any) => void;
    } | undefined;
    disableCheckParameters(): this;
    enableCheckParameters(): this;
    disableCheckResponse(): this;
    enableCheckResponse(): this;
    disableCors(): this;
    enableCors(): this;
    appMiddleware(req: iIncomingMessage, res: iServerResponse, next: (err?: Error) => void): void;
    socketMiddleware(socketServer: WebSocketServer | SocketIOServer): void;
    push(command: string, data?: any, log?: boolean): this;
    getClients(): iClient[];
    pushClient(clientId: string, command: string, data?: any, log?: boolean): this;
    init(...data: any): Promise<void>;
    release(...data: any): Promise<void>;
}
