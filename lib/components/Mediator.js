"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const Bootable = require(join(__dirname, "Bootable.js"));

// module

module.exports = class Mediator extends Bootable {

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

				this.emit("released", ...data);
				this.initialized = false;

				return Promise.resolve(...result);

			});

		}

};
