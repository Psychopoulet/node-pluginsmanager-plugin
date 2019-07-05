"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const MediatorUser = require(join(__dirname, "MediatorUser.js"));
	const Mediator = require(join(__dirname, "Mediator.js"));
	const Server = require(join(__dirname, "Server.js"));
	const checkFile = require(join(__dirname, "..", "utils", "checkFile.js"));
	const readJSONFile = require(join(__dirname, "..", "utils", "readJSONFile.js"));

// module

module.exports = class Orchestrator extends MediatorUser {

	constructor (options) {

		super(options);

		this._Server = null;

		// params
		this._packageFile = options && "undefined" !== typeof options.packageFile ? options.packageFile : "";
		this._mediatorFile = options && "undefined" !== typeof options.mediatorFile ? options.mediatorFile : "";
		this._serverFile = options && "undefined" !== typeof options.serverFile ? options.serverFile : "";

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

	checkFiles () {

		// check package
		return Promise.resolve().then(() => {

			return checkFile(this._packageFile);

		// check Mediator
		}).then(() => {

			return checkFile(this._mediatorFile);

		// check Server
		}).then(() => {

			return checkFile(this._serverFile);

		});

	}

	checkServer () {

		if (!this._Server) {
			return Promise.reject(new ReferenceError("Server not registered"));
		}
		else if ("object" !== typeof this._Server || !(this._Server instanceof Server)) {
			return Promise.reject(new TypeError("Registered Server is not an instance of Server"));
		}
		else {
			return Promise.resolve();
		}

	}

	loadDataFromPackageFile () {

		return this.checkFiles().then(() => {

			return readJSONFile(this._packageFile);

		// formate authors
		}).then((data) => {

			if (data.authors) {

				this.authors = data.authors.slice();
				delete data.authors;

				if (data.author) {
					delete data.author;
				}

			}
			else if (data.author) {

				this.authors = [];
				this.authors.push(data.author);

				delete data.author;

			}

			return Promise.resolve(data);

		// formate other data
		}).then((data) => {

			for (const key in data) {

				if (Object.prototype.hasOwnProperty.call(data, key)) {

					if ("object" === typeof data[key] && data[key] instanceof Array) {
						this[key] = data[key].slice();
					}
					else {
						this[key] = data[key];
					}

				}

			}

			return Promise.resolve();

		});

	}

	init (...data) {

		return Promise.resolve().then(() => {

			return this.checkFiles();

		}).then(() => {

			const PluginMediator = require(this._mediatorFile);

			this._Mediator = new PluginMediator();

			return this._Mediator instanceof Mediator ? Promise.resolve() : Promise.reject(new Error(
				"The plugins has an invalid Mediator which is not an instance (or a child) of the official Mediator class"
			));

		}).then(() => {

			const PluginServer = require(this._serverFile);

			this._Server = new PluginServer({
				"mediator": this._Mediator
			});

			return this._Server instanceof Server ? Promise.resolve() : Promise.reject(new Error(
				"The plugins has an invalid Server which is not an instance (or a child) of the official Server class"
			));

		}).then(() => {

			return this._Server.init(...data);

		}).then(() => {

			return this._Mediator.init(...data);

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
			this._mediatorFile = null;
			this._serverFile = null;

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
