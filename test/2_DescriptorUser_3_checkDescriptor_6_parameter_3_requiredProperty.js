"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const requiredProperty = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor",
			"parameters", "parameterDescription", "requiredProperty.js"
		));

// tests

describe("DescriptorUser / checkDescriptor / parameters / parameterDescription / requiredProperty", () => {

	it("should check missing \"required\" parameter", () => {

		const err = requiredProperty("/test/{path-test}", "get", {
			"name": "path-test",
			"in": "path"
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

	});

	it("should check wrong \"required\" parameter", () => {

		const err = requiredProperty("/test/{path-test}", "get", {
			"name": "path-test",
			"in": "path",
			"required": "test"
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

	});

	it("should check invalid \"required\" parameter", () => {

		const err = requiredProperty("/test/{path-test}", "get", {
			"name": "path-test",
			"in": "path",
			"required": false
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof Error, true, "Generated error is not as expected");

	});

	it("should check valid data", () => {

		const err = requiredProperty("/test/{path-test}", "get", {
			"name": "path-test",
			"in": "path",
			"required": true
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err, null, "Generated error is not null");

	});

});
