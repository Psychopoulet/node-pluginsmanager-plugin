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

describe("DescriptorUser / checkDescriptor / url-parameters", () => {

	it("should check non-defined existant path parameter", (done) => {

		parameters({
			...DESCRIPTOR_BASIC,
			"paths": {
				"/test/{path-test}": {
					"get": {
						"operationId": "test"
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

	it("should check non-defined existant path parameter 2", (done) => {

		parameters({
			...DESCRIPTOR_BASIC,
			"paths": {
				"/test/{id}": {
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

	it("should check with no required data", (done) => {

		parameters({
			...DESCRIPTOR_BASIC,
			"paths": {
				"/test/{path-test}": {
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

	it("should check wrong-formated path parameter (with number)", (done) => {

		parameters({
			...DESCRIPTOR_BASIC,
			"paths": {
				"/test/{id5}": {
					"get": {
						"operationId": "test",
						"parameters": [
							{
								"name": "id5",
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
			strictEqual(err instanceof Error, true, "Generated error is not a Error instance");

			done();

		});

	});

	it("should check wrong-formated path parameter (without \"}\")", (done) => {

		parameters({
			...DESCRIPTOR_BASIC,
			"paths": {
				"/test/{path-test": {
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
			strictEqual(err instanceof Error, true, "Generated error is not a Error instance");

			done();

		});

	});

	it("should check with wrong type", (done) => {

		parameters({
			...DESCRIPTOR_BASIC,
			"paths": {
				"/test/{path-test}": {
					"get": {
						"operationId": "test",
						"parameters": [
							{
								"name": "path-test",
								"in": "path",
								"required": true,
								"schema": {
									"type": "object",
									"properties": {
										"test": {
											"type": "string"
										}
									}
								}
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

		return parameters({
			...DESCRIPTOR_BASIC,
			"paths": {
				"/test/{path-test}": {
					"get": {
						"operationId": "test",
						"parameters": [
							{
								"name": "path-test",
								"in": "path",
								"required": true,
								"schema": {
									"type": "string"
								}
							}
						]
					}
				}
			}
		});

	});

});
