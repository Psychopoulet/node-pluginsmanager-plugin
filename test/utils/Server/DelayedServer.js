"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const Server = require(join(__dirname, "..", "..", "..", "lib", "components", "Server.js"));

// module

module.exports = class ServerDelayed extends Server {

	init () {

		return new Promise(function delay (resolve) {
			setTimeout(resolve, 500);
		}).then(() => {
			return super.init();
		});

	}

};
