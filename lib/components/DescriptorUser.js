"use strict";

//  deps

	// natives
	const Events = require("events");
	const { join } = require("path");

	// locals
	const {
		checkObject,
		checkNonEmptyObject,
		checkNonEmptyString
	} = require(join(__dirname, "..", "checkers", "main.js"));

// consts

	const LOG_TYPES_ALLOWED = [ "log", "info", "success", "warning", "error" ];

// module

module.exports = class DescriptorUser extends Events {

	constructor (options) {

		super(options);

		// public

			this.initialized = false;

		// protected

			this._descriptorValidated = false;

			this._externalRessourcesDirectory = options && "string" === typeof options.externalRessourcesDirectory ?
				options.externalRessourcesDirectory : "";

			this._Descriptor = options && "undefined" !== typeof options.descriptor ?
				options.descriptor : null;

			this._Logger = options && "undefined" !== typeof options.logger ?
				options.logger : null;

	}

	// protected

		// must be inherited
		_initWorkSpace () {

			return Promise.reject(new Error("\"_initWorkSpace\" method must be inherited"));

		}

		// must be inherited
		_releaseWorkSpace () {

			return Promise.reject(new Error("\"_releaseWorkSpace\" method must be inherited"));

		}

		_log (type, message, bold = false) {

			if (message && "function" === typeof this._Logger && LOG_TYPES_ALLOWED.includes(type)) {
				this._Logger(type, message, bold, this.getPluginName());
			}

			return this;

		}

	// public

		getPluginName () {
			return this._Descriptor && this._Descriptor.info && this._Descriptor.info.title ? this._Descriptor.info.title : "";
		}

		getPluginVersion () {
			return this._Descriptor && this._Descriptor.info && this._Descriptor.info.version ? this._Descriptor.info.version : "";
		}

		getPluginDescription () {
			return this._Descriptor && this._Descriptor.info && this._Descriptor.info.description ? this._Descriptor.info.description : "";
		}

		// must be inherited
		init () {

			return Promise.reject(new Error("\"init\" method must be inherited"));

		}

		// must be inherited
		release () {

			return Promise.reject(new Error("\"release\" method must be inherited"));

		}

		// must be inherited
		checkDescriptor () {

			// check Descriptor object
			return this._descriptorValidated ? Promise.resolve() :
			checkNonEmptyObject("Descriptor", this._Descriptor).then(() => {

				// check info object
				return checkNonEmptyObject("Descriptor.info", this._Descriptor.info).then(() => {

					// check title
					return checkNonEmptyString("Descriptor.info.title", this._Descriptor.info.title).then(() => {

						return this._Descriptor.info.title !== this._Descriptor.info.title.toLowerCase() ?
						Promise.reject(new Error(
							"The descriptor's title (\"" + this._Descriptor.info.title + "\") " +
							"is not equals in lower case (package.json convention)"
						)) : Promise.resolve();

					// check version
					}).then(() => {
						return checkNonEmptyString("Descriptor.info.version", this._Descriptor.info.version);
					});

				});

			}).then(() => {

				// check paths object
				return checkObject("Descriptor.paths", this._Descriptor.paths).then(() => {

					// check multiple operationIds
					return Promise.resolve().then(() => {

						const operationIds = [];
						Object.keys(this._Descriptor.paths).forEach((p) => {

							Object.keys(this._Descriptor.paths[p]).forEach((m) => {

								if (this._Descriptor.paths[p][m].operationId) {
									operationIds.push(this._Descriptor.paths[p][m].operationId);
								}

							});

						});

						let multiple = false;
						for (let i = 0; i < operationIds.length - 1; ++i) {

							for (let j = i + 1; j < operationIds.length; ++j) {

								if (operationIds[i] === operationIds[j]) {
									multiple = true; break;
								}

							}

						}

						return multiple ? Promise.reject(new Error(
							"There is multiple operationIds in [\" " + operationIds.join("\", ") + " \"]"
						)) : Promise.resolve();

					});

				});

			}).then(() => {
				this._descriptorValidated = true;
			});

		}

};
