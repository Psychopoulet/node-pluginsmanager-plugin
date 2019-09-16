"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const pathsParameters = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor", "pathsParameters.js"
		));

// consts

	const DESCRIPTOR_BASIC = require(join(
		__dirname, "utils", "DescriptorUser", "DescriptorBasic.js"
	));

// tests

describe("DescriptorUser / checkDescriptor / pathsParameters", () => {

	it("should check inexistant defined path parameter", (done) => {

		pathsParameters({
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

	it("should check non-defined existant path parameter", (done) => {

		pathsParameters({
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

		pathsParameters({
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

		pathsParameters({
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

		pathsParameters({
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

		pathsParameters({
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

	it("should check valid data", () => {

		return pathsParameters({
			...DESCRIPTOR_BASIC,
			"paths": {
				"/test/{path-test}": {
					"get": {
						"operationId": "test",
						"parameters": [
							{
								"name": "path-test",
								"in": "path",
								"required": true
							}
						]
					}
				}
			}
		});

	});

});
