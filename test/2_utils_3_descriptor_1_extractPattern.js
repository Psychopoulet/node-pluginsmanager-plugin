"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const extractPattern = require(join(__dirname, "..", "lib", "cjs", "utils", "descriptor", "extractPattern.js"));

// tests

describe("utils / descriptor / extractPattern", () => {

	describe("paths", () => {

		it("should test with missing data", () => {
			strictEqual(extractPattern.default(), "", "generated data is not as expected");
		});

		it("should test with wrong data", () => {
			strictEqual(extractPattern.default(false), "", "generated data is not as expected");
		});

		it("should test with empty data", () => {
			strictEqual(extractPattern.default({}), "", "generated data is not as expected");
		});

	});

	describe("pathname", () => {

		it("should test with missing data", () => {

			strictEqual(extractPattern.default({
				"/test/test2": {}
			}), "", "generated data is not as expected");

		});

		it("should test with wrong data", () => {

			strictEqual(extractPattern.default({
				"/test/test2": {}
			}, false), "", "generated data is not as expected");

		});

		it("should test with empty data", () => {

			strictEqual(extractPattern.default({
				"/test/test2": {}
			}, ""), "", "generated data is not as expected");

		});

	});

	describe("method", () => {

		it("should test with missing data", () => {

			strictEqual(extractPattern.default({
				"/test/test2": {}
			}, "/test/test2"), "", "generated data is not as expected");

		});

		it("should test with wrong data", () => {

			strictEqual(extractPattern.default({
				"/test/test2": {}
			}, "/test/test2", false), "", "generated data is not as expected");

		});

		it("should test with empty data", () => {

			strictEqual(extractPattern.default({
				"/test/test2": {}
			}, "/test/test2", ""), "", "generated data is not as expected");

		});

		it("should test with no existing path parameter", () => {

			strictEqual(extractPattern.default({
				"/test/test2": {
					"post": {}
				}
			}, "/test/test2", "get"), "", "generated data is not as expected");

		});

	});

	describe("valid", () => {

		it("should test with valid path parameter", () => {

			strictEqual(extractPattern.default({
				"/test/test2": {
					"get": {}
				}
			}, "/test/test2", "get"), "/test/test2", "generated data is not as expected");

		});

		it("should test with pattern path parameter", () => {

			strictEqual(extractPattern.default({
				"/test/{test}": {
					"get": {}
				}
			}, "/test/test2", "get"), "/test/{test}", "generated data is not as expected");

		});

		it("should test with mutliples valid path parameter", () => {

			strictEqual(extractPattern.default({
				"/test": {
					"post": {}
				},
				"/test/test": {
					"get": {}
				},
				"/test/{test}": {
					"post": {}
				},
				"/test/test/1": {
					"get": {},
					"post": {},
					"put": {}
				},
				"/test/test/2": {
					"post": {}
				},
				"/test/test/3": {
					"post": {}
				}
			}, "/test/test/2", "post"), "/test/test/2", "generated data is not as expected");

		});

	});

});
