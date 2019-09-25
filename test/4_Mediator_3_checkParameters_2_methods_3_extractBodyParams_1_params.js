"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const extractBodyParams = require(join(
			__dirname, "..", "lib", "utils", "extractFromDescriptor", "extractBodyParams.js"
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

		it("should test null param", () => {

			const parameters = extractBodyParams(null);

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

		it("should test null param", () => {

			const parameters = extractBodyParams({
				"content": {
					"application/json": null
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

		it("should test null param", () => {

			const parameters = extractBodyParams({
				"content": {
					"application/json": null
				}
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

	describe("requestBody.content[contentType].schema", () => {

		it("should test missing param", () => {

			const parameters = extractBodyParams({
				"content": {
					"application/json": {}
				}
			}, "application/json");

			strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
			strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
			strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

		});

		it("should test null param", () => {

			const parameters = extractBodyParams({
				"content": {
					"application/json": {
						"schema": null
					}
				}
			}, "application/json");

			strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
			strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
			strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

		});

		it("should test wrong param", () => {

			const parameters = extractBodyParams({
				"content": {
					"application/json": {
						"schema": "test"
					}
				}
			}, "application/json");

			strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
			strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
			strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

		});

	});

	describe("requestBody.content[contentType].schema.type", () => {

		it("should test missing param", () => {

			const parameters = extractBodyParams({
				"content": {
					"application/json": {
						"schema": {}
					}
				}
			}, "application/json");

			strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
			strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
			strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

		});

		it("should test wrong param", () => {

			const parameters = extractBodyParams({
				"content": {
					"application/json": {
						"schema": {
							"type": 1234
						}
					}
				}
			}, "application/json");

			strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
			strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
			strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

		});

		it("should test inexact param", () => {

			const parameters = extractBodyParams({
				"content": {
					"application/json": {
						"schema": {
							"type": "string"
						}
					}
				}
			}, "application/json");

			strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
			strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
			strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

		});

	});

	describe("requestBody.content[contentType].schema.properties", () => {

		it("should test missing param", () => {

			const parameters = extractBodyParams({
				"content": {
					"application/json": {
						"schema": {
							"type": "object"
						}
					}
				}
			}, "application/json");

			strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
			strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
			strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

		});

		it("should test null param", () => {

			const parameters = extractBodyParams({
				"content": {
					"application/json": {
						"schema": {
							"type": "object",
							"properties": null
						}
					}
				}
			}, "application/json");

			strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
			strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
			strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

		});

		it("should test wrong param", () => {

			const parameters = extractBodyParams({
				"content": {
					"application/json": {
						"schema": {
							"type": "object",
							"properties": false
						}
					}
				}
			}, "application/json");

			strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
			strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
			strictEqual(parameters.length, 0, "Generated parameters length is not as expected");

		});

	});

});
