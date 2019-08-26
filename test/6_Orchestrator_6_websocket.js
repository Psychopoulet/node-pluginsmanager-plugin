"use strict";

// deps

	// natives
	const { join } = require("path");
	const { parse } = require("url");

	// externals
	const WebSocketServer = require("ws").Server;

	// locals

		const socketRequestTest = require(join(__dirname, "utils", "socketRequestTest.js"));
		const LocalOrchestrator = require(join(__dirname, "utils", "Orchestrator", "LocalOrchestrator.js"));

// consts

	const HERITED_OPTIONS = {
		"packageFile": join(__dirname, "..", "package.json"),
		"descriptorFile": join(__dirname, "utils", "Descriptor.json"),
		"mediatorFile": join(__dirname, "utils", "Mediator", "HeritedMediator.js"),
		"serverFile": join(__dirname, "utils", "Server", "HeritedServer.js")
	};

// tests

describe("Orchestrator / websockets", () => {

	let runningServer = null;
	const orchestrator = new LocalOrchestrator(HERITED_OPTIONS);

	before(() => {

		return orchestrator.load().then(() => {
			return orchestrator.init();
		}).then(() => {

			const port = parseInt(parse(orchestrator._Descriptor.servers[1].url).port, 10);

			runningServer = new WebSocketServer({
				"port": port
			});

			orchestrator.socketMiddleware(runningServer);

		});

	});

	after(() => {

		return orchestrator.release().then(() => {
			return orchestrator.destroy();
		}).then(() => {

			return runningServer ? new Promise((resolve) => {

				runningServer.close(() => {
					runningServer = null;
					resolve();
				});

			}) : Promise.resolve();

		});

	});

	it("should test socket server", () => {

		return socketRequestTest("ping", "pong");

	});

});
