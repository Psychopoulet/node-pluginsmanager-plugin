"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");
	const { createServer } = require("http");

	// externals
	const express = require("express");
	const WebSocketServer = require("ws").Server;

	// locals

		// utils
		const httpRequestTest = require(join(__dirname, "utils", "httpRequestTest.js"));
		const socketRequestTest = require(join(__dirname, "utils", "socketRequestTest.js"));
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

	const PORT = 3000;
	const PORT_SOCKET = PORT + 1;
	const RESPONSE_CONTENT = "Hello World";

// tests

describe("Orchestrator / network", () => {

	it("should test http middleware without Server", () => {

		const res = new LocalOrchestrator(GOOD_OPTIONS).httpMiddleware(null, null);

		strictEqual(typeof res, "boolean", "Generated result is not a boolean");
		strictEqual(res, false, "Generated result is not as expected");

	});

	it("should test app middleware without Server", () => {

		const res = new LocalOrchestrator(GOOD_OPTIONS).appMiddleware(null, null, () => {
			return false;
		});

		strictEqual(typeof res, "undefined", "Generated result is not undefined");

	});

	describe("fullstack", () => {

		it("should test with full stack http", () => {

			const orchestrator = new LocalOrchestrator(HERITED_OPTIONS);
			let runningServer = null;

			// start orchestrator
			return orchestrator.load().then(() => {

				return orchestrator.init();

			// middleware
			}).then(() => {

				return new Promise((resolve) => {

					runningServer = createServer((req, res) => {

						if (!orchestrator.httpMiddleware(req, res)) {

							res.writeHead(200, {
								"Content-Type": "text/plain; charset=utf-8"
							});

							res.end(RESPONSE_CONTENT);

						}

					}).listen(PORT, resolve);

				});

			// request server
			}).then(() => {

				return httpRequestTest("/", 200, "OK");

			// request server
			}).then(() => {

				return httpRequestTest("/fullstack", 201, "Created");

			// close server
			}).then(() => {

				return runningServer ? new Promise((resolve) => {

					runningServer.close(() => {
						runningServer = null;
						resolve();
					});

				}) : Promise.resolve();

			// end orchestrator
			}).then(() => {

				return orchestrator.release().then(() => {
					return orchestrator.destroy();
				});

			});

		});

		it("should test with full stack app", () => {

			const orchestrator = new LocalOrchestrator(HERITED_OPTIONS);
			let runningServer = null;

			// start orchestrator
			return orchestrator.load().then(() => {

				return orchestrator.init();

			// middleware
			}).then(() => {

				return new Promise((resolve) => {

					runningServer = express().use((req, res, next) => {
						orchestrator.appMiddleware(req, res, next);
					}).get("/", (req, res) => {

						res.writeHead(200, {
							"Content-Type": "text/plain; charset=utf-8"
						});

						res.end(RESPONSE_CONTENT);

					}).listen(PORT, resolve);

				});

			// request server
			}).then(() => {

				return httpRequestTest("/", 200, "OK");

			// request server
			}).then(() => {

				return httpRequestTest("/fullstack", 201, "Created");

			// close server
			}).then(() => {

				return runningServer ? new Promise((resolve) => {

					runningServer.close(() => {
						runningServer = null;
						resolve();
					});

				}) : Promise.resolve();

			// end orchestrator
			}).then(() => {

				return orchestrator.release().then(() => {
					return orchestrator.destroy();
				});

			});

		});

		it("should test with full stack socket", () => {

			const orchestrator = new LocalOrchestrator(HERITED_OPTIONS);

			// DebugStep
			let pinged = false;
			orchestrator.on("ping", () => {
				pinged = true;
			});

			// create server
			const runningServer = new WebSocketServer({
				"port": PORT_SOCKET
			});

			// start orchestrator
			return orchestrator.load().then(() => {

				return orchestrator.init();

			// middleware
			}).then(() => {

				orchestrator.socketMiddleware(runningServer);

				return Promise.resolve();

			// request server
			}).then(() => {

				return socketRequestTest("ping", "pong").then(() => {

					strictEqual(pinged, true, "DebugStep is not as expected");

					return Promise.resolve();

				});

			// close server
			}).then(() => {

				return runningServer ? new Promise((resolve) => {

					runningServer.close(() => {
						resolve();
					});

				}) : Promise.resolve();

			// end orchestrator
			}).then(() => {

				return orchestrator.release().then(() => {
					return orchestrator.destroy();
				});

			});

		});

		it("should test with released server", () => {

			const orchestrator = new LocalOrchestrator(HERITED_OPTIONS);
			let runningServer = null;

			// start orchestrator
			return orchestrator.load().then(() => {

				return orchestrator.init();

			// middleware
			}).then(() => {

				return new Promise((resolve) => {

					runningServer = express().use((req, res, next) => {
						orchestrator.appMiddleware(req, res, next);
					}).use((req, res) => {

						res.writeHead(404, {
							"Content-Type": "text/plain; charset=utf-8"
						});

						res.end("Hello World", "utf-8");

					}).listen(PORT, resolve);

				});

			// release
			}).then(() => {

				return orchestrator.release();

			// request server
			}).then(() => {

				return httpRequestTest("/thisisatest", 404, "Not Found");

			// close server
			}).then(() => {

				return runningServer ? new Promise((resolve) => {

					runningServer.close(() => {
						runningServer = null;
						resolve();
					});

				}) : Promise.resolve();

			// end orchestrator
			}).then(() => {

				return orchestrator.destroy();

			});

		});

	});

});
