"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const typeProperty = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor",
			"parameters", "parameterDescription", "typeProperty.js"
		));

// tests

describe("DescriptorUser / checkDescriptor / parameters / parameterDescription / typeProperty", () => {

	it("should check missing \"schema\" parameter", () => {

		const err = typeProperty("/test/{path-test}", "get", {
			"name": "path-test",
			"in": "path"
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

	});

	it("should check wrong \"schema\" parameter", () => {

		const err = typeProperty("/test/{path-test}", "get", {
			"name": "path-test",
			"in": "path",
			"schema": "test"
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

	});

	it("should check missing \"schema.type\" property for parameter", () => {

		const err = typeProperty("/test", "get", {
			"name": "path-test",
			"in": "path",
			"schema": {}
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

	});

	it("should check wrong \"schema.type\" parameter", () => {

		const err = typeProperty("/test", "get", {
			"name": "path-test",
			"in": "path",
			"schema": {
				"type": false
			}
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

	});

	it("should check empty \"schema.type\" parameter", () => {

		const err = typeProperty("/test", "get", {
			"name": "path-test",
			"in": "path",
			"schema": {
				"type": ""
			}
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

	});

	it("should check invalid \"schema.type\" parameter", () => {

		const err = typeProperty("/test", "get", {
			"name": "path-test",
			"in": "path",
			"schema": {
				"type": "test"
			}
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

	});

	it("should check valid data", () => {

		const err = typeProperty("/test/{path-test}", "get", {
			"name": "path-test",
			"in": "path",
			"schema": {
				"type": "string"
			}
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err, null, "Generated error is not null");

	});

});
