"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const Bootable = require(join(__dirname, "..", "..", "..", "lib", "components", "Bootable.js"));

// module

module.exports = class LocalBootable extends Bootable {

	_initWorkSpace () {

		return Promise.resolve();

	}

	_releaseWorkSpace () {

		return Promise.resolve();

	}

};
