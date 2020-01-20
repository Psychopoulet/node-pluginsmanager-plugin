"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals
	const checkInteger = require(join(
		__dirname, "..", "lib", "utils", "checkParameters", "checkExtractedParameter", "checkInteger.js"
	));

// consts

	const KEY = "INTEGER_KEY";

	const DOC = {
		"name": "test",
		"type": "integer",
		"required": true,
		"min": 1,
		"max": 5
	};

// tests

describe("Mediator / checkParameters / integer", () => {

	it("should test wrong type", () => {

		const res = checkInteger(KEY, false, DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res instanceof TypeError, true, "Generated result is not as expected");

	});

	it("should test wrong string", () => {

		const res = checkInteger(KEY, "test", DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res instanceof TypeError, true, "Generated result is not as expected");

	});

	it("should test float", () => {

		const res = checkInteger(KEY, 1.1, DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res instanceof TypeError, true, "Generated result is not as expected");

	});

	it("should test min", () => {

		const res = checkInteger(KEY, 0, DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res instanceof RangeError, true, "Generated result is not as expected");

	});

	it("should test max", () => {

		const res = checkInteger(KEY, 6, DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res instanceof RangeError, true, "Generated result is not as expected");

	});

	it("should test string", () => {

		const res = checkInteger(KEY, "1", DOC, "body");

		strictEqual(typeof res, "number", "Generated result is not as expected");
		strictEqual(res, 1, "Generated result is not as expected");

	});

	it("should test valid data", () => {

		const res = checkInteger(KEY, 1, DOC, "body");

		strictEqual(typeof res, "number", "Generated result is not as expected");
		strictEqual(res, 1, "Generated result is not as expected");

	});

});
