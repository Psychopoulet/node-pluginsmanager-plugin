"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

		// utils
		const httpRequestTest = require(join(__dirname, "..", "..", "utils", "httpRequestTest.js"));

// module

module.exports = function checkBodyParameters (URL_API) {

	describe("check parameters", () => {

		describe("boolean", () => {

			it("should test request with wrong data", () => {

				return httpRequestTest(URL_API + "/valid/body/boolean", "post", {
					"body-param-boolean": "test"
				}, 400, "Bad Request", {
					"code": "WRONG_TYPE_PARAMETER",
					"message": "Error while validating request: request/body/body-param-boolean must be boolean"
				});

			});

			it("should test request with valid boolean", () => {

				return httpRequestTest(URL_API + "/valid/body/boolean", "post", {
					"body-param-boolean": false
				}, 200, "OK", false);

			});

		});

		describe("integer", () => {

			it("should test request with wrong data", () => {

				return httpRequestTest(URL_API + "/valid/body/integer", "post", {
					"body-param-integer": "test"
				}, 400, "Bad Request", {
					"code": "WRONG_TYPE_PARAMETER",
					"message": "Error while validating request: request/body/body-param-integer must be integer"
				});

			});

			it("should test request with invalid integer", () => {

				return httpRequestTest(URL_API + "/valid/body/integer", "post", {
					"body-param-integer": 6
				}, 400, "Bad Request", {
					"code": "EMPTY_OR_RANGE_OR_ENUM_PARAMETER",
					"message": "Error while validating request: request/body/body-param-integer must be <= 5"
				});

			});

			it("should test request with valid integer", () => {

				return httpRequestTest(URL_API + "/valid/body/integer", "post", {
					"body-param-integer": 1
				}, 200, "OK", 1);

			});

		});

		describe("number", () => {

			it("should test request with wrong data", () => {

				return httpRequestTest(URL_API + "/valid/body/number", "post", {
					"body-param-number": "test"
				}, 400, "Bad Request", {
					"code": "WRONG_TYPE_PARAMETER",
					"message": "Error while validating request: request/body/body-param-number must be number"
				});

			});

			it("should test request with invalid number", () => {

				return httpRequestTest(URL_API + "/valid/body/number", "post", {
					"body-param-number": 0.6
				}, 400, "Bad Request", {
					"code": "EMPTY_OR_RANGE_OR_ENUM_PARAMETER",
					"message": "Error while validating request: request/body/body-param-number must be <= 0.5"
				});

			});

			it("should test request with valid number", () => {

				return httpRequestTest(URL_API + "/valid/body/number", "post", {
					"body-param-number": 0.1
				}, 200, "OK", 0.1);

			});

		});

		describe("string", () => {

			it("should test request with wrong data", () => {

				return httpRequestTest(URL_API + "/valid/body/string", "post", {
					"body-param-string": false
				}, 400, "Bad Request", {
					"code": "WRONG_TYPE_PARAMETER",
					"message": "Error while validating request: request/body/body-param-string must be string"
				});

			});

			it("should test request with empty data", () => {

				return httpRequestTest(URL_API + "/valid/body/string", "post", {
					"body-param-string": ""
				}, 400, "Bad Request", {
					"code": "EMPTY_OR_RANGE_OR_ENUM_PARAMETER",
					"message": "Error while validating request: request/body/body-param-string must NOT have fewer than 1 characters"
				});

			});

			it("should test request with invalid string length", () => {

				return httpRequestTest(URL_API + "/valid/body/string", "post", {
					"body-param-string": "thisisatest"
				}, 400, "Bad Request", {
					"code": "EMPTY_OR_RANGE_OR_ENUM_PARAMETER",
					"message": "Error while validating request: request/body/body-param-string must NOT have more than 5 characters"
				});

			});

			it("should test request with valid string", () => {

				return httpRequestTest(URL_API + "/valid/body/string", "post", {
					"body-param-string": "test"
				}, 200, "OK", "test");

			});

		});

		describe("object", () => {

			it("should test request with wrong data", () => {

				return httpRequestTest(URL_API + "/valid/body/object", "post", {
					"body-param-object": false
				}, 400, "Bad Request", {
					"code": "WRONG_TYPE_PARAMETER",
					"message": "Error while validating request: request/body/body-param-object must be object"
				});

			});

			it("should test request with missing property", () => {

				return httpRequestTest(URL_API + "/valid/body/object", "post", {
					"body-param-object": {}
				}, 400, "Bad Request", {
					"code": "MISSING_PARAMETER",
					"message": "Error while validating request: request/body/body-param-object must have required property 'body-param-string'"
				});

			});

			it("should test request with valid object", () => {

				return httpRequestTest(URL_API + "/valid/body/object", "post", {
					"body-param-object": {
						"body-param-string": "test"
					}
				}, 200, "OK", {
					"body-param-string": "test"
				});

			});

		});

		describe("array", () => {

			it("should test request with wrong data", () => {

				return httpRequestTest(URL_API + "/valid/body/array", "post", {
					"body-param-array": false
				}, 400, "Bad Request", {
					"code": "WRONG_TYPE_PARAMETER",
					"message": "Error while validating request: request/body/body-param-array must be array"
				});

			});

			it("should test request with missing data", () => {

				return httpRequestTest(URL_API + "/valid/body/array", "post", {
					"body-param-array": []
				}, 400, "Bad Request", {
					"code": "EMPTY_OR_RANGE_OR_ENUM_PARAMETER",
					"message": "Error while validating request: request/body/body-param-array must NOT have fewer than 1 items"
				});

			});

			it("should test request with too much data", () => {

				return httpRequestTest(URL_API + "/valid/body/array", "post", {
					"body-param-array": [ "test", "test", "test", "test", "test", "test" ]
				}, 400, "Bad Request", {
					"code": "EMPTY_OR_RANGE_OR_ENUM_PARAMETER",
					"message": "Error while validating request: request/body/body-param-array must NOT have more than 5 items"
				});

			});

			it("should test request with one incorrect data", () => {

				return httpRequestTest(URL_API + "/valid/body/array", "post", {
					"body-param-array": [ "test", "thisisatest", "test" ]
				}, 400, "Bad Request", {
					"code": "EMPTY_OR_RANGE_OR_ENUM_PARAMETER",
					"message": "Error while validating request: request/body/body-param-array/1 must NOT have more than 5 characters"
				});

			});

			it("should test request with one incorrect data", () => {

				return httpRequestTest(URL_API + "/valid/body/array", "post", {
					"body-param-array": [ "test", 5, "test" ]
				}, 400, "Bad Request", {
					"code": "WRONG_TYPE_PARAMETER",
					"message": "Error while validating request: request/body/body-param-array/1 must be string"
				});

			});

			it("should test request with valid object", () => {

				return httpRequestTest(URL_API + "/valid/body/object", "post", {
					"body-param-object": {
						"body-param-string": "test"
					}
				}, 200, "OK", {
					"body-param-string": "test"
				});

			});

		});

	});

};
