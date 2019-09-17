"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const nameProperty = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor",
			"pathsParameters", "parametersDescription", "nameProperty.js"
		));

// tests

describe("DescriptorUser / checkDescriptor / pathsParameters / parametersDescription / nameProperty", () => {

	it("should check missing \"in\" property for parameter", () => {

		const err = nameProperty("/test", "get", {});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

	});

	it("should check wrong \"in\" parameter", () => {

		const err = nameProperty("/test", "get", {
			"name": false
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

	});

	it("should check empty \"in\" parameter", () => {

		const err = nameProperty("/test", "get", {
			"name": ""
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

	});

	it("should check valid data", () => {

		const err = nameProperty("/test/{path-test}", "get", {
			"name": "path-test",
			"in": "path",
			"required": true
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err, null, "Generated error is not null");

	});

});
