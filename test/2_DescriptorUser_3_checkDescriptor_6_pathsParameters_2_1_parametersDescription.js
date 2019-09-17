"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const parametersDescription = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor",
			"pathsParameters", "parametersDescription.js"
		));

// consts

	const DESCRIPTOR_BASIC = require(join(
		__dirname, "utils", "DescriptorUser", "DescriptorBasic.js"
	));

// tests

describe("DescriptorUser / checkDescriptor / pathsParameters / parametersDescription", () => {

	it("should check wrong parameters", (done) => {

		parametersDescription({
			...DESCRIPTOR_BASIC,
			"paths": {
				"/test": {
					"get": {
						"parameters": "test"
					}
				}
			}
		}).then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

			done();

		});

	});

	it("should check wrong nameProperty", (done) => {

		parametersDescription({
			...DESCRIPTOR_BASIC,
			"paths": {
				"/test": {
					"get": {
						"parameters": [
							{
								"name": false
							}
						]
					}
				}
			}
		}).then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

			done();

		});

	});

	it("should check wrong inProperty", (done) => {

		parametersDescription({
			...DESCRIPTOR_BASIC,
			"paths": {
				"/test": {
					"get": {
						"parameters": [
							{
								"name": "test",
								"in": false
							}
						]
					}
				}
			}
		}).then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

			done();

		});

	});

	it("should check wrong requiredProperty", (done) => {

		parametersDescription({
			...DESCRIPTOR_BASIC,
			"paths": {
				"/test": {
					"get": {
						"parameters": [
							{
								"in": "path",
								"required": false
							}
						]
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

		return parametersDescription({
			...DESCRIPTOR_BASIC,
			"paths": {
				"/test": {
					"get": {
						"parameters": []
					}
				}
			}
		});

	});

});
