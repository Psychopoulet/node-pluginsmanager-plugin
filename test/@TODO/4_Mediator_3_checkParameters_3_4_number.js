"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals
	const checkNumber = require(join(
		__dirname, "..", "lib", "utils", "checkParameters", "checkExtractedParameter", "checkNumber.js"
	));

// consts

	const KEY = "NUMBER_KEY";

	const DOC = {
		"name": "test",
		"type": "number",
		"required": true,
		"min": 0.1,
		"max": 0.5
	};

// tests

describe("Mediator / checkParameters / number", () => {

	it("should test wrong type", () => {

		const res = checkNumber(KEY, false, DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res instanceof TypeError, true, "Generated result is not as expected");

	});

	it("should test wrong string", () => {

		const res = checkNumber(KEY, "test", DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res instanceof TypeError, true, "Generated result is not as expected");

	});

	it("should test min", () => {

		const res = checkNumber(KEY, 0, DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res instanceof RangeError, true, "Generated result is not as expected");

	});

	it("should test max", () => {

		const res = checkNumber(KEY, 0.6, DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res instanceof RangeError, true, "Generated result is not as expected");

	});

	it("should test string", () => {

		const res = checkNumber(KEY, "0.1", DOC, "body");

		strictEqual(typeof res, "number", "Generated result is not as expected");
		strictEqual(res, 0.1, "Generated result is not as expected");

	});

	it("should test valid data", () => {

		const res = checkNumber(KEY, 0.1, DOC, "body");

		strictEqual(typeof res, "number", "Generated result is not as expected");
		strictEqual(res, 0.1, "Generated result is not as expected");

	});

});
