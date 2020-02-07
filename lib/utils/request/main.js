"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const extractBody = require(join(__dirname, "extractBody.js"));
	const extractCookies = require(join(__dirname, "extractCookies.js"));
	const extractIp = require(join(__dirname, "extractIp.js"));

// module

module.exports = {
	extractBody,
	extractCookies,
	extractIp
};
