"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const LocalMediator = require(join(__dirname, "LocalMediator.js"));

// module

module.exports = class DelayedMediator extends LocalMediator {

	_initWorkSpace () {

		return new Promise((resolve) => {
			setTimeout(resolve, 250);
		}).then(() => {
			return super._initWorkSpace();
		});

	}

};
