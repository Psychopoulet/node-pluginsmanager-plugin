"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals
	const checkString = require(join(
		__dirname, "..", "lib", "utils", "checkParameters", "checkExtractedParameter", "checkString.js"
	));

// consts

	const KEY = "STRING_KEY";

	const DOC = {
		"name": "test",
		"type": "string",
		"required": true,
		"min": 2,
		"max": 5
	};

// tests

describe("Mediator / checkParameters / string", () => {

	it("should test wrong type", () => {

		const res = checkString(KEY, false, DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res instanceof TypeError, true, "Generated result is not as expected");

	});

	it("should test min", () => {

		const res = checkString(KEY, "t", DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res instanceof RangeError, true, "Generated result is not as expected");

	});

	it("should test max", () => {

		const res = checkString(KEY, "thisisatest", DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res instanceof RangeError, true, "Generated result is not as expected");

	});

	it("should test valid data", () => {

		const res = checkString(KEY, "test", DOC, "body");

		strictEqual(typeof res, "string", "Generated result is not as expected");
		strictEqual(res, "test", "Generated result is not as expected");

	});

});
