"use strict";

// deps

	// natives
	const { join } = require("path");
	const { parse } = require("url");

	// externals
	const express = require("express");

	// locals

		const httpRequestTest = require(join(__dirname, "utils", "httpRequestTest.js"));
		const HeritedServer = require(join(__dirname, "utils", "Server", "HeritedServer.js"));

// tests

describe("Server / http", () => {

	let runningServer = null;
	const server = new HeritedServer();

	before(() => {

		return server.init().then(() => {

			const port = parseInt(parse(server._Descriptor.servers[0].url).port, 10);

			return new Promise((resolve) => {

				runningServer = express().use(
					"/node-pluginsmanager-plugin", express.static(join(__dirname, "utils", "public"))
				).use((req, res, next) => {
					server.appMiddleware(req, res, next);
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

		return server.release().then(() => {

			return runningServer ? new Promise((resolve) => {

				runningServer.close(() => {
					runningServer = null;
					resolve();
				});

			}) : Promise.resolve();

		});

	});

	it("should test app middleware with default root", () => {

		return httpRequestTest("/", "get", null, 404, "Not Found", {
			"code": "404",
			"message": "Unknown page"
		});

	});

	it("should test app middleware with get request without operationId", () => {

		return httpRequestTest("/node-pluginsmanager-plugin/api/missingoperationid", "get", null, 501, "Not Implemented", {
			"code": "NOT_IMPLEMENTED",
			"message": "Missing \"operationId\" in the Descriptor for this request"
		});

	});

	it("should test app middleware with get request with not implemented operationId", () => {

		return httpRequestTest("/node-pluginsmanager-plugin/api/unknownoperationid", "get", null, 501, "Not Implemented", {
			"code": "NOT_IMPLEMENTED",
			"message": "Unknown Mediator's \"operationId\" method for this request"
		});

	});

	it("should test app middleware with valid root without returned data", () => {

		return httpRequestTest("/node-pluginsmanager-plugin/api/empty", "get", null, 204, "No Content");

	});

	it("should test app middleware with valid root", () => {

		return httpRequestTest("/node-pluginsmanager-plugin/api/valid", "get", null, 200, "OK", [ "test" ]);

	});

	it("should test app middleware with valid put request", () => {

		return httpRequestTest("/node-pluginsmanager-plugin/api/create?url-param=ok", "put", {
			"body-param": "test"
		}, 201, "Created");

	});

	it("should test descriptor request", () => {

		return httpRequestTest("/node-pluginsmanager-plugin/descriptor", "get", null, 200, "OK", server._Descriptor);

	});

});
