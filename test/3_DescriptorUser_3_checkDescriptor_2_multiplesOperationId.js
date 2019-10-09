"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const parameters = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor", "parameters.js"
		));

// consts

	const DESCRIPTOR_BASIC = require(join(
		__dirname, "utils", "DescriptorUser", "DescriptorBasic.js"
	));

// tests

describe("DescriptorUser / checkDescriptor / multiples operation ids", () => {

	it("should check with multiple operationIds into descriptor", (done) => {

		parameters({
			...DESCRIPTOR_BASIC,
			"paths": {
				"/test/test1": {
					"get": {
						"operationId": "test"
					}
				},
				"/test/test2": {
					"get": {
						"operationId": "test"
					}
				},
				"/test/test3": {
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

		return parameters({
			...DESCRIPTOR_BASIC,
			"paths": {
				"/test/test1": {
					"get": {
						"operationId": "test1"
					}
				},
				"/test/test2": {
					"get": {
						"operationId": "test2"
					}
				},
				"/test/test3": {
					"get": {
						"operationId": "test3"
					}
				}
			}
		});

	});

});
