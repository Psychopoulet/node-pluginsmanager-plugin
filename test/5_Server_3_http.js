"use strict";

// deps

	// natives
	const { join } = require("path");
	const { parse } = require("url");

	// externals
	const express = require("express");

	// locals

		// utils
		const httpRequestTest = require(join(__dirname, "utils", "httpRequestTest.js"));
		const HeritedServer = require(join(__dirname, "utils", "Server", "HeritedServer.js"));

// tests

describe("Server / app", () => {

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

	describe("check wrong paths", () => {

		it("should test request with default root", () => {

			return httpRequestTest("/", "get", null, 404, "Not Found", {
				"code": "404",
				"message": "Unknown page"
			});

		});

		it("should test request with get request without operationId", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/missingoperationid", "get", null, 501, "Not Implemented", {
				"code": "NOT_IMPLEMENTED",
				"message": "Missing \"operationId\" in the Descriptor for this request"
			});

		});

		it("should test request with get request with not implemented operationId", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/unknownoperationid", "get", null, 501, "Not Implemented", {
				"code": "NOT_IMPLEMENTED",
				"message": "Unknown Mediator's \"operationId\" method for this request"
			});

		});

		it("should test request with valid root without returned data", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/empty", "get", null, 204, "No Content");

		});

		it("should test request with artificial error", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/create?url-param=ok", "put", {
				"body-param": "generate-fail"
			}, 500, "Internal Server Error", {
				"code": "INTERNAL_SERVER_ERROR",
				"message": "Generate artificial error"
			});

		});

	});

	describe("check parameters", () => {

		it("should test request with missing parameter", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/create?url-param=ok", "put", null, 400, "Bad Request", {
				"code": "MISSING_PARAMETER",
				"message": "Missing body params"
			});

		});

		it("should test request with missing parameter", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/create?url-param=ok", "put", null, 400, "Bad Request", {
				"code": "MISSING_PARAMETER",
				"message": "Missing body params"
			});

		});

		it("should test request with wrong parameter", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/create?url-param=ok", "put", {
				"body-param": false
			}, 400, "Bad Request", {
				"code": "WRONG_TYPE_PARAMETER",
				"message": "body-param param is not a string"
			});

		});

		it("should test request with empty parameter", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/create?url-param=ok", "put", {
				"body-param": ""
			}, 400, "Bad Request", {
				"code": "RANGE_OR_EMPTY_PARAMETER",
				"message": "body-param param is empty"
			});

		});

	});

	describe("check valid requests", () => {

		it("should test request with valid query request", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/create?url-param=ok", "put", {
				"body-param": "test"
			}, 201, "Created");

		});

		it("should test request with valid path request", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/url/ok", "get", 200, "OK");

		});

		it("should test request with valid root", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/api/valid", "get", null, 200, "OK", [ "test" ]);

		});

		it("should test descriptor request", () => {

			return httpRequestTest("/node-pluginsmanager-plugin/descriptor", "get", null, 200, "OK", server._Descriptor);

		});

	});

});
