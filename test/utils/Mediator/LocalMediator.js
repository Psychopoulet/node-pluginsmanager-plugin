"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const Mediator = require(join(__dirname, "..", "..", "..", "lib", "components", "Mediator.js"));

// module

module.exports = class LocalMediator extends Mediator {

	_initWorkSpace () {

		return this._fireInitialized();

	}

	_releaseWorkSpace () {

		return this._fireReleased();

	}

};
