"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const checkSchema = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor",
			"schemas", "checkSchema.js"
		));

// tests

describe("DescriptorUser / checkDescriptor / checkSchema / required", () => {

	it("should check nothing", () => {

		const err = checkSchema("/test", "get", "parameters", "path-test", {
			"type": "object",
			"properties": {
				"test": {
					"type": "string"
				}
			}
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err, null, "Generated error is not as expected");

	});

	it("should check wrong type data", () => {

		const err = checkSchema("/test", "get", "parameters", "path-test", {
			"type": "object",
			"properties": {
				"test": {
					"type": "string"
				}
			},
			"required": false
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

	});

	it("should check empty data", () => {

		const err = checkSchema("/test", "get", "parameters", "path-test", {
			"type": "object",
			"properties": {
				"test": {
					"type": "string"
				}
			},
			"required": []
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

	});

	it("should check wrong type first data", () => {

		const err = checkSchema("/test", "get", "parameters", "path-test", {
			"type": "object",
			"properties": {
				"test": {
					"type": "string"
				}
			},
			"required": [ false ]
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

	});

	it("should check wrong type second data", () => {

		const err = checkSchema("/test", "get", "parameters", "path-test", {
			"type": "object",
			"properties": {
				"test": {
					"type": "string"
				}
			},
			"required": [ "test", false ]
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

	});

	it("should check unknown data", () => {

		const err = checkSchema("/test", "get", "parameters", "path-test", {
			"type": "object",
			"properties": {
				"test": {
					"type": "string"
				}
			},
			"required": [ "test2" ]
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

	});

	it("should check valid data", () => {

		const err = checkSchema("/test", "get", "parameters", "path-test", {
			"type": "object",
			"properties": {
				"test": {
					"type": "string"
				}
			},
			"required": [ "test" ]
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err, null, "Generated error is not as expected");

	});

});
