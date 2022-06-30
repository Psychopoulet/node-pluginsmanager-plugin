"use strict";

// deps

	// natives
	const { strictEqual, deepStrictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const cleanSendedError = require(join(__dirname, "..", "lib", "cjs", "utils", "cleanSendedError.js"));

// tests

describe("utils / cleanSendedError", () => {

	it("should test string", () => {
		strictEqual(cleanSendedError.default("ceci est une string"), "ceci est une string", "generated data is not as expected");
	});

	it("should test pure error", () => {
		strictEqual(cleanSendedError.default(new Error("ceci est une Error")), "ceci est une Error", "generated data is not as expected");
		strictEqual(cleanSendedError.default(new Error("ceci est une RangeError")), "ceci est une RangeError", "generated data is not as expected");
	});

	it("should test code/message", () => {

		deepStrictEqual(cleanSendedError.default({
			"code": "AADZAZDAZ",
			"message": "ceci est une string"
		}), "ceci est une string", "generated data is not as expected");

		deepStrictEqual(cleanSendedError.default({
			"code": "AADZAZDAZ",
			"message": new Error("ceci est une Error")
		}), "ceci est une Error", "generated data is not as expected");

	});

	it("should test error code/message", () => {

		deepStrictEqual(cleanSendedError.default({
			"error": {
				"code": "AADZAZDAZ",
				"message": "ceci est une string"
			}
		}), "ceci est une string", "generated data is not as expected");

		deepStrictEqual(cleanSendedError.default({
			"error": {
				"code": "AADZAZDAZ",
				"message": new Error("ceci est une Error")
			}
		}), "ceci est une Error", "generated data is not as expected");

		deepStrictEqual(cleanSendedError.default({
			"err": {
				"code": "AADZAZDAZ",
				"message": "ceci est une string"
			}
		}), "ceci est une string", "generated data is not as expected");

	});

});
