"use strict";

// deps

	// natives
	const { deepStrictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const { extractPathMethodByOperationId } = require(join(__dirname, "..", "lib", "utils", "descriptor", "main.js"));

// tests

describe("utils / descriptor / extractPathMethodByOperationId", () => {

	describe("paths", () => {

		it("should test with missing data", () => {
			deepStrictEqual(extractPathMethodByOperationId(), null, "generated data is not as expected");
		});

		it("should test with wrong data", () => {
			deepStrictEqual(extractPathMethodByOperationId(false), null, "generated data is not as expected");
		});

		it("should test with empty data", () => {
			deepStrictEqual(extractPathMethodByOperationId({}), null, "generated data is not as expected");
		});

	});

	describe("paths", () => {

		it("should test with missing data", () => {

			deepStrictEqual(extractPathMethodByOperationId({
				"test": {
					"get": {
						"operationId": "test"
					}
				}
			}), null, "generated data is not as expected");

		});

		it("should test with wrong data", () => {

			deepStrictEqual(extractPathMethodByOperationId({
				"test": {
					"get": {
						"operationId": "test"
					}
				}
			}, false), null, "generated data is not as expected");

		});

		it("should test with empty data", () => {

			deepStrictEqual(extractPathMethodByOperationId({
				"test": {
					"get": {
						"operationId": "test"
					}
				}
			}, ""), null, "generated data is not as expected");

		});

		it("should test with inexisting data", () => {

			deepStrictEqual(extractPathMethodByOperationId({
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

			deepStrictEqual(extractPathMethodByOperationId({
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
				"operationId": "editTest"
			}, "generated data is not as expected");

		});

	});

});
