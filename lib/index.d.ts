/// <reference types="node" />
/// <reference types="ws" />
/// <reference types="socket.io" />

declare module "node-pluginsmanager-plugin" {

	import { EventEmitter } from "events";
	import { Server as WebSocketServer } from "ws";
	import { Server as SocketIOServer } from "socket.io";
	import { OpenApiValidator } from "express-openapi-validate";

	// options

	type tLogType = "log" | "info" | "warning" | "error";

	interface iDescriptorUserOptions {
		"descriptor": object | null;
		"externalRessourcesDirectory": string;
		"logger": Function | null;
	}

		interface iMediatorUserOptions extends iDescriptorUserOptions {
			"mediator": Mediator | null;
		}

	interface iMediatorCheckParametersResult {
		"url": object;
		"body": object;
	}

	interface iOrchestratorOptions {
		"externalRessourcesDirectory": string;
		"packageFile": string;
		"descriptorFile": string;
		"mediatorFile": string;
		"serverFile": string;
	}

	// classes

	class DescriptorUser extends EventEmitter {

		// attributes

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

			public initialized: boolean;
			public _validator: null | OpenApiValidator;

		// methods

			public checkParameters(operationId: string, urlParams: object, bodyParams: object, contentType: string): Promise<iMediatorCheckParametersResult>;

	}

	class MediatorUser extends DescriptorUser {

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

		// methods

			public disableCheckParameters(): this;
			public enableCheckParameters(): this;

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

				// params
				protected _packageFile: string;
				protected _descriptorFile: string;
				protected _mediatorFile: string;
				protected _serverFile: string;

				protected _extended: Array<string>;

			// public

				public enabled: boolean;
				public initialized: boolean;

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

			public appMiddleware(req: Request, res: Response, next: Function): void;
			public socketMiddleware(server: WebSocketServer | SocketIOServer): void;

			// init / release

			public load(): Promise<void>;
			public destroy(): Promise<void>;

			// write

			public install(data?: any): Promise<void>;
			public update(data?: any): Promise<void>;
			public uninstall(data?: any): Promise<void>;

	}

}
