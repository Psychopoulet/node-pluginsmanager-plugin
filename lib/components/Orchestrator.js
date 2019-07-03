"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const Bootable = require(join(__dirname, "Bootable.js"));
	const Mediator = require(join(__dirname, "Mediator.js"));
	const Server = require(join(__dirname, "Server.js"));
	const { isFile, readJSONFile } = require(join(__dirname, "..", "utils", "main.js"));

// module

module.exports = class Orchestrator extends Bootable {

	constructor (options) {

		super(options);

		// params
		this._packageFile = options.packageFile || "";
		this._MediatorFile = options.MediatorFile || "";
		this._ServerFile = options.ServerFile || "";

		this._Mediator = null;
		this._Server = null;

		// native
		this.authors = [];
		this.description = "";
		this.dependencies = {};
		this.devDependencies = {};
		this.engines = {
			"node": ">=6.0.0"
		};
		this.license = "MIT";
		this.main = "lib/main.js";
		this.name = "";
		this.scripts = {};
		this.version = "";

	}

	// read

	_checkFiles () {

		return Promise.resolve().then(() => {

			// check package
			return isFile(this._packageFile).then((exists) => {

				return exists ? Promise.resolve() :
					Promise.reject(new Error("\"" + this._packageFile + "\" does not exist."));

			});

		}).then(() => {

			// check Mediator
			return isFile(this._MediatorFile).then((exists) => {

				return exists ? Promise.resolve() :
					Promise.reject(new Error("\"" + this._MediatorFile + "\" does not exist."));

			});

		}).then(() => {

			// check Server
			return isFile(this._ServerFile).then((exists) => {

				return exists ? Promise.resolve() :
					Promise.reject(new Error("\"" + this._ServerFile + "\" does not exist."));

			});

		});

	}

	loadDataFromPackageFile () {

		return this._checkFiles().then(() => {

			return readJSONFile(this._packageFile);

		// formate authors
		}).then((data) => {

			if (data.author) {

				if (data.authors) {
					this.authors = data.authors.slice(0);
					delete data.authors;
				}
				else {
					this.authors = [];
				}

				this.authors.push(data.author);

				delete data.author;

			}

			return Promise.resolve(data);

		// formate other data
		}).then((data) => {

			for (const key in data) {

				if (Object.prototype.hasOwnProperty.call(data, key)) {
					this[key] = data[key];
				}

			}

			return Promise.resolve();

		});

	}

	init (...data) {

		return super.init().then(() => {

			return this._checkFiles();

		}).then(() => {

			const PluginMediator = require(this._MediatorFile);

			this._Mediator = new PluginMediator();

			return this._Mediator instanceof Mediator ? this._Mediator.init(...data) : Promise.reject(new Error(
				"The plugins has an invalid Mediator which is not an instance (or a child) of the official Mediator class"
			));

		}).then(() => {

			const PluginServer = require(this._ServerFile);

			this._Server = new PluginServer();

			return this._Server instanceof Server ? this._Server.init(...data) : Promise.reject(new Error(
				"The plugins has an invalid Server which is not an instance (or a child) of the official Server class"
			));

		});

	}

	release (...data) {

		return Promise.resolve().then(() => {

			return this._Server ? this._Server.release(...data).then(() => {

				this._Server = null;

				return Promise.resolve();

			}) : Promise.resolve();

		}).then(() => {

			return this._Mediator ? this._Mediator.release(...data).then(() => {

				this._Mediator = null;

				return Promise.resolve();

			}) : Promise.resolve();

		}).then(() => {

			return super.release();

		});

	}

	destroy () {

		return this.release().then(() => {

			// native
			this.authors = null;
			this.description = "";
			this.dependencies = null;
			this.devDependencies = null;
			this.engines = null;
			this.license = "";
			this.main = "";
			this.name = "";
			this.scripts = null;
			this.version = "";

			// specifics
			this._packageFile = null;
			this._MediatorFile = null;
			this._ServerFile = null;

			return Promise.resolve();

		});

	}

	// write

	install () {
		return Promise.resolve();
	}

	update () {
		return Promise.resolve();
	}

	uninstall () {
		return Promise.resolve();
	}

};
