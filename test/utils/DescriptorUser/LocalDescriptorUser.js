"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const { DescriptorUser } = require(join(__dirname, "..", "..", "..", "lib", "cjs", "main.cjs"));

// module

module.exports = class LocalDescriptorUser extends DescriptorUser {

	_initWorkSpace () {

		return Promise.resolve();

	}

	_releaseWorkSpace () {

		return Promise.resolve();

	}

	init () {

		return Promise.resolve();

	}

	release () {

		this.removeAllListeners();

		return Promise.resolve();

	}

};
