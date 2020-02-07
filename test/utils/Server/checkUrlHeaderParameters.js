"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

		// utils
		const httpRequestHeaderTest = require(join(__dirname, "..", "..", "utils", "httpRequestHeaderTest.js"));

// module

module.exports = function checkUrlHeaderParameters (URL_API) {

	describe("check header parameters", () => {

		it("should test request with missing header parameter", () => {

			return httpRequestHeaderTest(URL_API + "/path/header", "get", {}, 400, "Bad Request", {
				"code": "MISSING_PARAMETER",
				"message": "Error while validating request: request.headers should have required property 'header-param'"
			});

		});

		it("should test request with empty header parameter", () => {

			return httpRequestHeaderTest(URL_API + "/path/header", "get", {
				"header-param": ""
			}, 400, "Bad Request", {
				"code": "EMPTY_OR_RANGE_OR_ENUM_PARAMETER",
				"message": "Error while validating request: request.headers['header-param'] should NOT be shorter than 1 characters"
			});

		});

		it("should test request with valid request", () => {

			return httpRequestHeaderTest(URL_API + "/path/header", "get", {
				"header-param": "test"
			}, 200, "OK", "test");

		});

	});

};
