"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const checkRef = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor",
			"properties", "checkRef.js"
		));

// tests

describe("DescriptorUser / checkDescriptor / checkRef", () => {

	it("should check missing data", () => {

		const err = checkRef("/test/{path-test}", "get");

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

	});

	it("should check wrong data type", () => {

		const err = checkRef("/test/{path-test}", "get", false);

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

	});

	it("should check empty data", () => {

		const err = checkRef("/test/{path-test}", "get", "");

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

	});

	it("should check invalid data", () => {

		const err = checkRef("/test/{path-test}", "get", "test");

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof Error, true, "Generated error is not as expected");

	});

	it("should check valid schemas data", () => {

		const err = checkRef("/test/{path-test}", "get", "#/components/schemas/test");

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err, null, "Generated error is not null");

	});

	it("should check valid parameters data", () => {

		const err = checkRef("/test/{path-test}", "get", "#/components/parameters/test");

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err, null, "Generated error is not null");

	});

});
