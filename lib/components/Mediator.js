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

	_fireInitialized () {

		this.initialized = true;
		this.emit("initialized");

	}

	checkConf () {
		return Promise.resolve();
	}

	init () {

		return Promise.resolve().then(() => {
			return this.checkConf();
		}).then(() => {

			this._fireInitialized();

			return Promise.resolve();

		});

	}

	release () {

		return Promise.resolve().then(() => {

			this.initialized = false;
			return Promise.resolve();

		}).then(() => {

			return super.release();

		});

	}

};
