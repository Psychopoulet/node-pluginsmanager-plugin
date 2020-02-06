"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

		// utils

		const checkUrlWrongPaths = require(join(__dirname, "checkUrlWrongPaths.js"));
		const checkUrlValidPaths = require(join(__dirname, "checkUrlValidPaths.js"));
		const checkUrlPathParameters = require(join(__dirname, "checkUrlPathParameters.js"));
		const checkUrlQueryParameters = require(join(__dirname, "checkUrlQueryParameters.js"));
		const checkUrlCookieParameters = require(join(__dirname, "checkUrlCookieParameters.js"));
		const checkUrlHeaderParameters = require(join(__dirname, "checkUrlHeaderParameters.js"));

		const checkBodyBasics = require(join(__dirname, "checkBodyBasics.js"));
		const checkBodyContentType = require(join(__dirname, "checkBodyContentType.js"));
		const checkBodyContentLength = require(join(__dirname, "checkBodyContentLength.js"));
		const checkBodyParameters = require(join(__dirname, "checkBodyParameters.js"));

// consts

	const URL_API = "/node-pluginsmanager-plugin/api";

// module

module.exports = function test (server) {

	describe("check url", () => {

		checkUrlWrongPaths(URL_API);
		checkUrlValidPaths(URL_API, server);
		checkUrlPathParameters(URL_API);
		checkUrlQueryParameters(URL_API);
		checkUrlCookieParameters(URL_API);
		checkUrlHeaderParameters(URL_API);

	});

	describe("check body", () => {

		checkBodyBasics(URL_API);
		checkBodyContentType(URL_API);
		checkBodyContentLength(URL_API);
		checkBodyParameters(URL_API);

	});

};
