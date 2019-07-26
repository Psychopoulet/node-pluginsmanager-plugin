"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const LocalOrchestrator = require(join(__dirname, "LocalOrchestrator.js"));

// module

module.exports = class NonEnabledOrchestrator extends LocalOrchestrator {

	checkEnable () {

		this.enable = false;

		return Promise.resolve();

	}

};
