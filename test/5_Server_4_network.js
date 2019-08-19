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

		// plugin
		const readJSONFile = require(join(__dirname, "..", "lib", "utils", "readJSONFile.js"));

		// utils
		const httpRequestTest = require(join(__dirname, "utils", "httpRequestTest.js"));
		const socketRequestTest = require(join(__dirname, "utils", "socketRequestTest.js"));
		const LocalServer = require(join(__dirname, "utils", "Server", "LocalServer.js"));
		const HeritedServer = require(join(__dirname, "utils", "Server", "HeritedServer.js"));

// consts

	const PORT = 3000;
	const PORT_SOCKET = PORT + 1;
	const RESPONSE_CONTENT = "Hello World";

// tests

describe("Server / network", () => {

	let descriptor = null;

	before(() => {

		return readJSONFile(join(__dirname, "utils", "Descriptor.json")).then((data) => {
			descriptor = data;
		});

	});

	let runningServer = null;

	describe("basics", () => {

		const server = new LocalServer();

		afterEach(() => {

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

			return new Promise((resolve) => {

				runningServer = express()
					.use((req, res, next) => {
						server.appMiddleware(req, res, next);
					})
					.get("/", (req, res) => {

						res.writeHead(200, {
							"Content-Type": "text/plain; charset=utf-8"
						});

						res.end(RESPONSE_CONTENT);

					})
					.listen(PORT, resolve);

			}).then(() => {

				return httpRequestTest("/", 200, "OK");

			});

		});

		it("should test http middleware with default root", () => {

			return new Promise((resolve) => {

				runningServer = createServer((req, res) => {

					if (!server.httpMiddleware(req, res)) {

						res.writeHead(200, {
							"Content-Type": "text/plain; charset=utf-8"
						});

						res.end(RESPONSE_CONTENT);

					}

				}).listen(PORT, resolve);

			}).then(() => {

				return httpRequestTest("/", 200, "OK");

			});

		});

	});

	describe("more", () => {

		const server = new HeritedServer();

		beforeEach(() => {
			server._Descriptor = descriptor;
		});

		afterEach(() => {

			return server.release().then(() => {

				return runningServer ? new Promise((resolve) => {

					runningServer.close(() => {
						runningServer = null;
						resolve();
					});

				}) : Promise.resolve();

			});

		});

		it("should test app middleware with specific url", () => {

			return new Promise((resolve) => {

				runningServer = express()
					.use((req, res, next) => {
						server.appMiddleware(req, res, next);
					})
					.get("/", (req, res) => {
						res.send(RESPONSE_CONTENT);
					})
					.listen(PORT, resolve);

			}).then(() => {

				return httpRequestTest("/thisisatest", 201, "Created");

			});

		});

		it("should test http middleware with specific url", () => {

			return new Promise((resolve) => {

				runningServer = createServer((req, res) => {

					if (!server.httpMiddleware(req, res)) {

						res.writeHead(200, {
							"Content-Type": "text/plain; charset=utf-8"
						});

						res.end(RESPONSE_CONTENT);

					}

				}).listen(PORT, resolve);

			}).then(() => {

				return httpRequestTest("/thisisatest", 201, "Created");

			});

		});

		it("should test socket server", () => {

			return Promise.resolve().then(() => {

				// DebugStep
				let pinged = false;
				server.on("ping", () => {
					pinged = true;
				});

				// create server
				const socketServer = new WebSocketServer({
					"port": PORT_SOCKET
				});

				// middleware
				return Promise.resolve().then(() => {

					server.socketMiddleware(socketServer);

					return Promise.resolve();

				// request server
				}).then(() => {

					return socketRequestTest("ping", "pong").then(() => {

						strictEqual(pinged, true, "DebugStep is not as expected");

						return Promise.resolve();

					});

				// close server
				}).then(() => {

					return new Promise((resolve, reject) => {

						socketServer.removeAllListeners();

						socketServer.close((err) => {

							return err ? reject(err) : resolve();

						});

					});

				});

			});

		});

	});

});
