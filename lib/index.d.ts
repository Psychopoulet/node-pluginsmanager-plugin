/// <reference types="node" />
/// <reference types="ws" />

declare module "node-pluginsmanager-plugin" {

	import * as Events from "events";
	import { Server as WebSocketServer } from "ws";

	// options

	interface iDescriptorUserOptions {
		"descriptor": object | null;
		"externalRessourcesDirectory": string;
	}

		interface iMediatorUserOptions extends iDescriptorUserOptions {
			"mediator": Mediator | null;
		}

	interface iOrchestratorOptions {
		"externalRessourcesDirectory": string;
		"packageFile": string;
		"descriptorFile": string;
		"mediatorFile": string;
		"serverFile": string;
	}

	// classes

	class DescriptorUser extends Events {

		// attributes

			// protected

				protected _Descriptor: object | null;
				protected _externalRessourcesDirectory: string;
				protected _descriptorValidated: boolean;

		// constructor

			constructor (options: iDescriptorUserOptions);

		// methods

			// protected

				protected _initWorkSpace(data?: any): Promise<any>;
				protected _releaseWorkSpace(data?: any): Promise<any>;

			// public

				public checkDescriptor(): Promise<void>;
				public init(data?: any): Promise<any>;
				public release(data?: any): Promise<any>;

	}

	export class Mediator extends DescriptorUser {

		// attributes

			public initialized: boolean;

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

			protected _socketServer: WebSocketServer | null;

		// methods

			public appMiddleware(req: Request, res: Response, next: Function): void;
			public socketMiddleware(server: WebSocketServer): void;
			public push(command: string, data?: any): this;

	}

	export class Orchestrator extends MediatorUser {

		// attributes

			// protected

				protected _Server: Server | null;

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

			public appMiddleware(req: Request, res: Response, next: Function): void;
			public socketMiddleware(server: WebSocketServer): void;

			// init / release

			public load(): Promise<void>;
			public destroy(): Promise<void>;

			// write

			public install(data?: any): Promise<void>;
			public update(data?: any): Promise<void>;
			public uninstall(data?: any): Promise<void>;

	}

}
