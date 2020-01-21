"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const { checkNonEmptyNumber } = require(join(__dirname, "..", "lib", "main.js"));

// tests

describe("checkers / RangeError / checkNonEmptyNumber", () => {

	describe("async", () => {

		it("should test with wrong type data", (done) => {

			checkNonEmptyNumber("test", "test").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with empty data", (done) => {

			checkNonEmptyNumber("test", 0).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with valid data", () => {
			return checkNonEmptyNumber("test", 0.1);
		});

	});

	describe("sync", () => {

		it("should test with wrong type data", () => {

			const err = checkNonEmptyNumber("test", "test", false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with empty data", () => {

			const err = checkNonEmptyNumber("test", 0, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

		});

		it("should test with valid data", () => {

			const err = checkNonEmptyNumber("test", 0.1, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

	});

});
