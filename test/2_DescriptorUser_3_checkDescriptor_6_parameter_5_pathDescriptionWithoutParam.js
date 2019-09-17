"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const pathDescriptionWithoutParam = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor",
			"parameters", "parameterDescription", "pathDescriptionWithoutParam.js"
		));

// tests

describe("DescriptorUser / checkDescriptor / parameters / parameterDescription / pathDescriptionWithoutParam", () => {

	it("should check inexistant defined path parameter", () => {

		const err = pathDescriptionWithoutParam("/test", "get", {
			"name": "path-test",
			"in": "path"
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

	});

	it("should check valid data", () => {

		const err = pathDescriptionWithoutParam("/test/{path-test}", "get", {
			"name": "path-test",
			"in": "path",
			"required": true
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err, null, "Generated error is not null");

	});

});
