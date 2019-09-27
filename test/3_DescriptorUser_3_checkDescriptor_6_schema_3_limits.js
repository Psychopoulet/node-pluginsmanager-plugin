"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const checkSchema = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor",
			"schemas", "checkSchema.js"
		));

// tests

describe("DescriptorUser / checkDescriptor / checkSchema / limits", () => {

	describe("integer", () => {

		describe("minimum", () => {

			it("should check wrong data type", () => {

				const err = checkSchema("/test/{path-test}", "get", "path-test", {
					"type": "integer",
					"minimum": false
				});

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

			});

			it("should check valid data", () => {

				const err = checkSchema("/test/{path-test}", "get", "path-test", {
					"type": "integer",
					"minimum": 0
				});

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err, null, "Generated error is not null");

			});

		});

		describe("maximum", () => {

			it("should check wrong data type", () => {

				const err = checkSchema("/test/{path-test}", "get", "path-test", {
					"type": "integer",
					"maximum": false
				});

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

			});

			it("should check valid data", () => {

				const err = checkSchema("/test/{path-test}", "get", "path-test", {
					"type": "integer",
					"maximum": 10
				});

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err, null, "Generated error is not null");

			});

		});

	});

	describe("number", () => {

		describe("minimum", () => {

			it("should check wrong data type", () => {

				const err = checkSchema("/test/{path-test}", "get", "path-test", {
					"type": "number",
					"minimum": false
				});

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

			});

			it("should check valid data", () => {

				const err = checkSchema("/test/{path-test}", "get", "path-test", {
					"type": "number",
					"minimum": 0
				});

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err, null, "Generated error is not null");

			});

		});

		describe("maximum", () => {

			it("should check wrong data type", () => {

				const err = checkSchema("/test/{path-test}", "get", "path-test", {
					"type": "number",
					"maximum": false
				});

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

			});

			it("should check valid data", () => {

				const err = checkSchema("/test/{path-test}", "get", "path-test", {
					"type": "number",
					"maximum": 10
				});

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err, null, "Generated error is not null");

			});

		});

	});

	describe("string", () => {

		describe("minLength", () => {

			it("should check wrong data type", () => {

				const err = checkSchema("/test/{path-test}", "get", "path-test", {
					"type": "string",
					"minLength": false
				});

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

			});

			it("should check valid data", () => {

				const err = checkSchema("/test/{path-test}", "get", "path-test", {
					"type": "string",
					"minLength": 0
				});

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err, null, "Generated error is not null");

			});

		});

		describe("maxLength", () => {

			it("should check wrong data type", () => {

				const err = checkSchema("/test/{path-test}", "get", "path-test", {
					"type": "string",
					"maxLength": false
				});

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

			});

			it("should check valid data", () => {

				const err = checkSchema("/test/{path-test}", "get", "path-test", {
					"type": "string",
					"maxLength": 10
				});

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err, null, "Generated error is not null");

			});

		});

	});

});
