"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const MediatorUser = require(join(__dirname, "..", "..", "..", "lib", "components", "MediatorUser.js"));

// module

module.exports = class LocalMediatorUser extends MediatorUser {

	_initWorkSpace () {

		this._fireInitialized();

		return Promise.resolve();

	}

	_releaseWorkSpace () {

		this._fireReleased();

		return Promise.resolve();

	}

};
