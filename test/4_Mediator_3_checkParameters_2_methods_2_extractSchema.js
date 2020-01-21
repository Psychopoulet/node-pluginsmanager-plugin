"use strict";

// deps

	// natives
	const { join } = require("path");
	const { deepStrictEqual, strictEqual } = require("assert");

	// locals

		// plugin
		const extractSchema = require(join(
			__dirname, "..", "lib", "utils", "checkParameters", "extractFromDescriptor", "extractSchema.js"
		));

// tests

describe("Mediator / checkParameters / extractSchema", () => {

	it("should test basic schema", () => {

		const schema = extractSchema({
			"type": "string"
		});

		strictEqual(typeof schema, "object", "Generated schema is not as expected");
		deepStrictEqual(schema, {
			"type": "string"
		}, "Generated schema is not as expected");

	});

	it("should test schema with components", () => {

		const schema = extractSchema({
			"$ref": "#/components/schemas/test"
		}, {
			"schemas": {
				"test": {
					"type": "string"
				}
			}
		});

		strictEqual(typeof schema, "object", "Generated schema is not as expected");
		deepStrictEqual(schema, {
			"type": "string"
		}, "Generated schema is not as expected");

	});

	it("should test schema string min & max", () => {

		const schema = extractSchema({
			"type": "string",
			"minLength": 0,
			"maxLength": 5
		});

		strictEqual(typeof schema, "object", "Generated schema is not as expected");
		deepStrictEqual(schema, {
			"type": "string",
			"min": 0,
			"max": 5
		}, "Generated schema is not as expected");

	});

	it("should test schema array min & max", () => {

		const schema = extractSchema({
			"type": "array",
			"minLength": 0,
			"maxLength": 5,
			"items": {
				"type": "string"
			}
		});

		strictEqual(typeof schema, "object", "Generated schema is not as expected");
		deepStrictEqual(schema, {
			"type": "array",
			"min": 0,
			"max": 5,
			"items": {
				"type": "string"
			}
		}, "Generated schema is not as expected");

	});

	it("should test schema number min & max", () => {

		const schema = extractSchema({
			"type": "number",
			"minimum": 0,
			"maximum": 0.5
		});

		strictEqual(typeof schema, "object", "Generated schema is not as expected");
		deepStrictEqual(schema, {
			"type": "number",
			"min": 0,
			"max": 0.5
		}, "Generated schema is not as expected");

	});

	it("should test schema integer min & max", () => {

		const schema = extractSchema({
			"type": "integer",
			"minimum": 0,
			"maximum": 5
		});

		strictEqual(typeof schema, "object", "Generated schema is not as expected");
		deepStrictEqual(schema, {
			"type": "integer",
			"min": 0,
			"max": 5
		}, "Generated schema is not as expected");

	});

});
