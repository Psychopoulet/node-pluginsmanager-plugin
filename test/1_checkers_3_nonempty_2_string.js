"use strict";

// deps

	// natives
	const { strictEqual, ok } = require("node:assert");
	const { join } = require("node:path");

	// locals
	const { checkNonEmptyString, checkNonEmptyStringSync } = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

// tests

describe("checkers / RangeError / checkNonEmptyString", () => {

	describe("async", () => {

		it("should test with missing data", (done) => {

			checkNonEmptyString("test").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				ok(err instanceof ReferenceError, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong type data", (done) => {

			checkNonEmptyString("test", false).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				ok(err instanceof TypeError, "Generated error is not as expected");

				done();

			});

		});

		it("should test with empty data", (done) => {

			checkNonEmptyString("test", "").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				ok(err instanceof RangeError, "Generated error is not as expected");

				done();

			});

		});

		it("should test with valid data", () => {
			return checkNonEmptyString("test", "test");
		});

	});

	describe("sync", () => {

		it("should test with missing data", () => {

			const err = checkNonEmptyStringSync("test");

			strictEqual(typeof err, "object", "Generated error is not an object");
			ok(err instanceof ReferenceError, "Generated error is not as expected");

		});

		it("should test with wrong type data", () => {

			const err = checkNonEmptyStringSync("test", false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			ok(err instanceof TypeError, "Generated error is not as expected");

		});

		it("should test with empty data", () => {

			const err = checkNonEmptyStringSync("test", "");

			strictEqual(typeof err, "object", "Generated error is not an object");
			ok(err instanceof RangeError, "Generated error is not as expected");

		});

		it("should test with valid data", () => {

			const err = checkNonEmptyStringSync("test", "test");

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

	});

});
