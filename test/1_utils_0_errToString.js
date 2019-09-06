"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const errToString = require(join(__dirname, "..", "lib", "utils", "errToString.js"));

// tests

describe("errToString", () => {

	it("should test with missing data", () => {
		strictEqual(errToString(), "", "generated data is not as expected");
	});

	it("should test with wrong data", () => {
		strictEqual(errToString(false), "", "generated data is not as expected");
	});

	it("should test with empty data", () => {
		strictEqual(errToString(""), "", "generated data is not as expected");
	});

	it("should test with string data", () => {
		strictEqual(errToString("test"), "test", "generated data is not as expected");
	});

	it("should test with object data", () => {

		strictEqual(errToString({
			"message": "test"
		}), "test", "generated data is not as expected");

	});

	it("should test with Error data", () => {
		strictEqual(errToString(new Error("test")), "test", "generated data is not as expected");
	});

});
