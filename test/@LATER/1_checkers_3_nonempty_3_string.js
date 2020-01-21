"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const { checkNonEmptyString } = require(join(__dirname, "..", "lib", "main.js"));

// tests

describe("checkers / RangeError / checkNonEmptyString", () => {

	describe("async", () => {

		it("should test with wrong type data", (done) => {

			checkNonEmptyString("test", false).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with empty data", (done) => {

			checkNonEmptyString("test", "").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with valid data", () => {
			return checkNonEmptyString("test", "test");
		});

	});

	describe("sync", () => {

		it("should test with wrong type data", () => {

			const err = checkNonEmptyString("test", false, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with empty data", () => {

			const err = checkNonEmptyString("test", "", false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

		});

		it("should test with valid data", () => {

			const err = checkNonEmptyString("test", "test", false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

	});

});
