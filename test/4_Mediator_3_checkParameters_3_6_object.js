"use strict";

// deps

	// natives
	const { join } = require("path");
	const { deepStrictEqual, strictEqual } = require("assert");

	// locals
	const checkObject = require(join(
		__dirname, "..", "lib", "utils", "checkParameters", "checkExtractedParameter", "checkObject.js"
	));

// consts

	const KEY = "OBJECT_KEY";

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
		"name": "test-object",
		"type": "object",
		"required": true,
		"properties": [
			DOC_BOOLEAN,
			DOC_INTEGER,
			DOC_NUMBER,
			DOC_STRING,
			DOC_OBJECT,
			DOC_ARRAY
		]
	};

// tests

describe("Mediator / checkParameters / object", () => {

	it("should test wrong type", () => {

		const res = checkObject(KEY, false, DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res instanceof TypeError, true, "Generated result is not as expected");

	});

	it("should test wrong sub-type", () => {

		const res = checkObject(KEY, {
			"test-boolean": "test",
			"test-integer": 1,
			"test-number": 0.1,
			"test-string": "test",
			"test-object": {
				"test-string": "test"
			},
			"test-array": [ "test" ]
		}, DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res instanceof TypeError, true, "Generated result is not as expected");

	});

	it("should test valid data", () => {

		const res = checkObject(KEY, {
			"test-boolean": true,
			"test-integer": 1,
			"test-number": 0.1,
			"test-string": "test",
			"test-object": {
				"test-string": "test"
			},
			"test-array": [ "test" ]
		}, DOC, "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		deepStrictEqual(res, {
			"test-boolean": true,
			"test-integer": 1,
			"test-number": 0.1,
			"test-string": "test",
			"test-object": {
				"test-string": "test"
			},
			"test-array": [ "test" ]
		}, "Generated result is not as expected");

	});

});
