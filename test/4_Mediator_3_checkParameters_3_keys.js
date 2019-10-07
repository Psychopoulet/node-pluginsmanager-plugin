"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals
	const checkParamsKeys = require(join(__dirname, "..", "lib", "utils", "checkParameters", "checkParamsKeys.js"));

// tests

describe("Mediator / checkParameters / keys", () => {

	it("should test missing params", () => {

		const res = checkParamsKeys({}, [
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

		const res = checkParamsKeys({
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

		const res = checkParamsKeys({}, [], "body");

		strictEqual(typeof res, "object", "Generated result is not as expected");
		strictEqual(res, null, "Generated result is not as expected");

	});

	it("should test valid number of params", () => {

		const res = checkParamsKeys({
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
