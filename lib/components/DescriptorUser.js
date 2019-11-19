"use strict";

//  deps

	// natives
	const Events = require("events");
	const { join } = require("path");

	// locals

	const { checkObject } = require(join(__dirname, "..", "checkers", "main.js"));

	const {
		checkDescriptorInfos,
		checkDescriptorPaths
	} = require(join(__dirname, "..", "utils", "checkDescriptor", "main.js"));

// consts

	const LOG_TYPES_ALLOWED = [ "log", "info", "success", "warning", "error" ];

// module

module.exports = class DescriptorUser extends Events {

	constructor (options) {

		super(options);

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
				this._Logger(type, message, bold);
			}

			return this;

		}

	// public

		checkDescriptor () {

			// check Descriptor object
			return this._descriptorValidated ? Promise.resolve() : Promise.resolve().then(() => {

				return checkObject("Descriptor", this._Descriptor);

			// check infos
			}).then(() => {

				return checkDescriptorInfos(this._Descriptor);

			// check paths
			}).then(() => {

				return !this._Descriptor.paths ? Promise.resolve() : checkDescriptorPaths(this._Descriptor);

			}).then(() => {

				this._descriptorValidated = true;

			});

		}

		// must be inherited
		init () {

			return Promise.reject(new Error("\"init\" method must be inherited"));

		}

		// must be inherited
		release () {

			return Promise.reject(new Error("\"release\" method must be inherited"));

		}

};
