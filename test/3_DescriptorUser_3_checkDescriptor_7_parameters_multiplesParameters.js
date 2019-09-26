"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const multiplesParameters = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor",
			"parameters", "multiplesParameters.js"
		));

// tests

describe("DescriptorUser / checkDescriptor / parameters / multiplesParameters", () => {

	it("should check with multiple parameters into descriptor", () => {

		const err = multiplesParameters("/test", "get", [
			{
				"name": "test",
				"in": "path"
			},
			{
				"name": "test",
				"in": "url"
			},
			{
				"name": "test",
				"in": "header"
			}
		]);

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof Error, true, "Generated error is not a Error instance");

	});

	it("should check valid data", () => {

		const err = multiplesParameters("/test", "get", [
			{
				"name": "path-test",
				"in": "path"
			},
			{
				"name": "url-test",
				"in": "url"
			}
		]);

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err, null, "Generated error is not null");

	});

});
