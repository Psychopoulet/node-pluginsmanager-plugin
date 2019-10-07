"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// utils
		const httpRequestTest = require(join(__dirname, "..", "..", "utils", "httpRequestTest.js"));
		const httpRequestWithWrongHeader = require(join(__dirname, "..", "..", "utils", "httpRequestWithWrongHeader.js"));

// consts

	const URL_API = "/node-pluginsmanager-plugin/api";

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

			return httpRequestTest(URL_API + "/missingoperationid", "get", null, 501, "Not Implemented", {
				"code": "NOT_IMPLEMENTED",
				"message": "Missing \"operationId\" in the Descriptor for this request"
			});

		});

		it("should test request with get request with not implemented operationId", () => {

			return httpRequestTest(URL_API + "/unknownoperationid", "get", null, 501, "Not Implemented", {
				"code": "NOT_IMPLEMENTED",
				"message": "Unknown Mediator's \"operationId\" method for this request"
			});

		});

		it("should test request with valid get path without returned data", () => {

			return httpRequestTest(URL_API + "/empty", "get", null, 404, "Not Found");

		});

		it("should test request with valid delete path without returned data", () => {

			return httpRequestTest(URL_API + "/empty", "post", null, 204, "No Content");

		});

		it("should test request with artificial error", () => {

			return httpRequestTest(URL_API + "/create?url-param=ok", "put", {
				"body-param": "generate-fail"
			}, 500, "Internal Server Error", {
				"code": "INTERNAL_SERVER_ERROR",
				"message": "Generate artificial error"
			});

		});

	});

	describe("check valid paths", () => {

		it("should test descriptor request", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/descriptor", "get", null, 200, "OK", server._Descriptor);

		});

		it("should test request with valid path", () => {

			return httpRequestTest(URL_API + "/valid", "get", null, 200, "OK", [ "test" ]);

		});

	});

	describe("check path parameters", () => {

		describe("types", () => {

			describe("boolean", () => {

				it("should test request with wrong data", () => {

					return httpRequestTest(URL_API + "/valid/url/boolean/1", "get", null, 400, "Bad Request", {
						"code": "WRONG_TYPE_PARAMETER",
						"message": "\"path-param-boolean\" url parameter is not a boolean"
					});

				});

				it("should test request with valid boolean param request", () => {

					return httpRequestTest(URL_API + "/valid/url/boolean/false", "get", null, 200, "OK", {
						"path-param-boolean": false
					});

				});

			});

			describe("string", () => {

				it("should test request with empty path parameter", () => {

					return httpRequestTest(URL_API + "/valid/url/string/", "get", null, 400, "Bad Request", {
						"code": "RANGE_OR_EMPTY_PARAMETER",
						"message": "\"path-param-string\" url path parameter is empty"
					});

				});

				it("should test request with invalid string length param request", () => {

					return httpRequestTest(URL_API + "/valid/url/string/thisisatest", "get", null, 400, "Bad Request", {
						"code": "RANGE_OR_EMPTY_PARAMETER",
						"message": "\"path-param-string\" url parameter length must be lower or equals to 5"
					});

				});

				it("should test request with valid string param request", () => {

					return httpRequestTest(URL_API + "/valid/url/string/test", "get", null, 200, "OK", {
						"path-param-string": "test"
					});

				});

			});

		});

	});

	describe("check query parameters", () => {

		it("should test request with missing query parameter", () => {

			return httpRequestTest(URL_API + "/create", "put", {
				"body-param": "test"
			}, 400, "Bad Request", {
				"code": "MISSING_PARAMETER",
				"message": "Missing url parameters : [ \"url-param\" ]"
			});

		});

		it("should test request with empty query parameter", () => {

			return httpRequestTest(URL_API + "/create?url-param=", "put", {
				"body-param": "test"
			}, 400, "Bad Request", {
				"code": "RANGE_OR_EMPTY_PARAMETER",
				"message": "\"url-param\" url path parameter is empty"
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

		it("should test request with number formate", () => {

			return httpRequestTest(URL_API + "/valid/url/number/1", "get", null, 200, "OK", {
				"path-param-number": 1
			});

		});

		it("should test request with boolean formate", () => {

			return httpRequestTest(URL_API + "/valid/url/boolean/false", "get", null, 200, "OK", {
				"path-param-boolean": false
			});

		});

		it("should test request with facultative parameter", () => {

			return httpRequestTest(URL_API + "/valid/url/facultative", "get", null, 200, "OK");

		});

	});

	describe("check body parameters", () => {

		it("should test request with missing body parameter", () => {

			return httpRequestTest(URL_API + "/create?url-param=ok", "put", null, 400, "Bad Request", {
				"code": "MISSING_PARAMETER",
				"message": "Missing body parameters : [ \"body-param\" ]"
			});

		});

		it("should test request with wrong body parameter", () => {

			return httpRequestTest(URL_API + "/create?url-param=ok", "put", {
				"body-param": false
			}, 400, "Bad Request", {
				"code": "WRONG_TYPE_PARAMETER",
				"message": "\"body-param\" body parameter is not a string"
			});

		});

		it("should test request with empty body parameter", () => {

			return httpRequestTest(URL_API + "/create?url-param=ok", "put", {
				"body-param": ""
			}, 400, "Bad Request", {
				"code": "RANGE_OR_EMPTY_PARAMETER",
				"message": "\"body-param\" body parameter is empty"
			});

		});

		it("should test request with valid request", () => {

			return httpRequestTest(URL_API + "/create?url-param=ok", "put", {
				"body-param": "test"
			}, 201, "Created");

		});

		describe("content-type", () => {

			it("should test request with missing data", () => {

				return httpRequestWithWrongHeader(URL_API + "/create?url-param=ok", "put", {
					"body-param": "test"
				}, null, 400, "Bad Request", {
					"code": "MISSING_HEADER",
					"message": "No \"Content-Type\" header found"
				});

			});

			it("should test request with wrong data", () => {

				return httpRequestWithWrongHeader(URL_API + "/create?url-param=ok", "put", {
					"body-param": "test"
				}, "test", 400, "Bad Request", {
					"code": "MISSING_HEADER",
					"message": "No \"Content-Type\" header found"
				});

			});

			it("should test request with missing content-length", () => {

				return httpRequestWithWrongHeader(URL_API + "/create?url-param=ok", "put", {
					"body-param": "test"
				}, {}, 400, "Bad Request", {
					"code": "MISSING_HEADER",
					"message": "No \"Content-Type\" header found"
				});

			});

		});

		describe("content-length", () => {

			it("should test request with missing data", () => {

				return httpRequestWithWrongHeader(URL_API + "/create?url-param=ok", "put", {
					"body-param": "test"
				}, {
					"Content-Type": "application/json"
				}, 411, "Length Required", {
					"code": "MISSING_HEADER",
					"message": "No \"Content-Length\" header found"
				});

			});

			// must crash request body parsing
			it("should test request with wrong content-length", (done) => {

				httpRequestWithWrongHeader(URL_API + "/create?url-param=ok", "put", {
					"body-param": "test"
				}, {
					"Content-Type": "application/json",
					"Content-Length": "test"
				}, 411, "Length Required").then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "generated error is not as expected");
					strictEqual(err instanceof Error, true, "generated error is not as expected");

					done();

				});

			});

			// must interrupt request body parsing before the end and generate a socket error
			it("should test request with inexact content-length", (done) => {

				httpRequestWithWrongHeader(URL_API + "/create?url-param=ok", "put", {
					"body-param": "test"
				}, {
					"Content-Type": "application/json",
					"Content-Length": 2
				}, 411, "Length Required").then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "generated error is not as expected");
					strictEqual(err instanceof Error, true, "generated error is not as expected");

					done();

				});

			});

			it("should test valid request", () => {

				const params = {
					"body-param": "test"
				};

				return httpRequestWithWrongHeader(URL_API + "/create?url-param=ok", "put", params, {
					"Content-Type": "application/json",
					"Content-Length": Buffer.byteLength(JSON.stringify(params))
				}, 201, "Created");

			});

		});

	});

};
