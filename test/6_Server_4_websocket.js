"use strict";

// deps

	// natives
	const { join } = require("path");
	const { parse } = require("url");
	const { strictEqual } = require("assert");
	const { createServer } = require("http");

	// externals
	const WebSocketServer = require("ws").Server;
	const socketIO = require("socket.io");

	// locals
	const socketRequestTest = require(join(__dirname, "utils", "socketRequestTest.js"));
	const socketWaitPush = require(join(__dirname, "utils", "socketWaitPush.js"));
	const HeritedServer = require(join(__dirname, "utils", "Server", "HeritedServer.js"));

// tests

describe("Server / websockets", () => {

	it("should test socket server without server", (done) => {

		let ended = false;

		setTimeout(() => {

			if (!ended) {
				ended = true;
				done();
			}

		}, 500);

		new HeritedServer().on("error", (err) => {

			if (!ended) {
				ended = true;
				done(err);
			}

		}).push("ping", "pong");

	});

	let port = 80;
	let runningServer = null;

	const server = new HeritedServer();

	describe("ws", () => {

		before(() => {

			return server.init().then(() => {

				port = parseInt(parse(server._Descriptor.servers[1].url).port, 10);

				runningServer = new WebSocketServer({
					port
				});

				server.socketMiddleware(runningServer);

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

		it("should test socket server", () => {

			// DebugStep
			let pinged = false;
			server.on("ping", () => {
				pinged = true;
			});

			return socketRequestTest(port, "ping", "pong").then(() => {

				strictEqual(pinged, true, "DebugStep is not as expected");

			});

		});

		it("should test push", () => {

			const COMMAND = "created";
			const DATA = {
				"name": "test"
			};

			return socketWaitPush(port, COMMAND, DATA, () => {
				server.push(COMMAND, DATA);
			});

		});

	});

	describe("socket.io", () => {

		const httpServer = createServer();

		before(() => {

			return server.init().then(() => {

				runningServer = socketIO(httpServer);

				httpServer.listen(port);

				server.socketMiddleware(runningServer);

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

		it("should test socket server without server", (done) => {

			let ended = false;

			setTimeout(() => {

				if (!ended) {
					ended = true;
					done();
				}

			}, 500);

			new HeritedServer().on("error", (err) => {

				if (!ended) {
					ended = true;
					done(err);
				}

			}).push("ping", "pong");

		});

		it("should test socket server", () => {

			// DebugStep
			let pinged = false;
			server.on("ping", () => {
				pinged = true;
			});

			return socketRequestTest(port, "ping", "pong", true).then(() => {

				strictEqual(pinged, true, "DebugStep is not as expected");

			});

		});

		it("should test push", () => {

			const COMMAND = "created";
			const DATA = {
				"name": "test"
			};

			return socketWaitPush(port, COMMAND, DATA, () => {
				server.push(COMMAND, DATA);
			}, true);

		});

	});

});
