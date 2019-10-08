"use strict";

// deps

	// natives
	const { join } = require("path");
	const { deepStrictEqual, strictEqual } = require("assert");

	// locals
	const checkArray = require(join(
		__dirname, "..", "lib", "utils", "checkParameters", "checkExtractedParameter", "checkArray.js"
	));

// consts

	const KEY = "ARRAY_KEY";

	const DOC_BOOLEAN = {
		"name": "test-boolean",
		"type": "boolean",
		"required": true
	};

	const DOC_INTEGER = {
		"name": "test-integer",
		"type": "integer",
		"required": true
	};

	const DOC_NUMBER = {
		"name": "test-number",
		"type": "number",
		"required": true
	};

	const DOC_STRING = {
		"name": "test-string",
		"type": "string",
		"required": true
	};

	const DOC_OBJECT = {
		"name": "test-object",
		"type": "object",
		"required": true,
		"properties": [ DOC_STRING ]
	};

	const DOC_ARRAY = {
		"name": "test-array",
		"type": "array",
		"required": true,
		"items": DOC_STRING
	};

	const DOC = {
		"name": "test-array",
		"type": "array",
		"required": true,
		"items": DOC_STRING,
		"min": 1,
		"max": 3
	};

// tests

describe("Mediator / checkParameters / array", () => {

	it("should test wrong type", () => {

		const res = checkArray(KEY, false, DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res instanceof TypeError, true, "Generated result is not as expected");

	});

	it("should test min", () => {

		const res = checkArray(KEY, [], DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res instanceof RangeError, true, "Generated result is not as expected");

	});

	it("should test max", () => {

		const res = checkArray(KEY, [ "test", "test", "test", "test" ], DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res instanceof RangeError, true, "Generated result is not as expected");

	});

	it("should test one wrong data", () => {

		const res = checkArray(KEY, [ "test", 5 ], DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res instanceof TypeError, true, "Generated result is not as expected");

	});

	it("should test valid string data", () => {

		const res = checkArray(KEY, [ "test" ], DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		deepStrictEqual(res, [ "test" ], "Generated result is not as expected");

	});

	it("should test valid boolean data", () => {

		DOC.items = DOC_BOOLEAN;

		const res = checkArray(KEY, [ "true", true ], DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		deepStrictEqual(res, [ true, true ], "Generated result is not as expected");

	});

	it("should test valid integer data", () => {

		DOC.items = DOC_INTEGER;

		const res = checkArray(KEY, [ "1", 1 ], DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		deepStrictEqual(res, [ 1, 1 ], "Generated result is not as expected");

	});

	it("should test valid number data", () => {

		DOC.items = DOC_NUMBER;

		const res = checkArray(KEY, [ "0.1", 0.1 ], DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		deepStrictEqual(res, [ 0.1, 0.1 ], "Generated result is not as expected");

	});

	it("should test valid string data", () => {

		DOC.items = DOC_STRING;

		const res = checkArray(KEY, [ "test", "test" ], DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		deepStrictEqual(res, [ "test", "test" ], "Generated result is not as expected");

	});

	it("should test valid object data", () => {

		DOC.items = DOC_OBJECT;

		const res = checkArray(KEY, [
			{
				"test-string": "test"
			}, {
				"test-string": "test"
			}
		], DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		deepStrictEqual(res, [
			{
				"test-string": "test"
			}, {
				"test-string": "test"
			}
		], "Generated result is not as expected");

	});

	it("should test valid array data", () => {

		DOC.items = DOC_ARRAY;

		const res = checkArray(KEY, [
			[ "test" ],
			[ "test" ]
		], DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		deepStrictEqual(res, [
			[ "test" ],
			[ "test" ]
		], "Generated result is not as expected");

	});

});
