"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const { checkIntegerBetween } = require(join(__dirname, "..", "lib", "main.js"));

// tests

describe("checkers / RangeError / checkIntegerBetween", () => {

	describe("async", () => {

		it("should test with wrong type data", (done) => {

			checkIntegerBetween("test", false, 1, 5).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong type min", (done) => {

			checkIntegerBetween("test", 2, false, 5).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong type max", (done) => {

			checkIntegerBetween("test", 2, 1, false).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong min", (done) => {

			checkIntegerBetween("test", 0, 1, 5).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong max", (done) => {

			checkIntegerBetween("test", 6, 1, 5).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with valid data", () => {

			return checkIntegerBetween("test", 2, 1, 5);

		});

	});

	describe("sync", () => {

		it("should test with wrong type data", () => {

			const err = checkIntegerBetween("test", false, 1, 5, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with wrong type min", () => {

			const err = checkIntegerBetween("test", 2, false, 5, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with wrong type max", () => {

			const err = checkIntegerBetween("test", 2, 1, false, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with wrong min", () => {

			const err = checkIntegerBetween("test", 0, 1, 5, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

		});

		it("should test with wrong max", () => {

			const err = checkIntegerBetween("test", 6, 1, 5, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

		});

		it("should test with valid data", () => {

			const err = checkIntegerBetween("test", 2, 1, 5, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

	});

});
