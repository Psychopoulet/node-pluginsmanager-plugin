"use strict";

// deps

	// natives
	const { strictEqual, ok } = require("node:assert");
	const { join } = require("node:path");

	// locals
	const readJSONFile = require(join(__dirname, "..", "lib", "cjs", "utils", "file", "readJSONFile.js"));

// tests

describe("utils / file / readJSONFile", () => {

	it("should test with missing file", (done) => {

		readJSONFile.default().then(() => {
			done(new Error("tests does not generate error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "generated error is not as expected");
			ok(err instanceof ReferenceError, "generated error is not as expected");

			done();

		});

	});

	it("should test with wrong type file", (done) => {

		readJSONFile.default(false).then(() => {
			done(new Error("tests does not generate error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "generated error is not as expected");
			ok(err instanceof TypeError, "generated error is not as expected");

			done();

		});

	});

	it("should test with empty data", (done) => {

		readJSONFile.default("").then(() => {
			done(new Error("tests does not generate error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "generated error is not as expected");
			ok(err instanceof Error, "generated error is not as expected");

			done();

		});

	});

	it("should test with inexistant file", (done) => {

		readJSONFile.default("zrgzergzergerg").then(() => {
			done(new Error("tests does not generate error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "generated error is not as expected");
			ok(err instanceof Error, "generated error is not as expected");

			done();

		});

	});

	it("should test with rigth file", () => {

		return readJSONFile.default(join(__dirname, "..", "package.json")).then((data) => {

			strictEqual(typeof data, "object", "data is not as expected");

			return Promise.resolve();

		});

	});

});
