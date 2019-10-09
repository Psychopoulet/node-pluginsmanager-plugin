"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const { checkArrayLengthBetween } = require(join(__dirname, "..", "lib", "main.js"));

// tests

describe("checkers / RangeError / checkArrayLengthBetween", () => {

	describe("async", () => {

		it("should test with wrong type data", (done) => {

			checkArrayLengthBetween("test", {}, 2, 3).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong type min", (done) => {

			checkArrayLengthBetween("test", "test", false, 3).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong type max", (done) => {

			checkArrayLengthBetween("test", "test", 2, false).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong min", (done) => {

			checkArrayLengthBetween("test", [ 1 ], 2, 3).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong max", (done) => {

			checkArrayLengthBetween("test", [ 1, 2, 3, 4 ], 2, 3).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with valid data", () => {

			return checkArrayLengthBetween("test", [ 1, 2, 3 ], 2, 3);

		});

	});

	describe("sync", () => {

		it("should test with wrong type data", () => {

			const err = checkArrayLengthBetween("test", {}, 2, 3, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with wrong type min", () => {

			const err = checkArrayLengthBetween("test", "test", false, 3, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with wrong type max", () => {

			const err = checkArrayLengthBetween("test", "test", 2, false, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with wrong min", () => {

			const err = checkArrayLengthBetween("test", [ 1 ], 2, 3, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

		});

		it("should test with wrong max", () => {

			const err = checkArrayLengthBetween("test", [ 1, 2, 3, 4 ], 2, 3, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

		});

		it("should test with valid data", () => {

			const err = checkArrayLengthBetween("test", [ 1, 2, 3 ], 2, 3, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

	});

});
