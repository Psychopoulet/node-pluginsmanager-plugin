"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

		// utils
		const httpRequestTest = require(join(__dirname, "..", "..", "utils", "httpRequestTest.js"));

// module

module.exports = function checkUrlPathParameters (URL_API) {

	describe("check path parameters", () => {

		it("should test request with missing parameter", () => {

			return httpRequestTest(URL_API + "/path/path", "get", null, 404, "Not Found", {
				"code": "404",
				"message": "Unknown page"
			});

		});

		it("should test request with empty parameter", () => {

			return httpRequestTest(URL_API + "/path/path/", "get", null, 400, "Bad Request", {
				"code": "EMPTY_OR_RANGE_OR_ENUM_PARAMETER",
				"message": "Error while validating request: request.params['path-param'] should NOT be shorter than 1 characters"
			});

		});

		it("should test request with valid request", () => {

			return httpRequestTest(URL_API + "/path/path/test", "get", null, 200, "OK", "test");

		});

	});

};
