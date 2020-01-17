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

describe("DescriptorUser / checkDescriptor / checkSchema / components", () => {

	it("should test wrong formated ref", () => {

		const err = checkSchema("/test/{url-param}", "get", "parameters", "url-param", {
			"$ref": "ezfvsqervsdrv"
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof Error, true, "Generated error is not as expected");

	});

	it("should test empty components", () => {

		const err = checkSchema("/test/{url-param}", "get", "parameters", "url-param", {
			"$ref": "#/components/parameters/url-param"
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

	});

	it("should test missing ref", () => {

		const err = checkSchema("/test/{url-param}", "get", "parameters", "url-param", {
			"$ref": "#/components/parameters/url-param-string"
		}, {
			"url-param": {
				"schema": {
					"type": "string"
				}
			}
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

	});

	it("should check not only parameter", () => {

		const err = checkSchema("/test/{url-param}", "get", "parameters", "url-param", {
			"$ref": "#/components/parameters/url-param-string",
			"test": "string"
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

	});

	it("should test param full valid", () => {

		const err = checkSchema("/test/{url-param}", "get", "parameters", "url-param", {
			"$ref": "#/components/parameters/url-param"
		}, {
			"schemas": {
				"url-param": {
					"type": "string"
				}
			}
		});

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err, null, "Generated error is not as expected");

	});

});
