"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const { checkNonEmptyObject } = require(join(__dirname, "..", "lib", "main.js"));

// tests

describe("checkers / RangeError / checkNonEmptyObject", () => {

	describe("async", () => {

		it("should test with wrong type data", (done) => {

			checkNonEmptyObject("test", "test").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with empty data", (done) => {

			checkNonEmptyObject("test", {}).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with valid data", () => {

			return checkNonEmptyObject("test", {
				"test": "test"
			});

		});

	});

	describe("sync", () => {

		it("should test with wrong type data", () => {

			const err = checkNonEmptyObject("test", "test", false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should test with empty data", () => {

			const err = checkNonEmptyObject("test", {}, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

		});

		it("should test with valid data", () => {

			const err = checkNonEmptyObject("test", {
				"test": "test"
			}, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

	});

});
