"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const pathsStart = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor", "pathsStart.js"
		));

// consts

	const DESCRIPTOR_BASIC = require(join(
		__dirname, "utils", "DescriptorUser", "DescriptorBasic.js"
	));

// tests

describe("DescriptorUser / checkDescriptor / pathsStart", () => {

	it("should check with path which does not start with slash", (done) => {

		pathsStart({
			...DESCRIPTOR_BASIC,
			"paths": {
				"test/test/s": {
					"get": {
						"operationId": "test"
					}
				}
			}
		}).then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof Error, true, "Generated error is not as expected");

			done();

		});

	});

	it("should check with path which does no start with plugin name", (done) => {

		pathsStart({
			...DESCRIPTOR_BASIC,
			"paths": {
				"/sgvsebrsdtbrdstb/test/s": {
					"get": {
						"operationId": "test"
					}
				}
			}
		}).then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof Error, true, "Generated error is not as expected");

			done();

		});

	});

	it("should check valid data", () => {

		return pathsStart({
			...DESCRIPTOR_BASIC,
			"paths": {
				"/test/test/s": {
					"get": {
						"operationId": "test"
					}
				}
			}
		});

	});

});
