"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const DescriptorUser = require(join(__dirname, "DescriptorUser.js"));

// module

module.exports = class Mediator extends DescriptorUser {

	constructor (options) {

		super(options);

		this.initialized = false;

	}

	// public

		// init / release

		init (...data) {

			return this._initWorkSpace(...data).then((...result) => {

				this.initialized = true;
				this.emit("initialized", ...data);

				return Promise.resolve(...result);

			});

		}

		release (...data) {

			return this._releaseWorkSpace(...data).then((...result) => {

				// can only be released by Orchestrator
				if (this._Descriptor) {
					this._Descriptor = null;
				}

				this.initialized = false;
				this.emit("released", ...data);

				this._externalRessourcesDirectory = "";

				return Promise.resolve(...result);

			}).then((...result) => {

				this.removeAllListeners();

				return Promise.resolve(...result);

			});

		}

};
