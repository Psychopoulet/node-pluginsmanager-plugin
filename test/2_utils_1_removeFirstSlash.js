/*
	eslint-disable no-undefined
*/

"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");

	// locals
	const removeFirstSlash = require(join(__dirname, "..", "lib", "utils", "removeFirstSlash.js"));

// tests

describe("utils / removeFirstSlash", () => {

	it("should test with missing data", () => {
		strictEqual(removeFirstSlash(), "undefined", "generated data is not as expected");
	});

	it("should test with wrong data", () => {
		strictEqual(removeFirstSlash(false), "false", "generated data is not as expected");
	});

	it("should test with empty data", () => {
		strictEqual(removeFirstSlash(""), "", "generated data is not as expected");
	});

	it("should test with string data", () => {
		strictEqual(removeFirstSlash("test"), "test", "generated data is not as expected");
	});

	it("should test with path data", () => {
		strictEqual(removeFirstSlash("/test/test"), "test/test", "generated data is not as expected");
	});

	it("should test with path data without first slash", () => {
		strictEqual(removeFirstSlash("test/test"), "test/test", "generated data is not as expected");
	});

});
