"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const checkType = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor",
			"properties", "checkType.js"
		));

// tests

describe("DescriptorUser / checkDescriptor / checkType", () => {

	it("should check missing data", () => {

		const err = checkType("/test/{path-test}", "get", "path-test");

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

	});

	it("should check wrong data type", () => {

		const err = checkType("/test/{path-test}", "get", "path-test", false);

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

	});

	it("should check empty data", () => {

		const err = checkType("/test/{path-test}", "get", "path-test", "");

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

	});

	it("should check invalid data", () => {

		const err = checkType("/test/{path-test}", "get", "path-test", "test");

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

	});

	it("should check valid data", () => {

		const err = checkType("/test/{path-test}", "get", "path-test", "string");

		strictEqual(typeof err, "object", "Generated error is not an object");
		strictEqual(err, null, "Generated error is not null");

	});

});
