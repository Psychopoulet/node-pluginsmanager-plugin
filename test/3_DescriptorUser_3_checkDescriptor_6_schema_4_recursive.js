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

describe("DescriptorUser / checkDescriptor / checkSchema / recursive", () => {

	it("should test missing properties", () => {

		const err = checkSchema("/test/{url-param}", "get", "url-param", {
			"url-param": {
				"schema": {
					"type": "object"
				}
			}
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

	});

	it("should test wrong type properties", () => {

		const err = checkSchema("/test/{url-param}", "get", "url-param", {
			"type": "object",
			"properties": false
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

	});

	it("should test empty properties", () => {

		const err = checkSchema("/test/{url-param}", "get", "url-param", {
			"type": "object",
			"properties": {}
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

	});

	it("should test wrong type recursive data", () => {

		const err = checkSchema("/test/{url-param}", "get", "url-param", {
			"type": "object",
			"properties": {
				"test": false
			}
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

	});

	it("should test empty recursive data", () => {

		const err = checkSchema("/test/{url-param}", "get", "url-param", {
			"type": "object",
			"properties": {
				"test": {}
			}
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

	});

	it("should test wrong type recursive data", () => {

		const err = checkSchema("/test/{url-param}", "get", "url-param", {
			"type": "object",
			"properties": {
				"test": {
					"type": false
				}
			}
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

	});

	it("should test param full valid", () => {

		const err = checkSchema("/test/{url-param}", "get", "url-param", {
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

});
