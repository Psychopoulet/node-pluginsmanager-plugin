"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const Orchestrator = require(join(__dirname, "..", "..", "..", "lib", "components", "Orchestrator.js"));

// module

module.exports = class NonEnabledOrchestrator extends Orchestrator {

	checkEnable () {

		this.enable = false;

		return Promise.resolve();

	}

};
