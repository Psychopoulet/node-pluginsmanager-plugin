"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const { checkObjectLengthBetween } = require(join(__dirname, "..", "lib", "main.js"));

// consts

	const VALID_OBJECT = {
		"test1": 1,
		"test2": 2,
		"test3": 3
	};

// tests

describe("checkers / RangeError / checkObjectLengthBetween", () => {

	describe("async", () => {

		it("should test with wrong type data", (done) => {

			checkObjectLengthBetween("test", false, 2, 3).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong type min", (done) => {

			checkObjectLengthBetween("test", VALID_OBJECT, false, 3).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong type max", (done) => {

			checkObjectLengthBetween("test", VALID_OBJECT, 2, false).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong min", (done) => {

			checkObjectLengthBetween("test", {
				"test1": 1
			}, 2, 3).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong max", (done) => {

			checkObjectLengthBetween("test", {
				...VALID_OBJECT,
				"test4": 4
			}, 2, 3).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with valid data", () => {

			return checkObjectLengthBetween("test", VALID_OBJECT, 2, 3);

		});

	});

	describe("sync", () => {

		it("should test with wrong type data", () => {

			const err = checkObjectLengthBetween("test", false, 2, 3, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with wrong type min", () => {

			const err = checkObjectLengthBetween("test", VALID_OBJECT, false, 3, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with wrong type max", () => {

			const err = checkObjectLengthBetween("test", VALID_OBJECT, 2, false, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with wrong min", () => {

			const err = checkObjectLengthBetween("test", {
				"test1": 1
			}, 2, 3, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

		});

		it("should test with wrong max", () => {

			const err = checkObjectLengthBetween("test", {
				...VALID_OBJECT,
				"test4": 4
			}, 2, 3, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

		});

		it("should test with valid data", () => {

			const err = checkObjectLengthBetween("test", VALID_OBJECT, 2, 3, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

	});

});
