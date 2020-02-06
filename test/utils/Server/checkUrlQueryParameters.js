"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

		// utils
		const httpRequestTest = require(join(__dirname, "..", "..", "utils", "httpRequestTest.js"));

// module

module.exports = function checkUrlQueryParameters (URL_API) {

	describe("check query parameters", () => {

		it("should test request with missing parameter", () => {

			return httpRequestTest(URL_API + "/path/query", "get", null, 400, "Bad Request", {
				"code": "MISSING_PARAMETER",
				"message": "Error while validating request: request.query should have required property 'query-param'"
			});

		});

		it("should test request with empty parameter", () => {

			return httpRequestTest(URL_API + "/path/query?query-param=", "get", null, 400, "Bad Request", {
				"code": "EMPTY_OR_RANGE_OR_ENUM_PARAMETER",
				"message": "Error while validating request: request.query['query-param'] should NOT be shorter than 1 characters"
			});

		});

		it("should test request with valid request", () => {

			return httpRequestTest(URL_API + "/path/query?query-param=test", "get", null, 200, "OK", "test");

		});

	});

};
