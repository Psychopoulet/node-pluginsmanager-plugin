"use strict";

// deps

	// natives
	const { join } = require("path");
	const { deepStrictEqual, strictEqual } = require("assert");

	// locals

		// plugin
		const extractUrlParams = require(join(
			__dirname, "..", "lib", "utils", "checkParameters", "extractFromDescriptor", "extractUrlParams.js"
		));

// tests

describe("Mediator / checkParameters / extractUrlParams / parameters", () => {

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

	it("should test valid parameters", () => {

		const parameters = extractUrlParams([
			{
				"name": "test",
				"in": "query",
				"schema": {
					"type": "string"
				}
			}
		]);

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 1, "Generated parameters length is not as expected");

		strictEqual(typeof parameters[0], "object", "Generated parameters is not as expected");
		deepStrictEqual(parameters[0], {
			"name": "test",
			"type": "string",
			"required": false,
			"in": "query"
		}, "Generated parameters is not as expected");

	});

	it("should test valid required parameters", () => {

		const parameters = extractUrlParams([
			{
				"name": "test",
				"in": "path",
				"required": true,
				"schema": {
					"type": "string"
				}
			}
		]);

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 1, "Generated parameters length is not as expected");

		strictEqual(typeof parameters[0], "object", "Generated parameters is not as expected");
		deepStrictEqual(parameters[0], {
			"name": "test",
			"type": "string",
			"required": true,
			"in": "path"
		}, "Generated parameters is not as expected");

	});

	it("should test param with components", () => {

		const parameters = extractUrlParams([
			{
				"$ref": "#/components/parameters/url-param"
			}
		], {
			"parameters": {
				"url-param": {
					"name": "url-param",
					"in": "path",
					"required": true,
					"schema": {
						"type": "string"
					}
				}
			}
		});

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 1, "Generated parameters length is not as expected");

		deepStrictEqual(parameters[0], {
			"name": "url-param",
			"required": true,
			"type": "string",
			"in": "path"
		}, "Generated first parameters is not as expected");

	});

});
