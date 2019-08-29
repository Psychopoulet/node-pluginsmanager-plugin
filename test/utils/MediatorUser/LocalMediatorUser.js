"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const MediatorUser = require(join(__dirname, "..", "..", "..", "lib", "components", "MediatorUser.js"));

// module

module.exports = class LocalMediatorUser extends MediatorUser {

	init () {

		return Promise.resolve();

	}

	release () {

		this.removeAllListeners();

		return Promise.resolve();

	}

};
