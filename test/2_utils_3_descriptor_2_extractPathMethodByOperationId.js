"use strict";

// deps

	// natives
	const { deepStrictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const extractPathMethodByOperationId = require(join(__dirname, "..", "lib", "cjs", "utils", "descriptor", "extractPathMethodByOperationId.js"));

// tests

describe("utils / descriptor / extractPathMethodByOperationId", () => {

	describe("paths", () => {

		it("should test with missing data", () => {
			deepStrictEqual(extractPathMethodByOperationId.default(), null, "generated data is not as expected");
		});

		it("should test with wrong data", () => {
			deepStrictEqual(extractPathMethodByOperationId.default(false), null, "generated data is not as expected");
		});

		it("should test with empty data", () => {
			deepStrictEqual(extractPathMethodByOperationId.default({}), null, "generated data is not as expected");
		});

	});

	describe("paths", () => {

		it("should test with missing data", () => {

			deepStrictEqual(extractPathMethodByOperationId.default({
				"test": {
					"get": {
						"operationId": "test"
					}
				}
			}), null, "generated data is not as expected");

		});

		it("should test with wrong data", () => {

			deepStrictEqual(extractPathMethodByOperationId.default({
				"test": {
					"get": {
						"operationId": "test"
					}
				}
			}, false), null, "generated data is not as expected");

		});

		it("should test with empty data", () => {

			deepStrictEqual(extractPathMethodByOperationId.default({
				"test": {
					"get": {
						"operationId": "test"
					}
				}
			}, ""), null, "generated data is not as expected");

		});

		it("should test with inexisting data", () => {

			deepStrictEqual(extractPathMethodByOperationId.default({
				"test": {
					"get": {
						"operationId": "test"
					}
				}
			}, "test2"), null, "generated data is not as expected");

		});

	});

	describe("valid", () => {

		it("should test with mutliples data", () => {

			deepStrictEqual(extractPathMethodByOperationId.default({
				"/test": {
					"get": {
						"operationId": "getTest"
					},
					"post": {
						"operationId": "addTest"
					},
					"put": {
						"operationId": "editTest"
					},
					"delete": {
						"operationId": "removeTest"
					}
				}
			}, "editTest"), {
				"path": "/test",
				"method": "put",
				"operationId": "editTest"
			}, "generated data is not as expected");

		});

	});

});
