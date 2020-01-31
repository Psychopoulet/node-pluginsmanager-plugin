"use strict";

// deps

	// natives
	// const { strictEqual } = require("assert");
	// const { join } = require("path");

	// locals
	// const { extractBody } = require(join(__dirname, "..", "lib", "utils", "descriptor", "main.js"));

it.todo = function todo (title, callback) {
	return it.skip("@TODO " + title, callback);
};

// tests

describe("utils / descriptor / extractBody", () => {

	it.todo("should test with missing data", () => {
		// nothing to do here
	});

	it.todo("should test with wrong data", () => {
		// nothing to do here
	});

	it.todo("should test with GET method", () => {
		// nothing to do here
	});

	it.todo("should test with POST method but empty body", () => {
		// nothing to do here
	});

	it.todo("should test with POST method and string body", () => {
		// nothing to do here
	});

	it.todo("should test with POST method and object body", () => {
		// nothing to do here
	});

});
