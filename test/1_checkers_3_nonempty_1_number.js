"use strict";

// deps

	// natives
	const { strictEqual, ok } = require("node:assert");
	const { join } = require("node:path");

	// locals
	const { checkNonEmptyNumber, checkNonEmptyNumberSync } = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

// tests

describe("checkers / RangeError / checkNonEmptyNumber", () => {

	describe("async", () => {

		it("should test with missing data", (done) => {

			checkNonEmptyNumber("test").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				ok(err instanceof ReferenceError, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong type data", (done) => {

			checkNonEmptyNumber("test", "test").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				ok(err instanceof TypeError, "Generated error is not as expected");

				done();

			});

		});

		it("should test with empty data", (done) => {

			checkNonEmptyNumber("test", 0).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				ok(err instanceof RangeError, "Generated error is not as expected");

				done();

			});

		});

		it("should test with valid data", () => {
			return checkNonEmptyNumber("test", 0.1);
		});

	});

	describe("sync", () => {

		it("should test with missing data", () => {

			const err = checkNonEmptyNumberSync("test");

			strictEqual(typeof err, "object", "Generated error is not an object");
			ok(err instanceof ReferenceError, "Generated error is not as expected");

		});

		it("should test with wrong type data", () => {

			const err = checkNonEmptyNumberSync("test", "test");

			strictEqual(typeof err, "object", "Generated error is not an object");
			ok(err instanceof TypeError, "Generated error is not as expected");

		});

		it("should test with empty data", () => {

			const err = checkNonEmptyNumberSync("test", 0);

			strictEqual(typeof err, "object", "Generated error is not an object");
			ok(err instanceof RangeError, "Generated error is not as expected");

		});

		it("should test with valid data", () => {

			const err = checkNonEmptyNumberSync("test", 0.1);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

	});

});
