/// <reference types="node" />

declare module "node-pluginsmanager-plugin" {

	import * as Events from"events";

	class Bootable extends Events {

		// methods

			public init(data?: any): Promise<void>;
			public release(data?: any): Promise<void>;

	}

	export class Mediator extends Bootable {

		// attributes

			public initialized: boolean;

		// methods

			protected _fireInitialized(): Promise<void>;
			public checkConf(): Promise<void>;

	}

	class MediatorUserOptions extends Object {

		public mediator: Mediator;

	}

	class MediatorUser extends Bootable {

		// constructor

			constructor (options: MediatorUserOptions);

		// attributes

			protected _Mediator: Mediator | null;

		// methods

			public checkMediator(): Promise<void>;

	}

	export class Server extends MediatorUser {

		// methods

			public appMiddleware(req: Request, res: Response, next: Function): void;
			public httpMiddleware(req: Request, res: Response): boolean;

	}

	class OrchestratorOptions extends MediatorUserOptions {

		public packageFile: string;
		public mediatorFile: string;
		public serverFile: string;

	}

	export class Orchestrator extends MediatorUser {

		// constructor

			constructor (options: OrchestratorOptions);

		// attributes

			// params
			protected _packageFile: string;
			protected _mediatorFile: string;
			protected _serverFile: string;

			protected _Server: Server | null;

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

			public checkFiles(): Promise<void>;
			public checkServer(): Promise<void>;
			public appMiddleware(req: Request, res: Response, next: Function): Promise<void>;
			public httpMiddleware(req: Request, res: Response): Promise<void>;

			// read

			public loadDataFromPackageFile(): Promise<void>;

			// load

			public destroy(): Promise<void>;

			// write

			public install(data?: any): Promise<void>;
			public update(data?: any): Promise<void>;
			public uninstall(data?: any): Promise<void>;

	}

}
