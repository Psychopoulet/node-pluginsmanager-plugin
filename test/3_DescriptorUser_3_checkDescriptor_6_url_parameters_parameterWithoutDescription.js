"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const parameterWithoutDescription = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor",
			"url-parameters", "parameterWithoutDescription.js"
		));

// tests

describe("DescriptorUser / checkDescriptor / url-parameters / parameterWithoutDescription", () => {

	it("should check non-defined existant path parameter", () => {

		const err = parameterWithoutDescription("/test/{id}", "get");

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

	});

	it("should check non-defined existant path parameter 2", () => {

		const err = parameterWithoutDescription("/test/{id}", "get", [
			{
				"name": "path-test",
				"in": "path"
			}
		]);

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

	});

	it("should check with no required data", () => {

		const err = parameterWithoutDescription("/test/{path-test}", "get", [
			{
				"name": "path-test",
				"in": "path"
			}
		]);

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

	});

	it("should check wrong-formated path parameter (with number)", () => {

		const err = parameterWithoutDescription("/test/{id5}", "get", [
			{
				"name": "id5",
				"in": "path"
			}
		]);

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof Error, true, "Generated error is not as expected");

	});

	it("should check wrong-formated path parameter (without \"}\")", () => {

		const err = parameterWithoutDescription("/test/{path-test", "get", [
			{
				"name": "path-test",
				"in": "path"
			}
		]);

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof Error, true, "Generated error is not as expected");

	});

	it("should check valid data", () => {

		const err = parameterWithoutDescription("/test/{path-test}", "get", [
			{
				"name": "path-test",
				"in": "path",
				"required": true
			}
		]);

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err, null, "Generated error is not null");

	});

});
