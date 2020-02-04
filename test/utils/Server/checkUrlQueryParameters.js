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

		it("should test request with missing query parameter", () => {

			return httpRequestTest(URL_API + "/create", "put", {
				"body-param": "test"
			}, 400, "Bad Request", {
				"code": "MISSING_PARAMETER",
				"message": "Error while validating request: request.query should have required property 'url-param'"
			});

		});

		it("should test request with empty query parameter", () => {

			return httpRequestTest(URL_API + "/create?url-param=", "put", {
				"body-param": "test"
			}, 400, "Bad Request", {
				"code": "EMPTY_OR_RANGE_OR_ENUM_PARAMETER",
				"message": "\"query.url-param\" url path parameter is empty"
			});

		});

		it("should test request with valid request", () => {

			return httpRequestTest(URL_API + "/create?url-param=ok", "put", {
				"body-param": "test"
			}, 201, "Created");

		});

		it("should test request with component", () => {

			return httpRequestTest(URL_API + "/valid/url/string/test", "get", null, 200, "OK");

		});

		it("should test request with facultative parameter", () => {

			return httpRequestTest(URL_API + "/valid/url/facultative", "get", null, 200, "OK");

		});

	});

};
