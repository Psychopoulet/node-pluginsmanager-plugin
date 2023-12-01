"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

		// utils
		const httpRequestTest = require(join(__dirname, "..", "..", "utils", "httpRequestTest.js"));

// module

module.exports = function checkBodyBasics (URL_API) {

	describe("check body basics features", () => {

		it("should test request without body parameter", () => {

			return httpRequestTest(URL_API + "/create?url-param=ok", "put", "", 400, "Bad Request", {
				"code": "WRONG_TYPE_PARAMETER",
				"message": "Error while validating request: request/body must be object"
			});

		});

		it("should test request with missing body parameter", () => {

			return httpRequestTest(URL_API + "/create?url-param=ok", "put", "{}", 400, "Bad Request", {
				"code": "MISSING_PARAMETER",
				"message": "Error while validating request: request/body must have required property 'body-param'"
			});

		});

		it("should test request with wrong body parameter", () => {

			return httpRequestTest(URL_API + "/create?url-param=ok", "put", {
				"body-param": false
			}, 400, "Bad Request", {
				"code": "WRONG_TYPE_PARAMETER",
				"message": "Error while validating request: request/body/body-param must be string"
			});

		});

		it("should test request with empty body parameter", () => {

			return httpRequestTest(URL_API + "/create?url-param=ok", "put", {
				"body-param": ""
			}, 400, "Bad Request", {
				"code": "EMPTY_OR_RANGE_OR_ENUM_PARAMETER",
				"message": "\"body-param\" body parameter is empty"
			});

		});

		it("should test request with valid request", () => {

			return httpRequestTest(URL_API + "/create?url-param=ok", "put", {
				"body-param": "test"
			}, 201, "Created");

		});

	});

};
