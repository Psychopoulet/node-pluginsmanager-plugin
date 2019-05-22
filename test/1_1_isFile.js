"use strict";

// deps

	// natives
	const assert = require("assert");
	const { join } = require("path");

	// locals
	const isFile = require(join(__dirname, "..", "lib", "isFile.js"));

// tests

describe("isFile", () => {

	it("should test with missing file", (done) => {

		isFile().then(() => {
			done(new Error("tests does not generate error"));
		}).catch((err) => {

			assert.strictEqual(typeof err, "object", "generated error is not as expected");
			assert.strictEqual(err instanceof ReferenceError, true, "generated error is not as expected");

			done();

		});

	});

	it("should test with wrong type file", (done) => {

		isFile(false).then(() => {
			done(new Error("tests does not generate error"));
		}).catch((err) => {

			assert.strictEqual(typeof err, "object", "generated error is not as expected");
			assert.strictEqual(err instanceof TypeError, true, "generated error is not as expected");

			done();

		});

	});

	it("should test with empty data", (done) => {

		isFile("").then(() => {
			done(new Error("tests does not generate error"));
		}).catch((err) => {

			assert.strictEqual(typeof err, "object", "generated error is not as expected");
			assert.strictEqual(err instanceof Error, true, "generated error is not as expected");

			done();

		});

	});

	it("should test with inexistant file", () => {

		return isFile("zrgzergzergerg").then((exists) => {

			assert.strictEqual(typeof exists, "boolean", "check is not as expected");
			assert.strictEqual(exists, false, "check is not as expected");

			return Promise.resolve();

		});

	});

	it("should test with write file", () => {

		return isFile(__filename).then((exists) => {

			assert.strictEqual(typeof exists, "boolean", "check is not as expected");
			assert.strictEqual(exists, true, "check is not as expected");

			return Promise.resolve();

		});

	});

});
