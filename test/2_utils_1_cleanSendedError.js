"use strict";

// deps

	// natives
	const { strictEqual, deepStrictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const cleanSendedError = require(join(__dirname, "..", "lib", "cjs", "utils", "cleanSendedError.js"));

// tests

describe("utils / cleanSendedError", () => {

	it("should test null", () => {
		strictEqual(cleanSendedError.default(null), null);
	});

	it("should test string", () => {
		strictEqual(cleanSendedError.default("ceci est une string"), "ceci est une string");
	});

	it("should test pure error", () => {
		strictEqual(cleanSendedError.default(new Error("ceci est une Error")), "ceci est une Error");
		strictEqual(cleanSendedError.default(new Error("ceci est une RangeError")), "ceci est une RangeError");
	});

	it("should test code/message", () => {

		deepStrictEqual(cleanSendedError.default({
			"code": "AADZAZDAZ",
			"message": "ceci est une string"
		}), {
			"code": "AADZAZDAZ",
			"message": "ceci est une string"
		});

		deepStrictEqual(cleanSendedError.default({
			"code": "AADZAZDAZ",
			"message": new Error("ceci est une Error")
		}), {
			"code": "AADZAZDAZ",
			"message": "ceci est une Error"
		});

	});

	it("should test error code/message", () => {

		deepStrictEqual(cleanSendedError.default({
			"error": {
				"code": "AADZAZDAZ",
				"message": "ceci est une string"
			}
		}), {
			"error": {
				"code": "AADZAZDAZ",
				"message": "ceci est une string"
			}
		});

		deepStrictEqual(cleanSendedError.default({
			"error": {
				"code": "AADZAZDAZ",
				"message": new Error("ceci est une Error")
			}
		}), {
			"error": {
				"code": "AADZAZDAZ",
				"message": "ceci est une Error"
			}
		});

		deepStrictEqual(cleanSendedError.default({
			"err": {
				"code": "AADZAZDAZ",
				"message": "ceci est une string"
			}
		}), {
			"err": {
				"code": "AADZAZDAZ",
				"message": "ceci est une string"
			}
		});

		deepStrictEqual(cleanSendedError.default({
			"err": {
				"code": "AADZAZDAZ",
				"message": new Error("ceci est une Error")
			}
		}), {
			"err": {
				"code": "AADZAZDAZ",
				"message": "ceci est une Error"
			}
		});

	});

});
