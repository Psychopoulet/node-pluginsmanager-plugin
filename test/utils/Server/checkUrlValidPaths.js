"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

		// utils
		const httpRequestTest = require(join(__dirname, "..", "..", "utils", "httpRequestTest.js"));

// module

module.exports = function checkUrlValidPaths (URL_API, component) {

	describe("check valid paths", () => {

		it("should test descriptor request", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/descriptor", "get", null, 200, "OK", component._Descriptor);

		});

		it("should test status request", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/status", "get", null, 200, "OK", "INITIALIZED");

		});

		it("should test request with valid path", () => {

			return httpRequestTest(URL_API + "/valid", "get", null, 200, "OK", [ "test" ]);

		});

	});

};
