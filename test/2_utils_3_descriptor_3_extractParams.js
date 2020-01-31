"use strict";

// deps

	// natives
	const { deepStrictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const { extractParams } = require(join(__dirname, "..", "lib", "utils", "descriptor", "main.js"));

// tests

describe("utils / descriptor / extractParams", () => {

	describe("patternPath", () => {

		it("should test with missing data", () => {
			deepStrictEqual(extractParams(), {}, "generated data is not as expected");
		});

		it("should test with wrong data", () => {
			deepStrictEqual(extractParams(false), {}, "generated data is not as expected");
		});

		it("should test with empty data", () => {
			deepStrictEqual(extractParams(""), {}, "generated data is not as expected");
		});

	});

	describe("realPath", () => {

		it("should test with missing data", () => {
			deepStrictEqual(extractParams("/test/test2"), {}, "generated data is not as expected");
		});

		it("should test with wrong data", () => {
			deepStrictEqual(extractParams("/test/test2", false), {}, "generated data is not as expected");
		});

		it("should test with empty data", () => {
			deepStrictEqual(extractParams("/test/test2", ""), {}, "generated data is not as expected");
		});

	});

	describe("valid", () => {

		it("should test with no path parameter", () => {
			deepStrictEqual(extractParams("/test/test2", "/test/test2"), {}, "generated data is not as expected");
		});

		it("should test with path parameter", () => {

			deepStrictEqual(extractParams("/test/{test}", "/test/test2"), {
				"test": "test2"
			}, "generated data is not as expected");

		});

	});

});
