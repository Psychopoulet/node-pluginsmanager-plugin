"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const descriptionWithoutParameter = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor",
			"parameters", "parameterDescription", "descriptionWithoutParameter.js"
		));

// tests

describe("DescriptorUser / checkDescriptor / parameters / parameterDescription / descriptionWithoutParameter", () => {

	it("should check inexistant defined path parameter", () => {

		const err = descriptionWithoutParameter("/test", "get", {
			"name": "path-test",
			"in": "path"
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

	});

	it("should check valid data", () => {

		const err = descriptionWithoutParameter("/test/{path-test}", "get", {
			"name": "path-test",
			"in": "path",
			"required": true
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err, null, "Generated error is not null");

	});

});
