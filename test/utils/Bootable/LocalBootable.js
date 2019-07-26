"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const Bootable = require(join(__dirname, "..", "..", "..", "lib", "components", "Bootable.js"));

// module

module.exports = class LocalBootable extends Bootable {

	_initWorkSpace () {

		this._fireInitialized();

		return Promise.resolve();

	}

	_releaseWorkSpace () {

		this._fireReleased();

		return Promise.resolve();

	}

};
