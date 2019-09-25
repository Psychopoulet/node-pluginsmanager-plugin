"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const pathsSpaces = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor", "pathsSpaces.js"
		));

// consts

	const DESCRIPTOR_BASIC = require(join(
		__dirname, "utils", "DescriptorUser", "DescriptorBasic.js"
	));

// tests

describe("DescriptorUser / checkDescriptor / pathsSpaces", () => {

	it("should check with path which contains space", (done) => {

		pathsSpaces({
			...DESCRIPTOR_BASIC,
			"paths": {
				"/acaozecnzoejcn/ test/s": {
					"get": {
						"operationId": "test"
					}
				}
			}
		}).then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof Error, true, "Generated error is not a Error instance");

			done();

		});

	});

	it("should check valid data", () => {

		return pathsSpaces({
			...DESCRIPTOR_BASIC,
			"paths": {
				"/acaozecnzoejcn/test/s": {
					"get": {
						"operationId": "test"
					}
				}
			}
		});

	});

});
