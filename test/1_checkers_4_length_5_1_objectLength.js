"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const { checkObjectLength, checkObjectLengthSync } = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

// consts

	const VALID_OBJECT = {
		"test1": 1,
		"test2": 2,
		"test3": 3
	};

// tests

describe("checkers / RangeError / checkObjectLength", () => {

	describe("async", () => {

		it("should test with missing data", (done) => {

			checkObjectLength("test").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with missing length", (done) => {

			checkObjectLength("test", {}).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong type data", (done) => {

			checkObjectLength("test", false, 3).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong type length", (done) => {

			checkObjectLength("test", VALID_OBJECT, false).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong length", (done) => {

			checkObjectLength("test", {
				"test1": 1
			}, 2, 3).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with valid empty data", () => {

			return checkObjectLength("test", {}, 0);

		});

		it("should test with valid data", () => {

			return checkObjectLength("test", VALID_OBJECT, 3);

		});

	});

	describe("sync", () => {

		it("should test with missing data", () => {

			const err = checkObjectLengthSync("test");

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

		});

		it("should test with missing length", () => {

			const err = checkObjectLengthSync("test", []);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

		});

		it("should test with wrong type data", () => {

			const err = checkObjectLengthSync("test", false, 3);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with wrong type length", () => {

			const err = checkObjectLengthSync("test", VALID_OBJECT, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with wrong length", () => {

			const err = checkObjectLengthSync("test", {
				"test1": 1
			}, 3);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

		});

		it("should test with valid empty data", () => {

			const err = checkObjectLengthSync("test", {}, 0);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

		it("should test with valid data", () => {

			const err = checkObjectLengthSync("test", VALID_OBJECT, 3);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

	});

});
