/*
	eslint-disable no-sync
*/

"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const MediatorUser = require(join(__dirname, "MediatorUser.js"));
	const Server = require(join(__dirname, "Server.js"));
	const checkFile = require(join(__dirname, "..", "utils", "checkFile.js"));
	const readJSONFile = require(join(__dirname, "..", "utils", "readJSONFile.js"));

// module

module.exports = class Orchestrator extends MediatorUser {

	constructor (options) {

		super(options);

		// protected

			this._Server = null;

			// params
			this._packageFile = options && "undefined" !== typeof options.packageFile ? options.packageFile : "";
			this._mediatorFile = options && "undefined" !== typeof options.mediatorFile ? options.mediatorFile : "";
			this._serverFile = options && "undefined" !== typeof options.serverFile ? options.serverFile : "";

		// public

			this.enable = false;

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

	// protected

		_loadDataFromPackageFile () {

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

		_initWorkSpace () {

			return Promise.resolve();

		}

	// public

		// checkers

			checkConf () {
				return Promise.resolve();
			}

			checkEnable () {

				this.enable = true;

				return Promise.resolve();

			}

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

				if ("undefined" === typeof this._Server || null === this._Server) {
					return Promise.reject(new ReferenceError("Server not registered"));
				}
				else if ("object" !== typeof this._Server || !(this._Server instanceof Server)) {

					return Promise.reject(new TypeError(
						"The plugin has an invalid Server which is not an instance (or a child) of the official Server class"
					));

				}
				else {
					return Promise.resolve();
				}

			}

			checkServerSync () {

				return "object" === typeof this._Server && this._Server instanceof Server;

			}

		// middleware

			appMiddleware (req, res, next) {

				return this.checkServerSync() ? this._Server.appMiddleware(req, res, next) : next();

			}

			httpMiddleware (req, res) {

				return this.checkServerSync() && this._Server.httpMiddleware(req, res);

			}

		// init / release

			init (...data) {

				return Promise.resolve().then(() => {

					return this.checkEnable();

				}).then(() => {

					return this.checkConf();

				}).then(() => {

					return this._loadDataFromPackageFile();

				}).then(() => {

					return this._initWorkSpace(...data);

				}).then(() => {

					const PluginMediator = require(this._mediatorFile);

					this._Mediator = new PluginMediator();

					return this.checkMediator().catch((err) => {

						return err.message && "Registered Mediator is not initialized" === err.message ?
							Promise.resolve() :
							Promise.reject(err);

					});

				}).then(() => {

					const PluginServer = require(this._serverFile);

					this._Server = new PluginServer({
						"mediator": this._Mediator
					});

					return this.checkServer();

				}).then(() => {

					return this.enable ? Promise.resolve().then(() => {

						let serverInitialized = false;
						let mediatorInitialized = false;

						this._Mediator.once("initialized", () => {

							mediatorInitialized = true;

							if (serverInitialized) {
								this._fireInitialized();
							}

						});

						this._Server.once("initialized", () => {

							serverInitialized = true;

							if (mediatorInitialized) {
								this._fireInitialized();
							}

						});

						return this._Server.init(...data).then(() => {
							return this._Mediator.init(...data);
						});

					}) : Promise.resolve();

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

					// params
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
