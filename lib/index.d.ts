/// <reference types="node" />

declare module "node-pluginsmanager-plugin" {

	import * as Events from"events";

	// options

	export class MediatorUserOptions extends Object {

		public mediator: Mediator;

	}

	export class OrchestratorOptions extends MediatorUserOptions {

		public packageFile: string;
		public mediatorFile: string;
		public serverFile: string;

	}

	// classes

	class Bootable extends Events {

		// attributes

			public initialized: boolean;

		// methods

			protected _initWorkSpace(data?: any): Promise<void>;
			protected _releaseWorkSpace(data?: any): Promise<void>;

			protected _fireInitialized(): Promise<void>;
			protected _fireReleased(): Promise<void>;

			public init(data?: any): Promise<void>;
			public release(data?: any): Promise<void>;

	}

	export class Mediator extends Bootable { }

	class MediatorUser extends Bootable {

		// constructor

			constructor (options: MediatorUserOptions);

		// attributes

			protected _Mediator: Mediator | null;

		// methods

			public checkMediator(): Promise<void>;
			public checkMediatorSync(): boolean;

	}

	export class Server extends MediatorUser {

		// methods

			public appMiddleware(req: Request, res: Response, next: Function): void;
			public httpMiddleware(req: Request, res: Response): boolean;

	}

	export class Orchestrator extends MediatorUser {

		// constructor

			constructor (options: OrchestratorOptions);

		// attributes

			// protected

				protected _Server: Server | null;

				// params
				protected _packageFile: string;
				protected _mediatorFile: string;
				protected _serverFile: string;

			// public

				public enable: boolean;

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

			// protected

				protected _loadDataFromPackageFile(): Promise<void>;

			// public

				// checkers

				public checkConf(): Promise<void>;
				public checkEnable(): Promise<void>;
				public checkFiles(): Promise<void>;
				public checkServer(): Promise<void>;
				public checkServerSync(): boolean;

				// middleware

				public appMiddleware(req: Request, res: Response, next: Function): Promise<void>;
				public httpMiddleware(req: Request, res: Response): Promise<void>;

				// init / release

				public destroy(data?: any): Promise<void>;

				// write

				public install(data?: any): Promise<void>;
				public update(data?: any): Promise<void>;
				public uninstall(data?: any): Promise<void>;

	}

}
