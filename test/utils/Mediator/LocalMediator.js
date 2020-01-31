"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const { Mediator } = require(join(__dirname, "..", "..", "..", "lib", "main.js"));

// module

module.exports = class LocalMediator extends Mediator {

	_initWorkSpace () {

		return Promise.resolve();

	}

	_releaseWorkSpace () {

		return Promise.resolve();

	}

};
