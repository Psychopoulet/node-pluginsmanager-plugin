"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const LocalDescriptorUser = require(join(__dirname, "utils", "DescriptorUser", "LocalDescriptorUser.js"));

// consts

	const DESCRIPTOR_BASIC = require(join(
		__dirname, "utils", "DescriptorUser", "DescriptorBasic.js"
	));

	const DESCRIPTOR_WITH_PARAMS = {
		...DESCRIPTOR_BASIC,
		"components": {
			"parameters": {
				"path-param": {
					"name": "path-param",
					"in": "path",
					"description": "Entity name",
					"required": true,
					"schema": {
						"type": "string"
					}
				}
			}
		}
	};

// tests

describe("DescriptorUser / checkDescriptor / url-parameters / components", () => {

	it("should check wrong reference", (done) => {

		new LocalDescriptorUser({
			"descriptor": {
				...DESCRIPTOR_BASIC,
				"paths": {
					"/test/{path-param}": {
						"get": {
							"operationId": "test",
							"parameters": [
								{
									"$ref": false
								}
							]
						}
					}
				}
			}
		}).checkDescriptor().then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

			done();

		});

	});

	it("should check empty reference", (done) => {

		new LocalDescriptorUser({
			"descriptor": {
				...DESCRIPTOR_BASIC,
				"paths": {
					"/test/{path-param}": {
						"get": {
							"operationId": "test",
							"parameters": [
								{
									"$ref": ""
								}
							]
						}
					}
				}
			}
		}).checkDescriptor().then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

			done();

		});

	});

	it("should not alone reference", (done) => {

		new LocalDescriptorUser({
			"descriptor": {
				...DESCRIPTOR_BASIC,
				"paths": {
					"/test/{path-param}": {
						"get": {
							"operationId": "test",
							"parameters": [
								{
									"$ref": "eghreht",
									"name": "test"
								}
							]
						}
					}
				}
			}
		}).checkDescriptor().then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof Error, true, "Generated error is not as expected");

			done();

		});

	});

	it("should test wrong formate in reference", (done) => {

		new LocalDescriptorUser({
			"descriptor": {
				...DESCRIPTOR_BASIC,
				"paths": {
					"/test/{path-param}": {
						"get": {
							"operationId": "test",
							"parameters": [
								{
									"$ref": "eghreht"
								}
							]
						}
					}
				}
			}
		}).checkDescriptor().then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof Error, true, "Generated error is not as expected");

			done();

		});

	});

	it("should test valid path reference without components", (done) => {

		new LocalDescriptorUser({
			"descriptor": {
				...DESCRIPTOR_BASIC,
				"paths": {
					"/test/{path-param}": {
						"get": {
							"operationId": "test",
							"parameters": [
								{
									"$ref": "#/components/parameters/path-param"
								}
							]
						}
					}
				}
			}
		}).checkDescriptor().then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof Error, true, "Generated error is not as expected");

			done();

		});

	});

	it("should test valid path reference without parameters components", (done) => {

		new LocalDescriptorUser({
			"descriptor": {
				...DESCRIPTOR_BASIC,
				"paths": {
					"/test/{path-param}": {
						"get": {
							"operationId": "test",
							"parameters": [
								{
									"$ref": "#/components/parameters/path-param"
								}
							]
						}
					}
				},
				"components": {}
			}
		}).checkDescriptor().then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof Error, true, "Generated error is not as expected");

			done();

		});

	});

	it("should test wrong path reference", (done) => {

		new LocalDescriptorUser({
			"descriptor": {
				...DESCRIPTOR_WITH_PARAMS,
				"paths": {
					"/test/{path-param}": {
						"get": {
							"operationId": "test",
							"parameters": [
								{
									"$ref": "#/components/parameters/fczeczec"
								}
							]
						}
					}
				}
			}
		}).checkDescriptor().then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof Error, true, "Generated error is not as expected");

			done();

		});

	});

	it("should check valid data", () => {

		return new LocalDescriptorUser({
			"descriptor": {
				...DESCRIPTOR_WITH_PARAMS,
				"paths": {
					"/test/{path-param}": {
						"get": {
							"operationId": "test",
							"parameters": [
								{
									"$ref": "#/components/parameters/path-param"
								}
							]
						}
					}
				}
			}
		}).checkDescriptor();

	});

});
