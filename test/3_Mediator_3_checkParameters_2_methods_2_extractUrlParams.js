"use strict";

// deps

	// natives
	const { join } = require("path");
	const { deepStrictEqual, strictEqual } = require("assert");

	// locals

		// plugin
		const extractUrlParams = require(join(
			__dirname, "..", "lib", "utils", "extractFromDescriptor", "extractUrlParams.js"
		));

// tests

describe("Mediator / checkParameters / extractUrlParams", () => {

	it("should test missing parameters", () => {

		const parameters = extractUrlParams();

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

	});

	it("should test wrong parameters", () => {

		const parameters = extractUrlParams("test");

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

	});

	it("should test empty parameters", () => {

		const parameters = extractUrlParams([]);

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

	});

	it("should test wrong param", () => {

		const parameters = extractUrlParams([ "create" ]);

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 1, "Generated parameters length is not as expected");

		deepStrictEqual(parameters[0], {
			"name": "create",
			"required": false,
			"type": "unknown"
		}, "Generated first parameters is not as expected");

	});

	it("should test param without name", () => {

		const parameters = extractUrlParams([
			{
				"required": true,
				"schema": {
					"type": "string"
				}
			}
		]);

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 1, "Generated parameters length is not as expected");

		deepStrictEqual(parameters[0], {
			"name": "unknown",
			"required": true,
			"type": "string"
		}, "Generated first parameters is not as expected");

	});

	it("should test param without required", () => {

		const parameters = extractUrlParams([
			{
				"name": "test",
				"schema": {
					"type": "string"
				}
			}
		]);

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 1, "Generated parameters length is not as expected");

		deepStrictEqual(parameters[0], {
			"name": "test",
			"required": false,
			"type": "string"
		}, "Generated first parameters is not as expected");

	});

	it("should test param without schema", () => {

		const parameters = extractUrlParams([
			{
				"name": "test",
				"required": false
			}
		]);

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 1, "Generated parameters length is not as expected");

		deepStrictEqual(parameters[0], {
			"name": "test",
			"required": false,
			"type": "unknown"
		}, "Generated first parameters is not as expected");

	});

	it("should test param without type", () => {

		const parameters = extractUrlParams([
			{
				"name": "test",
				"required": false,
				"schema": null
			}
		]);

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 1, "Generated parameters length is not as expected");

		deepStrictEqual(parameters[0], {
			"name": "test",
			"required": false,
			"type": "unknown"
		}, "Generated first parameters is not as expected");

	});

});
