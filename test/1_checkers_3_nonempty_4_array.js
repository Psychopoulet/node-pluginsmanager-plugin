"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const { checkNonEmptyArray, checkNonEmptyArraySync } = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

// tests

describe("checkers / RangeError / checkNonEmptyArray", () => {

	describe("async", () => {

		it("should test with missing data", (done) => {

			checkNonEmptyArray("test").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong type data", (done) => {

			checkNonEmptyArray("test", "test").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with empty data", (done) => {

			checkNonEmptyArray("test", []).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with valid data", () => {
			return checkNonEmptyArray("test", [ "test" ]);
		});

	});

	describe("sync", () => {

		it("should test with missing data", () => {

			const err = checkNonEmptyArraySync("test");

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

		});

		it("should test with wrong type data", () => {

			const err = checkNonEmptyArraySync("test", "test");

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with empty data", () => {

			const err = checkNonEmptyArraySync("test", []);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

		});

		it("should test with valid data", () => {

			const err = checkNonEmptyArraySync("test", [ "test" ]);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

	});

});
