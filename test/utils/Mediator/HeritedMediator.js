"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const Mediator = require(join(__dirname, "..", "..", "..", "lib", "components", "Mediator.js"));

// module

module.exports = class HeritedMediator extends Mediator {

	fullStack () {
		return Promise.resolve();
	}

};
