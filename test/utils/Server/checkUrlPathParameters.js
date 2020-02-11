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

		describe("parameters", () => {

			it("should test request with wrong boolean", () => {

				return httpRequestTest(URL_API + "/valid/url/boolean/test", "get", null, 400, "Bad Request", {
					"code": "WRONG_TYPE_PARAMETER",
					"message": "Error while validating request: request.params['path-param-boolean'] should be boolean"
				});

			});

			it("should test request with wrong integer", () => {

				return httpRequestTest(URL_API + "/valid/url/integer/test", "get", null, 400, "Bad Request", {
					"code": "WRONG_TYPE_PARAMETER",
					"message": "Error while validating request: request.params['path-param-integer'] should be integer"
				});

			});

			it("should test request with wrong number", () => {

				return httpRequestTest(URL_API + "/valid/url/number/test", "get", null, 400, "Bad Request", {
					"code": "WRONG_TYPE_PARAMETER",
					"message": "Error while validating request: request.params['path-param-number'] should be number"
				});

			});

			it("should test request with valid boolean", () => {

				return httpRequestTest(URL_API + "/valid/url/boolean/true", "get", null, 200, "OK", true);

			});

			it("should test request with valid integer", () => {

				return httpRequestTest(URL_API + "/valid/url/integer/1", "get", null, 200, "OK", 1);

			});

			it("should test request with valid number", () => {

				return httpRequestTest(URL_API + "/valid/url/number/0.1", "get", null, 200, "OK", 0.1);

			});

		});

	});

};
