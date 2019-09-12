"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// utils
		const extractPath = require(join(__dirname, "..", "lib", "utils", "extractFromDescriptor", "extractPath.js"));

// consts

	const PATHS = {
		"/pluginname/api/test": null,
		"/pluginname/api/test/{test}": null,
		"/pluginname/api/test/{test1}/{test2}": null,
		"/pluginname/api/test/{test1}/{test2}/test2": null
	};

// tests

describe("Server / requests / extractPath", () => {

	it("should test without paths", () => {

		const path = extractPath(null, "/pluginname/api/test");

		strictEqual(typeof path, "string", "Generated path is not as expected");
		strictEqual(path, "", "Generated path is not as expected");

	});

	it("should test unknown path", () => {

		const path = extractPath(PATHS, "/plugincqscqscqscqsz");

		strictEqual(typeof path, "string", "Generated path is not as expected");
		strictEqual(path, "", "Generated path is not as expected");

	});

	it("should test unknown path with var", () => {

		const path = extractPath(PATHS, "/pluginname/api/cqcsqscqs/{test}");

		strictEqual(typeof path, "string", "Generated path is not as expected");
		strictEqual(path, "", "Generated path is not as expected");

	});

	it("should extract classic path", () => {

		const path = extractPath(PATHS, "/pluginname/api/test");

		strictEqual(typeof path, "string", "Generated path is not as expected");
		strictEqual(path, "/pluginname/api/test", "Generated path is not as expected");

	});

	it("should extract path with one var", () => {

		const path = extractPath(PATHS, "/pluginname/api/test/1");

		strictEqual(typeof path, "string", "Generated path is not as expected");
		strictEqual(path, "/pluginname/api/test/{test}", "Generated path is not as expected");

	});

	it("should extract path with two vars", () => {

		const path = extractPath(PATHS, "/pluginname/api/test/1/2");

		strictEqual(typeof path, "string", "Generated path is not as expected");
		strictEqual(path, "/pluginname/api/test/{test1}/{test2}", "Generated path is not as expected");

	});

	it("should extract path with two vars and an end", () => {

		const path = extractPath(PATHS, "/pluginname/api/test/1/2/test2");

		strictEqual(typeof path, "string", "Generated path is not as expected");
		strictEqual(path, "/pluginname/api/test/{test1}/{test2}/test2", "Generated path is not as expected");

	});

});
