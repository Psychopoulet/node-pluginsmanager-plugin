/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "http";
import { Server as WebSocketServer } from "ws";
import { Server as SocketIOServer } from "socket.io";
import MediatorUser, { iMediatorUserOptions } from "./MediatorUser";
interface iClient {
    "id": string;
    "status": "CONNECTED" | "DISCONNECTED";
}
export interface iIncomingMessage extends IncomingMessage {
    "method": string;
    "pattern": string;
    "validatedIp": string;
    "headers": {
        [key: string]: any;
    };
    "cookies": {
        [key: string]: any;
    };
    "query": {
        [key: string]: any;
    };
    "params": {
        [key: string]: any;
    };
    "body": any;
}
export interface iServerResponse extends ServerResponse {
    "body": any;
    "headers": {
        [key: string]: any;
    };
}
export default class Server extends MediatorUser {
    protected _socketServer: WebSocketServer | SocketIOServer | null;
    protected _checkParameters: boolean;
    protected _checkResponse: boolean;
    protected _cors: boolean;
    constructor(opt: iMediatorUserOptions);
    protected _serverType(): "NO_SERVER" | "WEBSOCKET" | "SOCKETIO" | "UNKNOWN";
    disableCheckParameters(): this;
    enableCheckParameters(): this;
    disableCheckResponse(): this;
    enableCheckResponse(): this;
    disableCors(): this;
    enableCors(): this;
    appMiddleware(_req: IncomingMessage | iIncomingMessage, res: iServerResponse, next: Function): void;
    socketMiddleware(socketServer: WebSocketServer | SocketIOServer): void;
    push(command: string, data?: any, log?: boolean): this;
    getClients(): Array<iClient>;
    pushClient(clientId: string, command: string, data: any, log?: boolean): this;
    init(...data: Array<any>): Promise<void>;
    release(...data: Array<any>): Promise<void>;
}
export {};
