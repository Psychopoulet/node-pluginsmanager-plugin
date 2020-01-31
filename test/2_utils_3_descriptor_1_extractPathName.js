"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const { extractPathName } = require(join(__dirname, "..", "lib", "utils", "descriptor", "main.js"));

// tests

describe("utils / descriptor / extractPathName", () => {

	describe("paths", () => {

		it("should test with missing data", () => {
			strictEqual(extractPathName(), "", "generated data is not as expected");
		});

		it("should test with wrong data", () => {
			strictEqual(extractPathName(false), "", "generated data is not as expected");
		});

		it("should test with empty data", () => {
			strictEqual(extractPathName({}), "", "generated data is not as expected");
		});

	});

	describe("pathname", () => {

		it("should test with missing data", () => {

			strictEqual(extractPathName({
				"/test/test2": {}
			}), "", "generated data is not as expected");

		});

		it("should test with wrong data", () => {

			strictEqual(extractPathName({
				"/test/test2": {}
			}, false), "", "generated data is not as expected");

		});

		it("should test with empty data", () => {

			strictEqual(extractPathName({
				"/test/test2": {}
			}, ""), "", "generated data is not as expected");

		});

	});

	describe("method", () => {

		it("should test with missing data", () => {

			strictEqual(extractPathName({
				"/test/test2": {}
			}, "/test/test2"), "", "generated data is not as expected");

		});

		it("should test with wrong data", () => {

			strictEqual(extractPathName({
				"/test/test2": {}
			}, "/test/test2", false), "", "generated data is not as expected");

		});

		it("should test with empty data", () => {

			strictEqual(extractPathName({
				"/test/test2": {}
			}, "/test/test2", ""), "", "generated data is not as expected");

		});

		it("should test with no existing path parameter", () => {

			strictEqual(extractPathName({
				"/test/test2": {
					"post": {}
				}
			}, "/test/test2", "get"), "", "generated data is not as expected");

		});

	});

	describe("valid", () => {

		it("should test with valid path parameter", () => {

			strictEqual(extractPathName({
				"/test/test2": {
					"get": {}
				}
			}, "/test/test2", "get"), "/test/test2", "generated data is not as expected");

		});

		it("should test with pattern path parameter", () => {

			strictEqual(extractPathName({
				"/test/{test}": {
					"get": {}
				}
			}, "/test/test2", "get"), "/test/{test}", "generated data is not as expected");

		});

		it("should test with mutliples valid path parameter", () => {

			strictEqual(extractPathName({
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
