"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

		// utils
		const httpRequestTest = require(join(__dirname, "..", "..", "utils", "httpRequestTest.js"));

// module

module.exports = function test (server) {

	describe("check wrong paths", () => {

		it("should test request with default path", () => {

			return httpRequestTest("/", "get", null, 404, "Not Found", {
				"code": "404",
				"message": "Unknown page"
			});

		});

		it("should test request with get request without operationId", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/missingoperationid", "get", null, 501, "Not Implemented", {
				"code": "NOT_IMPLEMENTED",
				"message": "Missing \"operationId\" in the Descriptor for this request"
			});

		});

		it("should test request with get request with not implemented operationId", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/unknownoperationid", "get", null, 501, "Not Implemented", {
				"code": "NOT_IMPLEMENTED",
				"message": "Unknown Mediator's \"operationId\" method for this request"
			});

		});

		it("should test request with valid get path without returned data", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/empty", "get", null, 404, "Not Found");

		});

		it("should test request with valid delete path without returned data", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/empty", "post", null, 204, "No Content");

		});

		it("should test request with artificial error", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/create?url-param=ok", "put", {
				"body-param": "generate-fail"
			}, 500, "Internal Server Error", {
				"code": "INTERNAL_SERVER_ERROR",
				"message": "Generate artificial error"
			});

		});

	});

	describe("check url parameters", () => {

		it("should test request with missing url parameter", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/create", "put", null, 400, "Bad Request", {
				"code": "MISSING_PARAMETER",
				"message": "Missing url-param param"
			});

		});

		it("should test request with empty url parameter", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/create?url-param=", "put", null, 400, "Bad Request", {
				"code": "RANGE_OR_EMPTY_PARAMETER",
				"message": "url-param param is empty"
			});

		});

	});

	describe("check body parameters", () => {

		it("should test request with missing body parameter", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/create?url-param=ok", "put", null, 400, "Bad Request", {
				"code": "MISSING_PARAMETER",
				"message": "Missing body params"
			});

		});

		it("should test request with wrong body parameter", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/create?url-param=ok", "put", {
				"body-param": false
			}, 400, "Bad Request", {
				"code": "WRONG_TYPE_PARAMETER",
				"message": "body-param param is not a string"
			});

		});

		it("should test request with empty body parameter", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/create?url-param=ok", "put", {
				"body-param": ""
			}, 400, "Bad Request", {
				"code": "RANGE_OR_EMPTY_PARAMETER",
				"message": "body-param param is empty"
			});

		});

	});

	describe("check path parameters", () => {

		it("should test request with empty path parameter", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/valid/url/", "get", null, 400, "Bad Request", {
				"code": "RANGE_OR_EMPTY_PARAMETER",
				"message": "url-param param is empty"
			});

		});

	});

	describe("check valid requests", () => {

		it("should test request with valid request with query parameters", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/create?url-param=ok", "put", {
				"body-param": "test"
			}, 201, "Created");

		});

		it("should test request with valid path", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/valid", "get", null, 200, "OK", [ "test" ]);

		});

		it("should test descriptor request", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/descriptor", "get", null, 200, "OK", server._Descriptor);

		});

	});

};
