"use strict";

// deps

	// natives
	const { join } = require("path");
	const { parse } = require("url");
	const { strictEqual } = require("assert");

	// externals
	const WebSocketServer = require("ws").Server;

	// locals

		// utils
		const socketRequestTest = require(join(__dirname, "utils", "socketRequestTest.js"));
		const HeritedServer = require(join(__dirname, "utils", "Server", "HeritedServer.js"));

// tests

describe("Server / websockets", () => {

	let runningServer = null;
	const server = new HeritedServer();

	before(() => {

		return server.init().then(() => {

			const port = parseInt(parse(server._Descriptor.servers[1].url).port, 10);

			runningServer = new WebSocketServer({
				"port": port
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

		return Promise.resolve().then(() => {

			// DebugStep
			let pinged = false;
			server.on("ping", () => {
				pinged = true;
			});

			return socketRequestTest("ping", "pong").then(() => {

				strictEqual(pinged, true, "DebugStep is not as expected");

			});

		});

	});

});
