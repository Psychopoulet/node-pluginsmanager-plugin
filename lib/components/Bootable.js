"use strict";

//  deps

	// natives
	const Events = require("events");

// module

module.exports = class Bootable extends Events {

	constructor (options) {

		super(options);

		this.initialized = false;

	}

	// protected

		_fireInitialized (...data) {

			this.initialized = true;
			this.emit("initialized", ...data);

			return this;

		}

		_fireReleased (...data) {

			this.initialized = false;
			this.emit("released", ...data);

			return this;

		}

		// should be inherited
		_initWorkSpace () {

			return Promise.reject(new Error("\"_initWorkSpace\" method must be inherited"));

		}

		// should be inherited
		_releaseWorkSpace () {

			return Promise.reject(new Error("\"_releaseWorkSpace\" method must be inherited"));

		}

	// public

		init (...data) {

			this._initWorkSpace(...data).catch((err) => {
				this.emit("error", err);
			});

			return Promise.resolve();

		}

		release (...data) {

			this._releaseWorkSpace(...data).catch((err) => {
				this.emit("error", err);
			});

			return Promise.resolve();

		}

};
