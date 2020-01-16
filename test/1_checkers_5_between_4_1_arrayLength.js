"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const { checkArrayLength } = require(join(__dirname, "..", "lib", "main.js"));

// tests

describe("checkers / RangeError / checkArrayLength", () => {

	describe("async", () => {

		it("should test with wrong type data", (done) => {

			checkArrayLength("test", {}, 3).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong type length", (done) => {

			checkArrayLength("test", "test", false).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong length", (done) => {

			checkArrayLength("test", [ 1 ], 3).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with valid empty data", () => {

			return checkArrayLength("test", [], 0);

		});

		it("should test with valid data", () => {

			return checkArrayLength("test", [ 1, 2, 3 ], 3);

		});

	});

	describe("sync", () => {

		it("should test with wrong type data", () => {

			const err = checkArrayLength("test", {}, 3, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with wrong type length", () => {

			const err = checkArrayLength("test", "test", false, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with wrong length", () => {

			const err = checkArrayLength("test", [ 1 ], 3, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

		});

		it("should test with valid empty data", () => {

			const err = checkArrayLength("test", [], 0, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

		it("should test with valid data", () => {

			const err = checkArrayLength("test", [ 1, 2, 3 ], 3, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

	});

});
