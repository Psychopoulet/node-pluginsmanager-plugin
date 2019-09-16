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

describe("Mediator / checkParameters / extractUrlParams / pure description", () => {

	it("should test null param", () => {

		const parameters = extractUrlParams([ null ]);

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 1, "Generated parameters length is not as expected");

		deepStrictEqual(parameters[0], {
			"name": "null",
			"required": false,
			"type": "unknown",
			"in": "unknown"
		}, "Generated first parameters is not as expected");

	});

	it("should test wrong param", () => {

		const parameters = extractUrlParams([ "url-param" ]);

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 1, "Generated parameters length is not as expected");

		deepStrictEqual(parameters[0], {
			"name": "url-param",
			"required": false,
			"type": "unknown",
			"in": "unknown"
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
			"type": "string",
			"in": "unknown"
		}, "Generated first parameters is not as expected");

	});

	it("should test param without required", () => {

		const parameters = extractUrlParams([
			{
				"name": "url-param",
				"schema": {
					"type": "string"
				}
			}
		]);

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 1, "Generated parameters length is not as expected");

		deepStrictEqual(parameters[0], {
			"name": "url-param",
			"required": false,
			"type": "string",
			"in": "unknown"
		}, "Generated first parameters is not as expected");

	});

	it("should test param without schema", () => {

		const parameters = extractUrlParams([
			{
				"name": "url-param",
				"required": false
			}
		]);

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 1, "Generated parameters length is not as expected");

		deepStrictEqual(parameters[0], {
			"name": "url-param",
			"required": false,
			"type": "unknown",
			"in": "unknown"
		}, "Generated first parameters is not as expected");

	});

	it("should test param null schema", () => {

		const parameters = extractUrlParams([
			{
				"name": "url-param",
				"required": false,
				"schema": null
			}
		]);

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 1, "Generated parameters length is not as expected");

		deepStrictEqual(parameters[0], {
			"name": "url-param",
			"required": false,
			"type": "unknown",
			"in": "unknown"
		}, "Generated first parameters is not as expected");

	});

	it("should test param without type", () => {

		const parameters = extractUrlParams([
			{
				"name": "url-param",
				"required": false,
				"schema": {}
			}
		]);

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 1, "Generated parameters length is not as expected");

		deepStrictEqual(parameters[0], {
			"name": "url-param",
			"required": false,
			"type": "unknown",
			"in": "unknown"
		}, "Generated first parameters is not as expected");

	});

	it("should test param full valid", () => {

		const parameters = extractUrlParams([
			{
				"name": "url-param",
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
			"name": "url-param",
			"required": true,
			"type": "string",
			"in": "unknown"
		}, "Generated first parameters is not as expected");

	});

});
