"use strict";

// deps

	// natives
	const { deepStrictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const extractParams = require(join(__dirname, "..", "lib", "cjs", "utils", "descriptor", "extractParams.js"));

// tests

describe("utils / descriptor / extractParams", () => {

	describe("patternPath", () => {

		it("should test with missing data", () => {
			deepStrictEqual(extractParams.default(), {}, "generated data is not as expected");
		});

		it("should test with wrong data", () => {
			deepStrictEqual(extractParams.default(false), {}, "generated data is not as expected");
		});

		it("should test with empty data", () => {
			deepStrictEqual(extractParams.default(""), {}, "generated data is not as expected");
		});

	});

	describe("realPath", () => {

		it("should test with missing data", () => {
			deepStrictEqual(extractParams.default("/test/test2"), {}, "generated data is not as expected");
		});

		it("should test with wrong data", () => {
			deepStrictEqual(extractParams.default("/test/test2", false), {}, "generated data is not as expected");
		});

		it("should test with empty data", () => {
			deepStrictEqual(extractParams.default("/test/test2", ""), {}, "generated data is not as expected");
		});

	});

	describe("valid", () => {

		it("should test with no path parameter", () => {
			deepStrictEqual(extractParams.default("/test/test2", "/test/test2"), {}, "generated data is not as expected");
		});

		it("should test with path parameter", () => {

			deepStrictEqual(extractParams.default("/test/{test}", "/test/test2"), {
				"test": "test2"
			}, "generated data is not as expected");

		});

		it("should test with encoded parameter", () => {

			const data = "this is a test";

			deepStrictEqual(extractParams.default("/test/{test}", "/test/" + encodeURI(data)), {
				"test": data
			}, "generated data is not as expected");

		});

	});

});
