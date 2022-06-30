"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const { checkArrayLengthBetween, checkArrayLengthBetweenSync } = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

// tests

describe("checkers / RangeError / checkArrayLengthBetween", () => {

	describe("async", () => {

		it("should test with missing data", (done) => {

			checkArrayLengthBetween("test").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with missing min", (done) => {

			checkArrayLengthBetween("test", []).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with missing max", (done) => {

			checkArrayLengthBetween("test", [], 0).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

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

			checkArrayLengthBetween("test", [], false, 3).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong type max", (done) => {

			checkArrayLengthBetween("test", [], 2, false).then(() => {
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

		it("should test with missing data", () => {

			const err = checkArrayLengthBetweenSync("test");

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

		});

		it("should test with missing min", () => {

			const err = checkArrayLengthBetweenSync("test", []);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

		});

		it("should test with missing max", () => {

			const err = checkArrayLengthBetweenSync("test", [], 0);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

		});

		it("should test with wrong type data", () => {

			const err = checkArrayLengthBetweenSync("test", {}, 2, 3);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with wrong type min", () => {

			const err = checkArrayLengthBetweenSync("test", [], false, 3);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with wrong type max", () => {

			const err = checkArrayLengthBetweenSync("test", [], 2, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with wrong min", () => {

			const err = checkArrayLengthBetweenSync("test", [ 1 ], 2, 3);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

		});

		it("should test with wrong max", () => {

			const err = checkArrayLengthBetweenSync("test", [ 1, 2, 3, 4 ], 2, 3);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

		});

		it("should test with valid data", () => {

			const err = checkArrayLengthBetweenSync("test", [ 1, 2, 3 ], 2, 3);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

	});

});
