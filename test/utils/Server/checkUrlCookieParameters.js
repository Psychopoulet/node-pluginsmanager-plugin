"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

		// utils
		const httpRequestCookieTest = require(join(__dirname, "..", "..", "utils", "httpRequestCookieTest.js"));

// module

module.exports = function checkUrlCookieParameters (URL_API) {

	describe("check cookie parameters", () => {

		it("should test request with missing cookie parameter", () => {

			return httpRequestCookieTest(URL_API + "/path/cookie", "get", {}, 400, "Bad Request", {
				"code": "MISSING_PARAMETER",
				"message": "Error while validating request: request.cookies should have required property 'cookie-param'"
			});

		});

		it("should test request with empty cookie parameter", () => {

			return httpRequestCookieTest(URL_API + "/path/cookie", "get", {
				"cookie-param": ""
			}, 400, "Bad Request", {
				"code": "EMPTY_OR_RANGE_OR_ENUM_PARAMETER",
				"message": "Error while validating request: request.cookies['cookie-param'] should NOT be shorter than 1 characters"
			});

		});

		it("should test request with valid request", () => {

			return httpRequestCookieTest(URL_API + "/path/cookie", "get", {
				"cookie-param": "test"
			}, 200, "OK", "test");

		});

	});

};
