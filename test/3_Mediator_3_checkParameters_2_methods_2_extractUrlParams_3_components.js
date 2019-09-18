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

describe("Mediator / checkParameters / extractUrlParams / with components", () => {

	it("should test wrong formated ref", () => {

		const parameters = extractUrlParams([
			{
				"$ref": "ezfvsqervsdrv"
			}
		], {
			"url-param": {
				"name": "url-param",
				"required": true,
				"schema": {
					"type": "string"
				}
			}
		});

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

	});

	it("should test empty components", () => {

		const parameters = extractUrlParams([
			{
				"$ref": "#/components/parameters/url-param"
			}
		]);

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

	});

	it("should test missing ref", () => {

		const parameters = extractUrlParams([
			{
				"$ref": "#/components/parameters/url-param-string"
			}
		], {
			"url-param": {
				"name": "url-param",
				"required": true,
				"schema": {
					"type": "string"
				}
			}
		});

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

	});

	it("should test param full valid", () => {

		const parameters = extractUrlParams([
			{
				"$ref": "#/components/parameters/url-param"
			}
		], {
			"url-param": {
				"name": "url-param",
				"required": true,
				"schema": {
					"type": "string"
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
			"in": "unknown"
		}, "Generated first parameters is not as expected");

	});

});
