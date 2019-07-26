"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const Mediator = require(join(__dirname, "..", "..", "..", "lib", "components", "Mediator.js"));

// module

module.exports = class LocalMediator extends Mediator {

	_initWorkSpace () {

		this._fireInitialized();

		return Promise.resolve();

	}

	_releaseWorkSpace () {

		this._fireReleased();

		return Promise.resolve();

	}

};
