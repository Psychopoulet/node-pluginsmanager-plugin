"use strict";

// deps

	// natives
	const { strictEqual, ok } = require("node:assert");
	const { join } = require("node:path");

	// locals
	const isFile = require(join(__dirname, "..", "lib", "cjs", "utils", "file", "isFile.js"));

// tests

describe("utils / file / isFile", () => {

	it("should test with missing file", (done) => {

		isFile.default().then(() => {
			done(new Error("tests does not generate error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "generated error is not as expected");
			ok(err instanceof ReferenceError, "generated error is not as expected");

			done();

		});

	});

	it("should test with wrong type file", (done) => {

		isFile.default(false).then(() => {
			done(new Error("tests does not generate error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "generated error is not as expected");
			ok(err instanceof TypeError, "generated error is not as expected");

			done();

		});

	});

	it("should test with empty data", (done) => {

		isFile.default("").then(() => {
			done(new Error("tests does not generate error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "generated error is not as expected");
			ok(err instanceof Error, "generated error is not as expected");

			done();

		});

	});

	it("should test with inexistant file", () => {

		return isFile.default("zrgzergzergerg").then((exists) => {

			strictEqual(typeof exists, "boolean", "check is not as expected");
			strictEqual(exists, false, "check is not as expected");

			return Promise.resolve();

		});

	});

	it("should test with existant file", () => {

		return isFile.default(__filename).then((exists) => {

			strictEqual(typeof exists, "boolean", "check is not as expected");
			ok(exists, "check is not as expected");

			return Promise.resolve();

		});

	});

});
