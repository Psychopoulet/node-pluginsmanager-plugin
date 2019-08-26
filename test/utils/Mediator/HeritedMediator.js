"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const LocalMediator = require(join(__dirname, "LocalMediator.js"));

// module

module.exports = class HeritedMediator extends LocalMediator {

	empty () {
		return Promise.resolve();
	}

	valid () {
		return Promise.resolve([ "test" ]);
	}

	create () {
		return Promise.resolve();
	}

};
