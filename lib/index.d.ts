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

		export type tLogType = "log" | "info" | "warning" | "error" | "debug";

		export interface iDescriptorUserOptions {
			"descriptor": { [key:string]: any };
			"externalRessourcesDirectory": string;
			"logger"?: (type: tLogType, message: string, bold?: boolean) => void;
		}

		export interface iMediatorUserOptions extends iDescriptorUserOptions {
				"mediator": Mediator | null;
			}

		export interface iUrlParameters {
			"url": {
				"path": object;
				"query": object;
				"headers": object;
				"cookies": object;
			};
		}

		export interface iOrchestratorOptions {
			"externalRessourcesDirectory": string;
			"packageFile": string;
			"descriptorFile": string;
			"mediatorFile": string;
			"serverFile": string;
		}

		export class DescriptorUser extends EventEmitter {

			// attributes

				// public

					public initialized: boolean;

				// protected

					protected _descriptorValidated: boolean;

					protected _externalRessourcesDirectory: string;

					protected _Descriptor: object | null;
					protected _Logger: Function | null;

			// constructor

				constructor (options: iDescriptorUserOptions);

			// methods

				// protected

					protected _initWorkSpace(data?: any): Promise<void>;
					protected _releaseWorkSpace(data?: any): Promise<void>;
					protected _log(type: tLogType, message: string, bold?: boolean): this;

				// public

					public checkDescriptor(): Promise<void>;
					public init(data?: any): Promise<void>;
					public release(data?: any): Promise<void>;

		}

		export class Mediator extends DescriptorUser {

			// attributes

				public _validator: null | object;

			// methods

				public checkParameters(operationId: string, urlParams: iUrlParameters, bodyParams: object): Promise<void>;
				public checkResponse(operationId: string, res: Response): Promise<void>;

		}

		export class MediatorUser extends DescriptorUser {

			// attributes

				protected _Mediator: Mediator | null;

			// constructor

				constructor (options: iMediatorUserOptions);

			// methods

				public checkMediator(): Promise<void>;

		}

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

				public checkConf(): Promise<void>;
				public isEnable(): Promise<void>;
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
