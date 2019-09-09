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
		const socketWaitPush = require(join(__dirname, "utils", "socketWaitPush.js"));
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

	it("should test socket server without server", (done) => {

		new HeritedServer().on("error", (err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		}).push("ping", "pong");

	});

	it("should test socket server", () => {

		// DebugStep
		let pinged = false;
		server.on("ping", () => {
			pinged = true;
		});

		return socketRequestTest("ping", "pong").then(() => {

			strictEqual(pinged, true, "DebugStep is not as expected");

		});

	});

	it("should test push", () => {

		const COMMAND = "created";
		const DATA = {
			"name": "test"
		};

		return socketWaitPush(COMMAND, DATA, () => {
			server.push(COMMAND, DATA);
		});

	});

});
