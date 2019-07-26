"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const LocalServer = require(join(__dirname, "LocalServer.js"));

// module

module.exports = class ServerDelayed extends LocalServer {

	_initWorkSpace () {

		return new Promise((resolve) => {
			setTimeout(resolve, 250);
		}).then(() => {
			return super._initWorkSpace();
		});

	}

};
