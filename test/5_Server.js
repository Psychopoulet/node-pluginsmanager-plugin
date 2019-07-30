"use strict";

// deps

	// natives
	const { join } = require("path");
	const { createServer } = require("http");
	const { strictEqual } = require("assert");
	const Events = require("events");
	const WebSocketServer = require("ws").Server;

	// externals
	const express = require("express");

	// locals

	const httpRequestTest = require(join(__dirname, "utils", "httpRequestTest.js"));
	const socketRequestTest = require(join(__dirname, "utils", "socketRequestTest.js"));
	const Bootable = require(join(__dirname, "..", "lib", "components", "Bootable.js"));
	const MediatorUser = require(join(__dirname, "..", "lib", "components", "MediatorUser.js"));
	const { Mediator, Server } = require(join(__dirname, "..", "lib", "main.js"));
	const LocalServer = require(join(__dirname, "utils", "Server", "LocalServer.js"));
	const HeritedServer = require(join(__dirname, "utils", "Server", "HeritedServer.js"));

// consts

	const PORT = 3000;
	const PORT_SOCKET = PORT + 1;
	const RESPONSE_CONTENT = "Hello World";

// tests

describe("Server", () => {

	it("should test constructor", () => {

		const server = new LocalServer();

		strictEqual(typeof server, "object", "Generated server is not an object");
		strictEqual(server instanceof Events, true, "Generated server is not a Events instance");
		strictEqual(server instanceof Bootable, true, "Generated server is not a Bootable instance");
		strictEqual(server instanceof MediatorUser, true, "Generated server is not a MediatorUser instance");
		strictEqual(server instanceof Server, true, "Generated server is not a Server instance");
		strictEqual(server instanceof LocalServer, true, "Generated server is not a LocalServer instance");

	});

	it("should init server without Mediator", (done) => {

		new LocalServer().init("test init").then(() => {

			done(new Error("There is no generated Error"));

		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should init server with Mediator", () => {

		const mediator = new Mediator();

		return new LocalServer({
			"mediator": mediator
		}).init("test init");

	});

	it("should test non-herited _initWorkSpace", (done) => {

		const nonHerited = new Server();

		nonHerited.init().then(() => {

			done(new Error("There is no generated Error"));

		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should release server", () => {
		return new LocalServer().release("test release");
	});

	it("should test non-herited _releaseWorkSpace", (done) => {

		const nonHerited = new Server();

		nonHerited.release().then(() => {

			done(new Error("There is no generated Error"));

		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	describe("network", () => {

		const server = new LocalServer();
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

		it("should test socket server", () => {

			return Promise.resolve().then(() => {

				// DebugStep
				let pinged = false;
				serverHerited.on("ping", () => {
					pinged = true;
				});

				// create server
				const socketServer = new WebSocketServer({
					"port": PORT_SOCKET
				});

				// middleware
				return Promise.resolve().then(() => {

					serverHerited.socketMiddleware(socketServer);

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

	describe("events", () => {

		const mediator = new Mediator();

		it("should test events before init", () => {

			const server = new LocalServer({
				"mediator": mediator
			});

			return new Promise((resolve) => {

				server
					.once("test", resolve)
					.emit("test");

			});

		});

		it("should test events after init", () => {

			const server = new LocalServer({
				"mediator": mediator
			});

			return new Promise((resolve, reject) => {

				server
					.once("test", resolve);

				server.init().then(() => {
					server.emit("test");
				}).catch(reject);

			});

		});

		it("should test events after release", () => {

			const server = new LocalServer({
				"mediator": mediator
			});

			return new Promise((resolve, reject) => {

				server.once("test", () => {
					reject(new Error("Should not fire this event"));
				});

				server.init().then(() => {
					return server.release();
				}).then(() => {

					server.emit("test");

					resolve();

				}).catch(reject);

			});

		});

	});

});
