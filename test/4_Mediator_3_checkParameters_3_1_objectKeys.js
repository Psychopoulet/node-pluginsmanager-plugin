"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals
	const checkObjectKeys = require(join(
		__dirname, "..", "lib", "utils", "checkParameters", "checkExtractedParameter", "checkObjectKeys.js"
	));

// tests

describe("Mediator / checkParameters / keys", () => {

	it("should test missing params", () => {

		const res = checkObjectKeys({}, [
			{
				"name": "test",
				"type": "string",
				"required": true
			}
		], "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res instanceof ReferenceError, true, "Generated result is not as expected");

	});

	it("should test too much params", () => {

		const res = checkObjectKeys({
			"test": "test"
		}, [
			{
				"name": "sdvgsdvdsv",
				"type": "string",
				"required": false
			}
		], "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res instanceof ReferenceError, true, "Generated result is not as expected");

	});

	it("should test no params", () => {

		const res = checkObjectKeys({}, [], "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res, null, "Generated result is not as expected");

	});

	it("should test valid number of params", () => {

		const res = checkObjectKeys({
			"test": "test"
		}, [
			{
				"name": "test",
				"type": "string",
				"required": true
			}
		], "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res, null, "Generated result is not as expected");

	});

});
