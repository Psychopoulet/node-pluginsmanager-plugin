"use strict";

// deps

	// natives
	const { join } = require("path");
	const { createServer } = require("http");
	const { strictEqual } = require("assert");
	const Events = require("events");

	// externals
	const express = require("express");

	// locals
	const Bootable = require(join(__dirname, "..", "lib", "components", "Bootable.js"));
	const MediatorUser = require(join(__dirname, "..", "lib", "components", "MediatorUser.js"));
	const Server = require(join(__dirname, "..", "lib", "components", "Server.js"));
	const ServerHerited = require(join(__dirname, "utils", "ServerHerited.js"));
	const httpRequestTest = require(join(__dirname, "utils", "httpRequestTest.js"));

// consts

	const PORT = "3000";
	const RESPONSE_CONTENT = "Hello World";

// tests

describe("Server", () => {

	it("should test constructor", () => {

		const server = new Server();

		strictEqual(typeof server, "object", "Generated server is not an object");
		strictEqual(server instanceof Events, true, "Generated server is not a Events instance");
		strictEqual(server instanceof Bootable, true, "Generated server is not a Bootable instance");
		strictEqual(server instanceof MediatorUser, true, "Generated server is not a MediatorUser instance");
		strictEqual(server instanceof Server, true, "Generated server is not a Server instance");

	});

	it("should test event", () => {

		const server = new Server();

		return new Promise((resolve, reject) => {

			server
				.once("error", reject)
				.once("test", resolve)
				.emit("test");

		}).then(() => {
			return server.release();
		});

	});

	it("should init server", () => {
		return new Server().init("test init");
	});

	it("should release server", () => {
		return new Server().release("test release");
	});

	describe("network", () => {

		const server = new Server();
		const serverHerited = new ServerHerited();

		let runningServer = null;

		afterEach(() => {

			return runningServer ? new Promise((resolve) => {

				runningServer.close(() => {
					runningServer = null;
					resolve();
				});

			}) : Promise.resolve();

		});

		it("should test app middleware", () => {

			return new Promise((resolve) => {

				const app = express();

				app.use(server.appMiddleware);

				app.get("/", (req, res) => {
					res.send(RESPONSE_CONTENT);
				});

				runningServer = app.listen(PORT, () => {
					resolve();
				});

			}).then(() => {

				return httpRequestTest("/", 200, "OK");

			});

		});

		it("should test http middleware", () => {

			return new Promise((resolve) => {

				runningServer = createServer((req, res) => {

					if (!server.httpMiddleware(req, res)) {

						res.writeHead(200, {
							"Content-Type": "text/html; charset=utf-8"
						});

						res.write(RESPONSE_CONTENT);

						res.end();

					}

				}).listen(PORT, () => {
					resolve();
				});

			}).then(() => {

				return httpRequestTest("/", 200, "OK");

			});

		});

		it("should test app middleware with specific url", () => {

			return new Promise((resolve) => {

				const app = express();

				app.use(serverHerited.appMiddleware);

				runningServer = app.listen(PORT, () => {
					resolve();
				});

			}).then(() => {

				return httpRequestTest("/thisisatest", 201, "Created");

			});

		});

		it("should test http middleware with specific url", () => {

			return new Promise((resolve) => {

				runningServer = createServer((req, res) => {

					if (!serverHerited.httpMiddleware(req, res)) {

						res.writeHead(200, {
							"Content-Type": "text/html; charset=utf-8"
						});

						res.write(RESPONSE_CONTENT);

						res.end();

					}

				}).listen(PORT, () => {
					resolve();
				});

			}).then(() => {

				return httpRequestTest("/thisisatest", 201, "Created");

			});

		});

	});

});
