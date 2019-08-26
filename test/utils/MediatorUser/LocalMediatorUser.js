"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const MediatorUser = require(join(__dirname, "..", "..", "..", "lib", "components", "MediatorUser.js"));

// module

module.exports = class LocalMediatorUser extends MediatorUser {

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
