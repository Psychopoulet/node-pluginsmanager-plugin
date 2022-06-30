"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const { checkArray, checkArraySync } = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));

// tests

describe("checkers / TypeError / checkArray", () => {

	describe("async", () => {

		it("should test with missing data", (done) => {

			checkArray("test").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong type data", (done) => {

			checkArray("test", {}).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with object data", (done) => {

			checkArray("test", "test", {}).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with valid data", () => {
			return checkArray("test", []);
		});

	});

	describe("sync", () => {

		it("should test with missing data", () => {

			const err = checkArraySync("test");

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

		});

		it("should test with wrong type data", () => {

			const err = checkArraySync("test", {});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with object data", () => {

			const err = checkArraySync("test", {});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with valid data", () => {

			const err = checkArraySync("test", []);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

	});

});
