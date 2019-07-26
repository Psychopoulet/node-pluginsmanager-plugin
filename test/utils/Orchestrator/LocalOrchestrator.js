"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const Orchestrator = require(join(__dirname, "..", "..", "..", "lib", "components", "Orchestrator.js"));

// module

module.exports = class LocalOrchestrator extends Orchestrator {

	_releaseWorkSpace () {

		this._fireReleased();

		return Promise.resolve();

	}

};
