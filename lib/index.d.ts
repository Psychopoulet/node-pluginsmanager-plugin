/// <reference types="node" />
/// <reference types="ws" />

declare module "node-pluginsmanager-plugin" {

	import * as Events from "events";
	import { Server as WebSocketServer } from "ws";

	// options

	interface iServerOptions {
		"descriptor": object;
		"mediator": Mediator;
	}

	interface iOrchestratorOptions {
		"packageFile": string;
		"descriptorFile": string;
		"mediatorFile": string;
		"serverFile": string;
		"externalRessourcesDirectory": string;
	}

	interface iPath {
		"path": string;
		"method": string;
	}

	// classes

	class Bootable extends Events {

		// methods

			protected _initWorkSpace(data?: any): Promise<void>;
			protected _releaseWorkSpace(data?: any): Promise<void>;

			public init(data?: any): Promise<void>;
			public release(data?: any): Promise<void>;

	}

	export class Mediator extends Bootable {

		// attributes

			public initialized: boolean;

	}

	class MediatorUser extends Bootable {

		// attributes

			protected _Descriptor: object | null;
			protected _Mediator: Mediator | null;

		// methods

			public checkDescriptor(): Promise<void>;
			public checkMediator(): Promise<void>;

			public getPaths(): Promise<Array<iPath>>;

	}

	export class Server extends MediatorUser {

		// constructor

			constructor (options: iServerOptions);

		// methods

			public appMiddleware(req: Request, res: Response, next: Function): void;
			public httpMiddleware(req: Request, res: Response): boolean;
			public socketMiddleware(server: WebSocketServer): void;

	}

	export class Orchestrator extends MediatorUser {

		// constructor

			constructor (options: iOrchestratorOptions);

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

		// methods

			// public

				// checkers

				public checkConf(): Promise<void>;
				public isEnable(): Promise<void>;
				public checkFiles(): Promise<void>;
				public checkServer(): Promise<void>;
				public checkServerSync(): boolean;

				// middleware

				public appMiddleware(req: Request, res: Response, next: Function): Promise<void>;
				public httpMiddleware(req: Request, res: Response): Promise<void>;
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
