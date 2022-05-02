"use strict";

// deps

	// natives
	const { strictEqual, deepStrictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const cleanSendedError = require(join(__dirname, "..", "lib", "utils", "cleanSendedError.js"));

// tests

describe("utils / cleanSendedError", () => {

	it("should test string", () => {
		strictEqual(cleanSendedError("ceci est une string"), "ceci est une string", "generated data is not as expected");
	});

	it("should test pure error", () => {
		strictEqual(cleanSendedError(new Error("ceci est une Error")), "ceci est une Error", "generated data is not as expected");
		strictEqual(cleanSendedError(new Error("ceci est une RangeError")), "ceci est une RangeError", "generated data is not as expected");
	});

	it("should test code/message", () => {

		deepStrictEqual(cleanSendedError({
			"code": "AADZAZDAZ",
			"message": "ceci est une string"
		}), {
			"code": "AADZAZDAZ",
			"message": "ceci est une string"
		}, "generated data is not as expected");

		deepStrictEqual(cleanSendedError({
			"code": "AADZAZDAZ",
			"message": new Error("ceci est une Error")
		}), {
			"code": "AADZAZDAZ",
			"message": "ceci est une Error"
		}, "generated data is not as expected");

	});

	it("should test error code/message", () => {

		deepStrictEqual(cleanSendedError({
			"error": {
				"code": "AADZAZDAZ",
				"message": "ceci est une string"
			}
		}), {
			"error": {
				"code": "AADZAZDAZ",
				"message": "ceci est une string"
			}
		}, "generated data is not as expected");

		deepStrictEqual(cleanSendedError({
			"error": {
				"code": "AADZAZDAZ",
				"message": new Error("ceci est une Error")
			}
		}), {
			"error": {
				"code": "AADZAZDAZ",
				"message": "ceci est une Error"
			}
		}, "generated data is not as expected");

		deepStrictEqual(cleanSendedError({
			"err": {
				"code": "AADZAZDAZ",
				"message": "ceci est une string"
			}
		}), {
			"err": {
				"code": "AADZAZDAZ",
				"message": "ceci est une string"
			}
		}, "generated data is not as expected");

	});

});