"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const inProperty = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor",
			"parameters", "parameterDescription", "inProperty.js"
		));

// tests

describe("DescriptorUser / checkDescriptor / parameters / parameterDescription / inProperty", () => {

	it("should check missing \"in\" property for parameter", () => {

		const err = inProperty("/test", "get", {
			"name": "path-test"
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

	});

	it("should check wrong \"in\" parameter", () => {

		const err = inProperty("/test", "get", {
			"name": "path-test",
			"in": false
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

	});

	it("should check invalid \"in\" parameter", () => {

		const err = inProperty("/test", "get", {
			"name": "path-test",
			"in": "test"
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

	});

	it("should check valid data", () => {

		const err = inProperty("/test/{path-test}", "get", {
			"name": "path-test",
			"in": "path",
			"required": true
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err, null, "Generated error is not null");

	});

});
