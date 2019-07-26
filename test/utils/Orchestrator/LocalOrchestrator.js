"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const Orchestrator = require(join(__dirname, "..", "..", "..", "lib", "components", "Orchestrator.js"));

// module

module.exports = class LocalOrchestrator extends Orchestrator {

	_initWorkSpace () {

		return Promise.resolve();

	}

	_releaseWorkSpace () {

		return Promise.resolve();

	}

};
