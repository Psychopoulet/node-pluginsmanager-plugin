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

describe("Mediator / checkParameters / extractUrlParams / with components", () => {

	it("should test param full valid", () => {

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
