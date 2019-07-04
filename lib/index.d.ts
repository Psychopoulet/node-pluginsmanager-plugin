/// <reference types="node" />

declare module "node-pluginsmanager-plugin" {

	import Events = require("events");
	
	class Bootable extends Events {

		// constructor

			constructor (options: object | null);

		// methods

			public init(data?: any): Promise<void>;
			public release(data?: any): Promise<void>;

	}

	export class Mediator extends Bootable {

		// attributes

			public initialized: boolean;

		// methods

			protected _fireInitialized(): Promise<void>;
			public checkConf(data?: any): Promise<void>;

	}

	class MediatorUser extends Bootable {

		// attributes

			protected _Mediator: Mediator | null;

		// methods

			public checkMediator(): Promise<void>;

	}

	export class Server extends MediatorUser {

	}

	export class Orchestrator extends MediatorUser {

		// attributes

			// params
			protected _packageFile: string;
			protected _MediatorFile: string;
			protected _ServerFile: string;

			protected _Server: Server | null;

			// native
			public authors: Array<string> | null;
			public description: string;
			public dependencies: object | null;
			public devDependencies: object | null;
			public engines: object | null;
			public license: string;
			public main: string;
			public scripts: object | null;
			public name: string;
			public version: string;

		// methods

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
