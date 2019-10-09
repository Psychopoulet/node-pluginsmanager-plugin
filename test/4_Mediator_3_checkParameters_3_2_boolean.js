"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals
	const checkBoolean = require(join(
		__dirname, "..", "lib", "utils", "checkParameters", "checkExtractedParameter", "checkBoolean.js"
	));

// consts

	const KEY = "BOOLEAN_KEY";

	const DOC = {
		"name": "test",
		"type": "boolean",
		"required": true
	};

// tests

describe("Mediator / checkParameters / boolean", () => {

	it("should test wrong type", () => {

		const res = checkBoolean(KEY, "test", DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res instanceof TypeError, true, "Generated result is not as expected");

	});

	it("should test string", () => {

		const res = checkBoolean(KEY, "false", DOC, "body");

		strictEqual(typeof res, "boolean", "Generated result is not as expected");
		strictEqual(res, false, "Generated result is not as expected");

	});

	it("should test valid data", () => {

		const res = checkBoolean(KEY, false, DOC, "body");

		strictEqual(typeof res, "boolean", "Generated result is not as expected");
		strictEqual(res, false, "Generated result is not as expected");

	});

});
