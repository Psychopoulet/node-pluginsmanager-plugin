/// <reference types="node" />
/// <reference types="ws" />
/// <reference types="socket.io" />

declare module "node-pluginsmanager-plugin" {

	import { Server as WebSocketServer } from "ws";
	import { Server as SocketIOServer } from "socket.io";

	// components

		export interface iOrchestratorOptions {
			"externalRessourcesDirectory": string; // used to write local data like sqlite database, json files, pictures, etc...
			"packageFile": string; // package file used by the plugin (absolute path)
			"descriptorFile": string; // descriptor file used by the plugin (absolute path)
			"mediatorFile": string; // mediator file used by the plugin (absolute path)
			"serverFile": string; // server file used by the plugin (absolute path)
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

}
