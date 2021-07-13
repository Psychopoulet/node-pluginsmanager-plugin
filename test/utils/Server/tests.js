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
		const checkBodyContentLength = require(join(__dirname, "checkBodyContentLength.js"));
		const checkBodyParameters = require(join(__dirname, "checkBodyParameters.js"));

		const checkResponse = require(join(__dirname, "checkResponse.js"));

// consts

	const URL_API = "/node-pluginsmanager-plugin/api";

// module

module.exports = function tests (descriptor) {

	describe("check url", () => {

		checkUrlWrongPaths(URL_API);
		checkUrlValidPaths(URL_API, descriptor);
		checkUrlPathParameters(URL_API);
		checkUrlQueryParameters(URL_API);
		checkUrlCookieParameters(URL_API);
		checkUrlHeaderParameters(URL_API);

	});

	describe("check body", () => {

		checkBodyBasics(URL_API);
		checkBodyContentLength(URL_API);
		checkBodyParameters(URL_API);

	});

	describe("check response", () => {

		checkResponse(URL_API);

	});

};
