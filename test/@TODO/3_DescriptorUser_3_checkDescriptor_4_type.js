"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const checkType = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor",
			"properties", "checkType.js"
		));

// tests

describe("DescriptorUser / checkDescriptor / checkType", () => {

	describe("async", () => {

		it("should check wrong data type", (done) => {

			checkType("[get]/test/{path-test}--test", false).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should check invalid data", (done) => {

			checkType("[get]/test/{path-test}--test", "test").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should check invalid limited data", (done) => {

			checkType("[get]/test/{path-test}--test", "test", [ "string" ]).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should check limited data", () => {
			return checkType("[get]/test/{path-test}--test", "string", [ "boolean" ]);
		});

		it("should check valid data", () => {
			return checkType("[get]/test/{path-test}--test", "string");
		});

	});

	describe("sync", () => {

		it("should check wrong data type", () => {

			const err = checkType("[get]/test/{path-test}--test", false, [], false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should check invalid data", () => {

			const err = checkType("[get]/test/{path-test}--test", "test", [], false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should check invalid limited data", () => {

			const err = checkType("[get]/test/{path-test}--test", "test", [ "string" ], false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should check limited data", () => {

			const err = checkType("[get]/test/{path-test}--test", "string", [ "boolean" ], false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not null");

		});

		it("should check valid data", () => {

			const err = checkType("[get]/test/{path-test}--test", "string", [], false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not null");

		});

	});

});
