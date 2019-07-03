/// <reference types="node" />

declare module "node-pluginsmanager-plugin" {

	import Events = require("events");
	
	class Bootable extends Events {

		constructor (options: object | null);

		// load

		public init(data?: any): Promise<void>;
		public release(data?: any): Promise<void>;

	}

	export class Orchestrator extends Bootable {

		// params
		protected _packageFile: string;
		protected _MediatorFile: string;
		protected _ServerFile: string;

		protected _Mediator: Mediator | null;
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

		constructor (options: object | null);

		// read

		public loadDataFromPackageFile(): Promise<void>;

		// load

		public destroy(): Promise<void>;

		// write

		public install(data?: any): Promise<void>;
		public update(data?: any): Promise<void>;
		public uninstall(data?: any): Promise<void>;

	}

	export class Mediator extends Bootable {
	}

	export class Server extends Bootable {
	}

}
