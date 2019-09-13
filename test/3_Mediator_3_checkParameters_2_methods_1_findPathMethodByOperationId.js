"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const findPathMethodByOperationId = require(join(
			__dirname, "..", "lib", "utils", "extractFromDescriptor", "findPathMethodByOperationId.js"
		));

// consts

	const DESCRIPTOR_ONLY_URL = require(join(__dirname, "utils", "DescriptorUser", "DescriptorOnlyUrl.js"));

// tests

describe("Mediator / checkParameters / findPathMethodByOperationId", () => {

	it("should test missing operationId", () => {

		const pathMethod = findPathMethodByOperationId();

		strictEqual(typeof pathMethod, "object", "Generated pathMethod is not as expected");
		strictEqual(pathMethod, null, "Generated pathMethod is not as expected");

	});

	it("should test empty operationId", () => {

		const pathMethod = findPathMethodByOperationId("");

		strictEqual(typeof pathMethod, "object", "Generated pathMethod is not as expected");
		strictEqual(pathMethod, null, "Generated pathMethod is not as expected");

	});

	it("should test missing paths", () => {

		const pathMethod = findPathMethodByOperationId("create");

		strictEqual(typeof pathMethod, "object", "Generated pathMethod is not as expected");
		strictEqual(pathMethod, null, "Generated pathMethod is not as expected");

	});

	it("should test empty paths", () => {

		const pathMethod = findPathMethodByOperationId("create", {});

		strictEqual(typeof pathMethod, "object", "Generated pathMethod is not as expected");
		strictEqual(pathMethod, null, "Generated pathMethod is not as expected");

	});

	it("should test inexistant operationId", () => {

		const pathMethod = findPathMethodByOperationId("azqcazczerver", DESCRIPTOR_ONLY_URL.paths);

		strictEqual(typeof pathMethod, "object", "Generated pathMethod is not as expected");
		strictEqual(pathMethod, null, "Generated pathMethod is not as expected");

	});

	it("should test valid operationId", () => {

		const pathMethod = findPathMethodByOperationId("create", DESCRIPTOR_ONLY_URL.paths);

		strictEqual(typeof pathMethod, "object", "Generated pathMethod is not as expected");
		strictEqual(typeof pathMethod.operationId, "string", "Generated pathMethod operationId is not as expected");
		strictEqual(pathMethod.operationId, "create", "Generated pathMethod operationId is not as expected");

	});

});

