"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const Bootable = require(join(__dirname, "..", "..", "..", "lib", "components", "Bootable.js"));

// module

module.exports = class LocalBootable extends Bootable {

	_initWorkSpace () {

		return this._fireInitialized();

	}

	_releaseWorkSpace () {

		return this._fireReleased();

	}

};
