"use strict";

// deps

	// natives
	const { join } = require("path");
	const { parse } = require("url");
	const { createServer } = require("http");

	// locals

		// utils
		const HeritedServer = require(join(__dirname, "utils", "Server", "HeritedServer.js"));
		const tests = require(join(__dirname, "utils", "Server", "tests.js"));

// tests

describe("Server / requests / http", () => {

	let runningServer = null;
	const server = new HeritedServer();

	before(() => {

		server.enableCheckParameters().enableCheckResponse();

		return server.init().then(() => {

			const port = parseInt(parse(server._Descriptor.servers[0].url).port, 10);

			return new Promise((resolve) => {

				runningServer = createServer((req, res) => {

					server.appMiddleware(req, res, () => {

						res.writeHead(404, {
							"Content-Type": "application/json; charset=utf-8"
						});

						res.end(JSON.stringify({
							"code": "404",
							"message": "Unknown page"
						}));

					});

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

	tests(server, true);

});
