"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const { checkNumber, checkNumberSync } = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

// tests

describe("checkers / TypeError / checkNumber", () => {

	describe("async", () => {

		it("should test with missing data", (done) => {

			checkNumber("test").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong type data", (done) => {

			checkNumber("test", "test").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with integer data", () => {
			return checkNumber("test", 1);
		});

		it("should test with float data", () => {
			return checkNumber("test", 1.1);
		});

	});

	describe("sync", () => {

		it("should test with missing data", () => {

			const err = checkNumberSync("test");

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

		});

		it("should test with wrong type data", () => {

			const err = checkNumberSync("test", "test");

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with integer data", () => {

			const err = checkNumberSync("test", 1);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

		it("should test with float data", () => {

			const err = checkNumberSync("test", 1.1);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

	});

});
