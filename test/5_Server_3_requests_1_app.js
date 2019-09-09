"use strict";

// deps

	// natives
	const { join } = require("path");
	const { parse } = require("url");
	const { strictEqual } = require("assert");

	// externals
	const express = require("express");

	// locals

		// utils
		const HeritedServer = require(join(__dirname, "utils", "Server", "HeritedServer.js"));
		const tests = require(join(__dirname, "utils", "Server", "tests.js"));

// tests

describe("Server / requests / app", () => {

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

	it("should test http server without server", (done) => {

		new HeritedServer().on("error", (err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		}).appMiddleware(null, {
			"writeHead": () => {
				// nothing to do here
			},
			"end": () => {
				// nothing to do here
			}
		}, () => {
			// nothing to do here
		});

	});

	tests(server);

});
