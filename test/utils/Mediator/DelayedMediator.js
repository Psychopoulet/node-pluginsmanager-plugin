"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const Mediator = require(join(__dirname, "..", "..", "..", "lib", "components", "Mediator.js"));

// module

module.exports = class DelayedMediator extends Mediator {

	init () {

		return new Promise(function delay (resolve) {
			setTimeout(resolve, 500);
		}).then(() => {
			return super.init();
		});

	}

};
