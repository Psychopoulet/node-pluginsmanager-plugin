"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const checkIn = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor",
			"url-parameters", "checkIn.js"
		));

// tests

describe("DescriptorUser / checkDescriptor / url-parameters / checkIn", () => {

	describe("async", () => {

		it("should check wrong data", (done) => {

			checkIn("[get]/test", false).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should check invalid data", (done) => {

			checkIn("[get]/test", "test").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should check valid data", () => {

			return checkIn("[get]/test", "path");

		});

	});

	describe("sync", () => {

		it("should check wrong data", () => {

			const err = checkIn("[get]/test", false, false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should check invalid data", () => {

			const err = checkIn("[get]/test", "test", false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

		});

		it("should check valid data", () => {

			const err = checkIn("[get]/test", "path", false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not null");

		});

	});

});
