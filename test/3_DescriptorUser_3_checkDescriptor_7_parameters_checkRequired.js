"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const checkRequired = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor",
			"parameters", "checkRequired.js"
		));

// tests

describe("DescriptorUser / checkDescriptor / parameters / checkRequired", () => {

	describe("async", () => {

		it("should check missing data", (done) => {

			checkRequired("[get]/test", "path", "test").then(() => {
				done(new Error("There is no error generated"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should check invalid data", (done) => {

			checkRequired("[get]/test", "path", false).then(() => {
				done(new Error("There is no error generated"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not as expected");

				done();

			});

		});

		it("should check invalid data", () => {

			return checkRequired("[get]/test", "path", true);

		});

	});

	describe("sync", () => {

		it("should check missing data", () => {

			const err = checkRequired("[get]/test", "path", "test", false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should check invalid data", () => {

			const err = checkRequired("[get]/test", "path", false, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof Error, true, "Generated error is not as expected");

		});

		it("should check valid data", () => {

			const err = checkRequired("[get]/test", "path", true, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not null");

		});

	});

});
