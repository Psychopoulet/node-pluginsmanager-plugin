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

	describe("async", () => {

		it("should check wrong data type", (done) => {

			checkRef("[get]/test/{path-test}--test", false).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should check invalid data", (done) => {

			checkRef("[get]/test/{path-test}--test", "test").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not as expected");

				done();

			});

		});

		it("should check valid schemas data", () => {
			return checkRef("[get]/test/{path-test}--test", "#/components/schemas/test");
		});

		it("should check valid parameters data", () => {
			return checkRef("[get]/test/{path-test}--test", "#/components/parameters/test");
		});

	});

	describe("sync", () => {

		it("should check wrong data type", () => {

			const err = checkRef("[get]/test/{path-test}--test", false, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should check invalid data", () => {

			const err = checkRef("[get]/test/{path-test}--test", "test", false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof Error, true, "Generated error is not as expected");

		});

		it("should check valid schemas data", () => {

			const err = checkRef("[get]/test/{path-test}--test", "#/components/schemas/test", false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not null");

		});

		it("should check valid parameters data", () => {

			const err = checkRef("[get]/test/{path-test}--test", "#/components/parameters/test", false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not null");

		});

	});

});
