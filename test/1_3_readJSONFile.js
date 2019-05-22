"use strict";

// deps

	// natives
	const assert = require("assert");
	const { join } = require("path");

	// locals
	const readJSONFile = require(join(__dirname, "..", "lib", "readJSONFile.js"));

// tests

describe("readJSONFile", () => {

	it("should test with missing file", (done) => {

		readJSONFile().then(() => {
			done(new Error("tests does not generate error"));
		}).catch((err) => {

			assert.strictEqual(typeof err, "object", "generated error is not as expected");
			assert.strictEqual(err instanceof ReferenceError, true, "generated error is not as expected");

			done();

		});

	});

	it("should test with wrong type file", (done) => {

		readJSONFile(false).then(() => {
			done(new Error("tests does not generate error"));
		}).catch((err) => {

			assert.strictEqual(typeof err, "object", "generated error is not as expected");
			assert.strictEqual(err instanceof TypeError, true, "generated error is not as expected");

			done();

		});

	});

	it("should test with empty data", (done) => {

		readJSONFile("").then(() => {
			done(new Error("tests does not generate error"));
		}).catch((err) => {

			assert.strictEqual(typeof err, "object", "generated error is not as expected");
			assert.strictEqual(err instanceof Error, true, "generated error is not as expected");

			done();

		});

	});

	it("should test with inexistant file", (done) => {

		readJSONFile("zrgzergzergerg").then(() => {
			done(new Error("tests does not generate error"));
		}).catch((err) => {

			assert.strictEqual(typeof err, "object", "generated error is not as expected");
			assert.strictEqual(err instanceof Error, true, "generated error is not as expected");

			done();

		});

	});

	it("should test with write file", () => {

		return readJSONFile(join(__dirname, "..", "package.json")).then((data) => {

			assert.strictEqual(typeof data, "object", "data is not as expected");

			return Promise.resolve();

		});

	});

});
