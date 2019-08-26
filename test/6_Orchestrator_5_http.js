"use strict";

// deps

	// natives
	const { join } = require("path");
	const { parse } = require("url");
	const { strictEqual } = require("assert");

	// externals
	const express = require("express");

	// locals

		const httpRequestTest = require(join(__dirname, "utils", "httpRequestTest.js"));
		const LocalOrchestrator = require(join(__dirname, "utils", "Orchestrator", "LocalOrchestrator.js"));

// consts

	const GOOD_OPTIONS = {
		"packageFile": join(__dirname, "..", "package.json"),
		"descriptorFile": join(__dirname, "utils", "Descriptor.json"),
		"mediatorFile": join(__dirname, "utils", "Mediator", "LocalMediator.js"),
		"serverFile": join(__dirname, "utils", "Server", "LocalServer.js")
	};

	const HERITED_OPTIONS = {
		"packageFile": join(__dirname, "..", "package.json"),
		"descriptorFile": join(__dirname, "utils", "Descriptor.json"),
		"mediatorFile": join(__dirname, "utils", "Mediator", "HeritedMediator.js"),
		"serverFile": join(__dirname, "utils", "Server", "HeritedServer.js")
	};

// tests

describe("Orchestrator / http", () => {

	let runningServer = null;
	const orchestrator = new LocalOrchestrator(HERITED_OPTIONS);

	before(() => {

		return orchestrator.load().then(() => {
			return orchestrator.init();
		}).then(() => {

			const port = parseInt(parse(orchestrator._Descriptor.servers[0].url).port, 10);

			return new Promise((resolve) => {

				runningServer = express().use((req, res, next) => {
					orchestrator.appMiddleware(req, res, next);
				}).use((req, res) => {

					res.writeHead(404, {
						"Content-Type": "application/json; charset=utf-8"
					});

					res.end(JSON.stringify({
						"code": "404",
						"message": "Unknown page"
					}));

				}).listen(port, resolve);

			});

		});

	});

	after(() => {

		return orchestrator.release().then(() => {
			return orchestrator.destroy();
		}).then(() => {

			return runningServer ? new Promise((resolve) => {

				runningServer.close(() => {
					runningServer = null;
					resolve();
				});

			}) : Promise.resolve();

		});

	});

	it("should test app middleware without Server", () => {

		const res = new LocalOrchestrator(GOOD_OPTIONS).appMiddleware(null, null, () => {
			return false;
		});

		strictEqual(typeof res, "undefined", "Generated result is not undefined");

	});

	it("should test app middleware with default root", () => {

		return httpRequestTest("/", "get", 404, "Not Found", {
			"code": "404",
			"message": "Unknown page"
		});

	});

	it("should test app middleware with get request without operationId", () => {

		return httpRequestTest("/missingoperationid", "get", 501, "Not Implemented", {
			"code": "NOT_IMPLEMENTED",
			"message": "Missing \"operationId\" in the Descriptor for this request"
		});

	});

	it("should test app middleware with valid root without returned data", () => {

		return httpRequestTest("/empty", "get", 204, "No Content");

	});

	it("should test app middleware with valid root", () => {

		return httpRequestTest("/valid", "get", 200, "OK", [ "test" ]);

	});

	it("should test app middleware with valid put request", () => {

		return httpRequestTest("/create", "put", 201, "Created");

	});

});
