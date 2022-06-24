/// <reference types="node" />
/// <reference types="ws" />
/// <reference types="socket.io" />

declare module "node-pluginsmanager-plugin" {

	import { EventEmitter } from "events";
	import { Server as WebSocketServer } from "ws";
	import { Server as SocketIOServer } from "socket.io";

	// checkers

		// undefined
		export function checkExists (dataName: string, data: any, async?: boolean): Promise<void>;
		export function checkExists (dataName: string, data: any, async: boolean): null | ReferenceError;

		// native
		export function checkBoolean (dataName: string, data: any, async?: boolean): Promise<void>;
		export function checkBoolean (dataName: string, data: any, async: boolean): null | ReferenceError | TypeError;

		export function checkFunction (dataName: string, data: any, async?: boolean): Promise<void>;
		export function checkFunction (dataName: string, data: any, async: boolean): null | ReferenceError | TypeError;

		export function checkNumber (dataName: string, data: any, async?: boolean): Promise<void>;
		export function checkNumber (dataName: string, data: any, async: boolean): null | ReferenceError | TypeError;

		export function checkObject (dataName: string, data: any, async?: boolean): Promise<void>;
		export function checkObject (dataName: string, data: any, async: boolean): null | ReferenceError | TypeError;

		export function checkString (dataName: string, data: any, async?: boolean): Promise<void>;
		export function checkString (dataName: string, data: any, async: boolean): null | ReferenceError | TypeError;

		// abstract
		export function checkArray (dataName: string, data: any, async?: boolean): Promise<void>;
		export function checkArray (dataName: string, data: any, async: boolean): null | ReferenceError | TypeError;

		export function checkInteger (dataName: string, data: any, async?: boolean): Promise<void>;
		export function checkInteger (dataName: string, data: any, async: boolean): null | ReferenceError | TypeError;

		// empty
		export function checkNonEmptyArray (dataName: string, data: any, async?: boolean): Promise<void>;
		export function checkNonEmptyArray (dataName: string, data: any, async: boolean): null | ReferenceError | TypeError | RangeError;

		export function checkNonEmptyInteger (dataName: string, data: any, async?: boolean): Promise<void>;
		export function checkNonEmptyInteger (dataName: string, data: any, async: boolean): null | ReferenceError | TypeError | RangeError;

		export function checkNonEmptyNumber (dataName: string, data: any, async?: boolean): Promise<void>;
		export function checkNonEmptyNumber (dataName: string, data: any, async: boolean): null | ReferenceError | TypeError | RangeError;

		export function checkNonEmptyObject (dataName: string, data: any, async?: boolean): Promise<void>;
		export function checkNonEmptyObject (dataName: string, data: any, async: boolean): null | ReferenceError | TypeError | RangeError;

		export function checkNonEmptyString (dataName: string, data: any, async?: boolean): Promise<void>;
		export function checkNonEmptyString (dataName: string, data: any, async: boolean): null | ReferenceError | TypeError | RangeError;

		// range
		export function checkArrayLength (dataName: string, data: any, length: number, async?: boolean): Promise<void>;
		export function checkArrayLength (dataName: string, data: any, length: number, async: boolean): null | ReferenceError | TypeError | RangeError;

		export function checkArrayLengthBetween (dataName: string, data: any, min: number, max: number, async?: boolean): Promise<void>;
		export function checkArrayLengthBetween (dataName: string, data: any, min: number, max: number, async: boolean): null | ReferenceError | TypeError | RangeError;

		export function checkIntegerBetween (dataName: string, data: any, min: number, max: number, async?: boolean): Promise<void>;
		export function checkIntegerBetween (dataName: string, data: any, min: number, max: number, async: boolean): null | ReferenceError | TypeError | RangeError;

		export function checkNumberBetween (dataName: string, data: any, min: number, max: number, async?: boolean): Promise<void>;
		export function checkNumberBetween (dataName: string, data: any, min: number, max: number, async: boolean): null | ReferenceError | TypeError | RangeError;

		export function checkObjectLength (dataName: string, data: any, length: number, async?: boolean): Promise<void>;
		export function checkObjectLength (dataName: string, data: any, length: number, async: boolean): null | ReferenceError | TypeError | RangeError;

		export function checkObjectLengthBetween (dataName: string, data: any, min: number, max: number, async?: boolean): Promise<void>;
		export function checkObjectLengthBetween (dataName: string, data: any, min: number, max: number, async: boolean): null | ReferenceError | TypeError | RangeError;

		export function checkStringLength (dataName: string, data: any, length: number, async?: boolean): Promise<void>;
		export function checkStringLength (dataName: string, data: any, length: number, async: boolean): null | ReferenceError | TypeError | RangeError;

		export function checkStringLengthBetween (dataName: string, data: any, min: number, max: number, async?: boolean): Promise<void>;
		export function checkStringLengthBetween (dataName: string, data: any, min: number, max: number, async: boolean): null | ReferenceError | TypeError | RangeError;

	// components

		export interface iOrchestratorOptions {
			"externalRessourcesDirectory": string; // used to write local data like sqlite database, json files, pictures, etc...
			"packageFile": string; // package file used by the plugin (absolute path)
			"descriptorFile": string; // descriptor file used by the plugin (absolute path)
			"mediatorFile": string; // mediator file used by the plugin (absolute path)
			"serverFile": string; // server file used by the plugin (absolute path)
		}

		// Please note the fact that "init" and "release" method MUST NOT be re-writted. Each child has is own init logic.
		export class Server extends MediatorUser {

			// attributes

				protected _socketServer: WebSocketServer | SocketIOServer | null;
				protected _checkParameters: boolean;
				protected _checkResponse: boolean;
				protected _cors: boolean;

			// methods

				public disableCheckParameters(): this;
				public enableCheckParameters(): this;
				public disableCheckResponse(): this;
				public enableCheckResponse(): this;

				public disableCors(): this;
				public enableCors(): this;

				public appMiddleware(req: Request, res: Response, next: Function): void;
				public socketMiddleware(server: WebSocketServer | SocketIOServer): void;
				public push(command: string, data?: any): this;

		}

		// Please note the fact that "init" and "release" method MUST NOT be re-writted. Each child has is own init logic.
		export class Orchestrator extends MediatorUser {

			// attributes

				// protected

					protected _Server: Server | null;
					protected _socketServer: WebSocketServer | SocketIOServer | null;
					protected _checkParameters: boolean;
					protected _checkResponse: boolean;

					// params
					protected _packageFile: string;
					protected _descriptorFile: string;
					protected _mediatorFile: string;
					protected _serverFile: string;

					protected _extended: Array<string>;

				// public

					public enabled: boolean;

					// native
					public authors: Array<string> | null;
					public description: string;
					public dependencies: object | null;
					public devDependencies: object | null;
					public engines: object | null;
					public license: string;
					public main: string;
					public name: string;
					public scripts: object | null;
					public version: string;

			// constructor

				constructor (options: iOrchestratorOptions);

			// methods

				// checkers

				public checkConf(): Promise<void>; // check plugin's conf (optional, can be re-writted if a specific conf is used)
				public isEnable(): Promise<void>; // used to define plugin execution (optional, can be re-writted with a local plugins manager) (WARNING : it's an asynchronous setter, not a getter)
				public checkFiles(): Promise<void>;
				public checkServer(): Promise<void>;

				// middleware

				public disableCheckParameters(): this;
				public enableCheckParameters(): this;
				public disableCheckResponse(): this;
				public enableCheckResponse(): this;

				public disableCors(): this;
				public enableCors(): this;

				public appMiddleware(req: Request, res: Response, next: Function): void;
				public socketMiddleware(server: WebSocketServer | SocketIOServer): void;

				// init / release

				public load(data?: any): Promise<void>;
				public destroy(data?: any): Promise<void>;

				// write

				public install(data?: any): Promise<void>;
				public update(data?: any): Promise<void>;
				public uninstall(data?: any): Promise<void>;

		}

		export class NotFoundError extends Error {}

}
