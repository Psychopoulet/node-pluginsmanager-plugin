"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const multiplesParameters = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor", "multiplesParameters.js"
		));

// consts

	const DESCRIPTOR_BASIC = require(join(
		__dirname, "utils", "DescriptorUser", "DescriptorBasic.js"
	));

// tests

describe("DescriptorUser / checkDescriptor / multiplesParameters", () => {

	it("should check with multiple parameters into descriptor", (done) => {

		multiplesParameters({
			...DESCRIPTOR_BASIC,
			"paths": {
				"/test": {
					"get": {
						"operationId": "test",
						"parameters": [
							{
								"name": "test",
								"in": "path"
							},
							{
								"name": "test",
								"in": "url"
							},
							{
								"name": "test",
								"in": "header"
							}
						]
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

		return multiplesParameters({
			...DESCRIPTOR_BASIC,
			"paths": {
				"/test/test1": {
					"get": {
						"operationId": "test",
						"parameters": [
							{
								"name": "path-test",
								"in": "path"
							},
							{
								"name": "url-test",
								"in": "url"
							}
						]
					}
				}
			}
		});

	});

});
