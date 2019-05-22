"use strict";

// deps

	// natives
	const assert = require("assert");
	const { join } = require("path");

	// locals
	const isDirectory = require(join(__dirname, "..", "lib", "isDirectory.js"));

// tests

describe("isDirectory", () => {

	it("should test with missing directory", (done) => {

		isDirectory().then(() => {
			done(new Error("tests does not generate error"));
		}).catch((err) => {

			assert.strictEqual(typeof err, "object", "generated error is not as expected");
			assert.strictEqual(err instanceof ReferenceError, true, "generated error is not as expected");

			done();

		});

	});

	it("should test with wrong type directory", (done) => {

		isDirectory(false).then(() => {
			done(new Error("tests does not generate error"));
		}).catch((err) => {

			assert.strictEqual(typeof err, "object", "generated error is not as expected");
			assert.strictEqual(err instanceof TypeError, true, "generated error is not as expected");

			done();

		});

	});

	it("should test with empty data", (done) => {

		isDirectory("").then(() => {
			done(new Error("tests does not generate error"));
		}).catch((err) => {

			assert.strictEqual(typeof err, "object", "generated error is not as expected");
			assert.strictEqual(err instanceof Error, true, "generated error is not as expected");

			done();

		});

	});

	it("should test with inexistant directory", () => {

		return isDirectory("zrgzergzergerg").then((exists) => {

			assert.strictEqual(typeof exists, "boolean", "check is not as expected");
			assert.strictEqual(exists, false, "check is not as expected");

			return Promise.resolve();

		});

	});

	it("should test with write directory", () => {

		return isDirectory(__dirname).then((exists) => {

			assert.strictEqual(typeof exists, "boolean", "check is not as expected");
			assert.strictEqual(exists, true, "check is not as expected");

			return Promise.resolve();

		});

	});

});
