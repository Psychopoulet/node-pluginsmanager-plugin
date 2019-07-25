"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const Bootable = require(join(__dirname, "Bootable.js"));

// module

module.exports = class Mediator extends Bootable { };
