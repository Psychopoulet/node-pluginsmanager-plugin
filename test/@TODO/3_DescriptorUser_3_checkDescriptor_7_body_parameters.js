"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const checkBodyParameters = require(join(
			__dirname, "..", "lib", "utils", "checkDescriptor",
			"body-parameters", "checkBodyParameters.js"
		));

// tests

describe("DescriptorUser / checkDescriptor / body-parameters", () => {

	describe("requestBody", () => {

		it("should check missing data", () => {

			const err = checkBodyParameters("/test", "get");

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not as expected");

		});

		it("should check wrong type data", () => {

			const err = checkBodyParameters("/test", "get", false);

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should check empty data", () => {

			const err = checkBodyParameters("/test", "get", {});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

		});

	});

	describe("requestBody / content", () => {

		it("should check missing data", () => {

			const err = checkBodyParameters("/test", "get", {
				"test": "test"
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

		});

		it("should check wrong type data", () => {

			const err = checkBodyParameters("/test", "get", {
				"content": false
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should check empty data", () => {

			const err = checkBodyParameters("/test", "get", {
				"content": {}
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

		});

	});

	describe("requestBody / content / contentType", () => {

		it("should check wrong type data", () => {

			const err = checkBodyParameters("/test", "get", {
				"content": {
					"application/json": false
				}
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should check empty data", () => {

			const err = checkBodyParameters("/test", "get", {
				"content": {
					"application/json": {}
				}
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

		});

	});

	describe("requestBody / content / contentType / application/json", () => {

		it("should check wrong type data", () => {

			const err = checkBodyParameters("/test", "get", {
				"content": {
					"application/json": {
						"schema": null
					}
				}
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

		});

		it("should check empty data", () => {

			const err = checkBodyParameters("/test", "get", {
				"content": {
					"application/json": {
						"schema": {}
					}
				}
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

		});

	});

	describe("valid data", () => {

		it("should check valid data", () => {

			const err = checkBodyParameters("/test", "get", {
				"content": {
					"application/json": {
						"schema": {
							"type": "string"
						}
					}
				}
			});

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err, null, "Generated error is not null");

		});

	});

});
