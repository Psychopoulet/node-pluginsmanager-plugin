"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const { Server } = require(join(__dirname, "..", "..", "..", "lib", "cjs", "main.cjs"));

// module

module.exports = class LocalServer extends Server {

	_initWorkSpace () {

		return Promise.resolve();

	}

	_releaseWorkSpace () {

		return Promise.resolve();

	}

};
