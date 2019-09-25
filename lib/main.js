"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const checkers = require(join(__dirname, "checkers", "main.js"));
	const components = require(join(__dirname, "components", "main.js"));

// module

module.exports = {
	...checkers,
	...components
};
