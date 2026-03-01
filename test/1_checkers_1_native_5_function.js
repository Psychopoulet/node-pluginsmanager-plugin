"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const { checkFunction, checkFunctionSync } = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

// tests

describe("checkers / TypeError / checkFunction", () => {

	describe("async", () => {

		it("should test with missing data", (done) => {

			checkFunction("test").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong type data", (done) => {

			checkFunction("test", "test").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with valid data", () => {

			return checkFunction("test", () => {
				// nothing to do here
			});

		});

	});

	describe("sync", () => {

		it("should test with missing data", () => {

			const err = checkFunctionSync("test");

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

		});

		it("should test with wrong type data", () => {

			const err = checkFunctionSync("test", "test");

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with valid data", () => {

			const err = checkFunctionSync("test", () => {
				// nothing to do here
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

	});

});
