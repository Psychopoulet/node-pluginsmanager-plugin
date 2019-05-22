/// <reference types="node" />

declare module "node-pluginsmanager-plugin" {

	class Plugin {

		// params
		public directory: string;

		// native
		public authors: Array<string>;
		public description: string;
		public dependencies: object;
		public devDependencies: object;
		public engines: object;
		public license: string;
		public main: string;
		public scripts: string;
		public name: object;
		public version: string;

		// specifics
		public designs: Array<string>;
		public javascripts: Array<string>;
		public templates: Array<string>;

		constructor (directory : string);

		// read

		public loadDataFromPackageFile(): Promise<Plugin>;

		// load

		public load(): Promise<void>;
		public unload(): Promise<void>;

		// write

		public install(): Promise<void>;
		public update(): Promise<void>;
		public uninstall(): Promise<void>;

	}

	export = Plugin;

}
