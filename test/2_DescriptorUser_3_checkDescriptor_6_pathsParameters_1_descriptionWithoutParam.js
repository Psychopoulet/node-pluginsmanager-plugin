"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const descriptionWithoutParam = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor", "pathsParameters", "descriptionWithoutParam.js"
		));

// consts

	const DESCRIPTOR_BASIC = require(join(
		__dirname, "utils", "DescriptorUser", "DescriptorBasic.js"
	));

// tests

describe("DescriptorUser / checkDescriptor / pathsParameters / descriptionWithoutParam", () => {

	it("should check inexistant defined path parameter", (done) => {

		descriptionWithoutParam({
			...DESCRIPTOR_BASIC,
			"paths": {
				"/test": {
					"get": {
						"operationId": "test",
						"parameters": [
							{
								"name": "path-test",
								"in": "path"
							}
						]
					}
				}
			}
		}).then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof ReferenceError, true, "Generated error is not a Error instance");

			done();

		});

	});

});
