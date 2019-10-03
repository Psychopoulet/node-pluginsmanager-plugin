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

describe("Mediator / checkParameters / extractBodyParams / pure description", () => {

	it("should test null param", () => {

		const parameters = extractBodyParams({
			"content": {
				"application/json": {
					"schema": {
						"type": "object",
						"properties": {
							"body-param": null
						}
					}
				}
			}
		}, "application/json");

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 1, "Generated parameters length is not as expected");

		deepStrictEqual(parameters[0], {
			"name": "body-param",
			"required": false,
			"type": "unknown"
		}, "Generated first parameters is not as expected");

	});

	it("should test wrong param", () => {

		const parameters = extractBodyParams({
			"content": {
				"application/json": {
					"schema": {
						"type": "object",
						"properties": {
							"body-param": "test"
						}
					}
				}
			}
		}, "application/json");

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 1, "Generated parameters length is not as expected");

		deepStrictEqual(parameters[0], {
			"name": "body-param",
			"required": false,
			"type": "unknown"
		}, "Generated first parameters is not as expected");

	});

	it("should test param without required", () => {

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
		}, "application/json");

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 1, "Generated parameters length is not as expected");

		deepStrictEqual(parameters[0], {
			"name": "body-param",
			"required": false,
			"type": "string"
		}, "Generated first parameters is not as expected");

	});

	it("should test param with null required", () => {

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
						"required": null
					}
				}
			}
		}, "application/json");

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 1, "Generated parameters length is not as expected");

		deepStrictEqual(parameters[0], {
			"name": "body-param",
			"required": false,
			"type": "string"
		}, "Generated first parameters is not as expected");

	});

	it("should test param with wrong required", () => {

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
						"required": "test"
					}
				}
			}
		}, "application/json");

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 1, "Generated parameters length is not as expected");

		deepStrictEqual(parameters[0], {
			"name": "body-param",
			"required": false,
			"type": "string"
		}, "Generated first parameters is not as expected");

	});

	it("should test param with empty required", () => {

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
						"required": []
					}
				}
			}
		}, "application/json");

		strictEqual(typeof parameters, "object", "Generated parameters is not as expected");
		strictEqual(parameters instanceof Array, true, "Generated parameters is not as expected");
		strictEqual(parameters.length, 1, "Generated parameters length is not as expected");

		deepStrictEqual(parameters[0], {
			"name": "body-param",
			"required": false,
			"type": "string"
		}, "Generated first parameters is not as expected");

	});

	it("should test param full valid", () => {

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
		}, "application/json");

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
