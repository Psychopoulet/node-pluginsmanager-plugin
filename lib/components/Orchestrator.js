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

			// extended
			this._extended = [];

		// public

			this.enabled = true;
			this.initialized = false;

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

	}

	// protected

		_initWorkSpace () {

			return Promise.resolve();

		}

		_releaseWorkSpace () {

			return Promise.resolve();

		}

	// public

		// checkers

			checkConf () {
				return Promise.resolve();
			}

			isEnable () {

				this.enabled = true;

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

				this.checkServer().then(() => {

					this._Server.appMiddleware(req, res, next);

				}).catch(() => {

					next();

				});

			}

			httpMiddleware (req, res) {

				return this.checkServerSync() && this._Server.httpMiddleware(req, res);

			}

			socketServer (server) {

				return this.checkServerSync() && this._Server.socketServer(server);

			}

		// load / destroy

			load () {

				return this.checkFiles().then(() => {

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

					return readJSONFile(this._packageFile);

				// formate authors
				}).then((data) => {

					if (data.authors) {

						this.authors = data.authors;
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

						if (Object.prototype.hasOwnProperty.call(data, key) && "function" !== typeof this[key]) {

							if ("undefined" === typeof this[key]) {
								this._extended.push(key);
							}

							this[key] = data[key];

						}

					}

					return Promise.resolve();

				});

			}

			destroy () {

				return Promise.resolve().then(() => {

					// protected

						// params
						this._packageFile = "";
						this._mediatorFile = "";
						this._serverFile = "";

						// extended

						this._extended.forEach((key) => {
							delete this[key];
						});

						this._extended = [];

					// public

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

					return Promise.resolve();

				});

			}

		// init / release

			init (...data) {

				// ensure conf validity
				return Promise.resolve().then(() => {

					return this.checkConf();

				// get enable status
				}).then(() => {

					return this.isEnable();

				}).then(() => {

					return !this.enabled ? Promise.resolve() : Promise.resolve().then(() => {

						// create mediator
						return Promise.resolve().then(() => {

							const PluginMediator = require(this._mediatorFile);

							this._Mediator = new PluginMediator();

							return this.checkMediator();

						// create server
						}).then(() => {

							const PluginServer = require(this._serverFile);

							this._Server = new PluginServer({
								"mediator": this._Mediator
							});

							return this.checkServer();

						// init server (before mediator)
						}).then(() => {

							return this._Server.init(...data);

						// init mediator
						}).then(() => {

							return this._Mediator.init(...data);

						}).then(() => {

							return this._initWorkSpace(...data);

						}).then((...result) => {

							this.initialized = true;
							this.emit("initialized", ...data);

							return Promise.resolve(...result);

						});

					});

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

					return this._releaseWorkSpace(...data);

				}).then((...result) => {

					this.initialized = false;
					this.emit("released", ...data);

					return Promise.resolve(...result);

				}).then((...result) => {

					this.removeAllListeners();

					return Promise.resolve(...result);

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
