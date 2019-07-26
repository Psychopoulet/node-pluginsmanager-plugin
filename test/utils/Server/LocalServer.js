"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const Server = require(join(__dirname, "..", "..", "..", "lib", "components", "Server.js"));

// module

module.exports = class LocalServer extends Server {

	_initWorkSpace () {

		this._fireInitialized();

		return Promise.resolve();

	}

	_releaseWorkSpace () {

		this._fireReleased();

		return Promise.resolve();

	}

};
