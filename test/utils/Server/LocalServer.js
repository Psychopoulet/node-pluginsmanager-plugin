"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const Server = require(join(__dirname, "..", "..", "..", "lib", "components", "Server.js"));

// module

module.exports = class LocalServer extends Server {

};
