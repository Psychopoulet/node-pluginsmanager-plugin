"use strict";

// deps

	// natives
	const { join } = require("path");
	const { deepStrictEqual, strictEqual } = require("assert");

	// locals

		// plugin
		const extractBodyParams = require(join(
			__dirname, "..", "lib", "utils", "checkParameters", "extractFromDescriptor", "extractBodyParams.js"
		));

// tests

describe("Mediator / checkParameters / extractBodyParams / parameters", () => {

	describe("requestBody", () => {

		it("should test missing param", () => {

			const parameters = extractBodyParams();

			strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
			strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
			strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

		});

		it("should test wrong param", () => {

			const parameters = extractBodyParams("test");

			strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
			strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
			strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

		});

		it("should test empty param", () => {

			const parameters = extractBodyParams({});

			strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
			strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
			strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

		});

	});

	describe("requestBody.content", () => {

		it("should test missing param", () => {

			const parameters = extractBodyParams({});

			strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
			strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
			strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

		});

		it("should test null param", () => {

			const parameters = extractBodyParams({
				"content": null
			});

			strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
			strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
			strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

		});

		it("should test wrong param", () => {

			const parameters = extractBodyParams({
				"content": "test"
			});

			strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
			strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
			strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

		});

	});

	describe("contentType", () => {

		it("should test missing param", () => {

			const parameters = extractBodyParams({
				"content": {
					"application/json": {}
				}
			});

			strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
			strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
			strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

		});

		it("should test wrong param", () => {

			const parameters = extractBodyParams({
				"content": {
					"application/json": {}
				}
			}, 123);

			strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
			strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
			strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

		});

		it("should test empty param", () => {

			const parameters = extractBodyParams({
				"content": {
					"application/json": {}
				}
			}, "");

			strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
			strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
			strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

		});

	});

	describe("requestBody.content[contentType]", () => {

		it("should test missing param", () => {

			const parameters = extractBodyParams({
				"content": {}
			}, "application/json");

			strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
			strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
			strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

		});

		it("should test wrong param", () => {

			const parameters = extractBodyParams({
				"content": {
					"application/json": "test"
				}
			}, "application/json");

			strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
			strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
			strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

		});

	});

	describe("valid", () => {

		it("should test valid parameters", () => {

			const parameters = extractBodyParams({
				"content": {
					"application/json": {
						"schema": {
							"type": "object",
							"properties": {
								"body-param": {
									"type": "string"
								}
							}
						}
					}
				}
			}, "application/json", {});

			strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
			strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
			strictEqual(parameters.length, 1, "Generated parameters length is not as expected");

			strictEqual(typeof parameters[0], "object", "Generated parameters is not as expected");
			deepStrictEqual(parameters[0], {
				"name": "body-param",
				"type": "string",
				"required": false
			}, "Generated parameters is not as expected");

		});

		it("should test param full valid required parameters", () => {

			const parameters = extractBodyParams({
				"content": {
					"application/json": {
						"schema": {
							"type": "object",
							"properties": {
								"body-param": {
									"type": "string"
								}
							},
							"required": [ "body-param" ]
						}
					}
				}
			}, "application/json", {});

			strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
			strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
			strictEqual(parameters.length, 1, "Generated parameters length is not as expected");

			deepStrictEqual(parameters[0], {
				"name": "body-param",
				"required": true,
				"type": "string"
			}, "Generated first parameters is not as expected");

		});

		it("should test param with components", () => {

			const parameters = extractBodyParams({
				"content": {
					"application/json": {
						"schema": {
							"$ref": "#/components/schemas/test"
						}
					}
				}
			}, "application/json", {
				"schemas": {
					"test": {
						"type": "object",
						"properties": {
							"body-param": {
								"type": "string"
							}
						},
						"required": [ "body-param" ]
					}
				}
			});

			strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
			strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
			strictEqual(parameters.length, 1, "Generated parameters length is not as expected");

			deepStrictEqual(parameters[0], {
				"name": "body-param",
				"required": true,
				"type": "string"
			}, "Generated first parameters is not as expected");

		});

	});

});
