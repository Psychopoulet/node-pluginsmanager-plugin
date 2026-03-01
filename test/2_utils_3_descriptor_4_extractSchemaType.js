"use strict";

// deps

	// natives
	const { strictEqual } = require("node:assert");
	const { join } = require("node:path");

	// locals
	const extractSchemaType = require(join(__dirname, "..", "lib", "cjs", "utils", "descriptor", "extractSchemaType.js"));

// tests

describe("utils / descriptor / extractSchemaType", () => {

	describe("default", () => {

		it("should return string when schema has no type nor $ref", () => {
			strictEqual(extractSchemaType.default({}, {}), "string");
		});

	});

	describe("direct type", () => {

		it("should return string when schema has type string", () => {
			strictEqual(extractSchemaType.default({ "type": "string" }, {}), "string");
		});

		it("should return number when schema has type number", () => {
			strictEqual(extractSchemaType.default({ "type": "number" }, {}), "number");
		});

		it("should return integer when schema has type integer", () => {
			strictEqual(extractSchemaType.default({ "type": "integer" }, {}), "integer");
		});

		it("should return boolean when schema has type boolean", () => {
			strictEqual(extractSchemaType.default({ "type": "boolean" }, {}), "boolean");
		});

		it("should return object when schema has type object", () => {
			strictEqual(extractSchemaType.default({ "type": "object" }, {}), "object");
		});

		it("should return array when schema has type array", () => {
			strictEqual(extractSchemaType.default({ "type": "array" }, {}), "array");
		});

	});

	describe("$ref resolution", () => {

		it("should return type from resolved $ref schema", () => {

			const schemas = {
				"MySchema": {
					"type": "integer"
				}
			};

			strictEqual(
				extractSchemaType.default({ "$ref": "#/components/schemas/MySchema" }, schemas),
				"integer"
			);

		});

		it("should return string when $ref schema has no type", () => {

			const schemas = {
				"MySchema": {}
			};

			strictEqual(
				extractSchemaType.default({ "$ref": "#/components/schemas/MySchema" }, schemas),
				"string"
			);

		});

		it("should return string when $ref schema does not exist in schemas", () => {

			strictEqual(
				extractSchemaType.default({ "$ref": "#/components/schemas/NonExistent" }, {}),
				"string"
			);

		});

		it("should resolve nested $ref to object type", () => {

			const schemas = {
				"User": {
					"type": "object"
				}
			};

			strictEqual(
				extractSchemaType.default({ "$ref": "#/components/schemas/User" }, schemas),
				"object"
			);

		});

	});

});
