"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const extractUrlParams = require(join(
			__dirname, "..", "lib", "utils", "extractFromDescriptor", "extractUrlParams.js"
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

});
