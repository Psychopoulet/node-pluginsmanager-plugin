"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const { checkExists } = require(join(__dirname, "..", "lib", "main.js"));

// tests

describe("checkers / ReferenceError / checkExists", () => {

	describe("async", () => {

		it("should test with missing data", (done) => {

			checkExists("test").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with valid data", () => {
			return checkExists("test", "test");
		});

	});

	describe("sync", () => {

		it("should test with missing data", () => {

			const test = {};
			const err = checkExists("test", test.test, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

		});

		it("should test with valid data", () => {

			const test = {
				"test": true
			};
			const err = checkExists("test", test.test, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

	});

});
