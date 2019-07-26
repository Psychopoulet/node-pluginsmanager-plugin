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

	const httpRequestTest = require(join(__dirname, "utils", "httpRequestTest.js"));
	const Bootable = require(join(__dirname, "..", "lib", "components", "Bootable.js"));
	const MediatorUser = require(join(__dirname, "..", "lib", "components", "MediatorUser.js"));
	const { Server } = require(join(__dirname, "..", "lib", "main.js"));
	const LocalServer = require(join(__dirname, "utils", "Server", "LocalServer.js"));
	const HeritedServer = require(join(__dirname, "utils", "Server", "HeritedServer.js"));

// consts

	const PORT = "3000";
	const RESPONSE_CONTENT = "Hello World";

// tests

describe("Server", () => {

	const server = new LocalServer();

	afterEach(() => {
		return server.release();
	});

	it("should test constructor", () => {

		strictEqual(typeof server, "object", "Generated server is not an object");
		strictEqual(server instanceof Events, true, "Generated server is not a Events instance");
		strictEqual(server instanceof Bootable, true, "Generated server is not a Bootable instance");
		strictEqual(server instanceof MediatorUser, true, "Generated server is not a MediatorUser instance");
		strictEqual(server instanceof Server, true, "Generated server is not a Server instance");
		strictEqual(server instanceof LocalServer, true, "Generated server is not a LocalServer instance");

	});

	it("should test event", () => {

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
		return server.init("test init");
	});

	it("should test non-herited _initWorkSpace", (done) => {

		const nonHerited = new Server();

		nonHerited
			.once("initialized", () => {
				done(new Error("There is no generated Error"));
			})
			.once("error", (err) => {

				strictEqual(nonHerited.initialized, false, "Generated nonHerited is not as expected");

				strictEqual(typeof err, "object", "Generated Error is not as expected");
				strictEqual(err instanceof Error, true, "Generated Error is not as expected");

				done();

			});

		nonHerited.init().catch(done);

	});

	it("should release server", () => {
		return server.release("test release");
	});

	it("should test non-herited _releaseWorkSpace", (done) => {

		const nonHerited = new Server();

		nonHerited
			.once("released", () => {
				done(new Error("There is no generated Error"));
			})
			.once("error", (err) => {

				strictEqual(nonHerited.initialized, false, "Generated nonHerited is not as expected");

				strictEqual(typeof err, "object", "Generated Error is not as expected");
				strictEqual(err instanceof Error, true, "Generated Error is not as expected");

				done();

			});

		nonHerited.release().catch(done);

	});

	describe("network", () => {

		const serverHerited = new HeritedServer();

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

				runningServer = express()
					.use(server.appMiddleware)
					.get("/", (req, res) => {
						res.send(RESPONSE_CONTENT);
					})
					.listen(PORT, resolve);

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

				}).listen(PORT, resolve);

			}).then(() => {

				return httpRequestTest("/", 200, "OK");

			});

		});

		it("should test app middleware with specific url", () => {

			return new Promise((resolve) => {

				runningServer = express()
					.use(serverHerited.appMiddleware)
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

					if (!serverHerited.httpMiddleware(req, res)) {

						res.writeHead(200, {
							"Content-Type": "text/html; charset=utf-8"
						});

						res.write(RESPONSE_CONTENT);
						res.end();

					}

				}).listen(PORT, resolve);

			}).then(() => {

				return httpRequestTest("/thisisatest", 201, "Created");

			});

		});

	});

});
