"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const extractBody = require(join(__dirname, "extractBody.js"));
	const extractIp = require(join(__dirname, "extractIp.js"));

// module

module.exports = {
	extractBody,
	extractIp
};
