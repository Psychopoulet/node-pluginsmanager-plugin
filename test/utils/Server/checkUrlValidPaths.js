"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

		// utils
		const httpRequestTest = require(join(__dirname, "..", "..", "utils", "httpRequestTest.js"));

// module

module.exports = function checkUrlValidPaths (URL_API, server) {

	describe("check valid paths", () => {

		it("should test descriptor request", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/descriptor", "get", null, 200, "OK", server._Descriptor);

		});

		it("should test request with valid path", () => {

			return httpRequestTest(URL_API + "/valid", "get", null, 200, "OK", [ "test" ]);

		});

	});

};
