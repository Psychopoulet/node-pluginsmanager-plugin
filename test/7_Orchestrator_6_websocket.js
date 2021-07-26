/*
	eslint max-nested-callbacks: 0
*/

"use strict";

// deps

	// natives
	const { join } = require("path");
	const { parse } = require("url");
	const { strictEqual } = require("assert");

	// externals
	const WebSocketServer = require("ws").Server;
	const colors = require("colors");

	// locals
	const socketWaitPush = require(join(__dirname, "utils", "socketWaitPush.js"));
	const socketRequestTest = require(join(__dirname, "utils", "socketRequestTest.js"));
	const LocalOrchestrator = require(join(__dirname, "utils", "Orchestrator", "LocalOrchestrator.js"));

// consts

	const MAX_LENGTH_LOGS = 250;

	const HERITED_OPTIONS = {
		"packageFile": join(__dirname, "..", "package.json"),
		"descriptorFile": join(__dirname, "utils", "DescriptorUser", "Descriptor.json"),
		"mediatorFile": join(__dirname, "utils", "Mediator", "HeritedMediator.js"),
		"serverFile": join(__dirname, "utils", "Server", "HeritedServer.js"),
		"logger": (type, log) => {

			let message = MAX_LENGTH_LOGS < log.length ? log.substr(0, MAX_LENGTH_LOGS) + "..." : log;

			switch (type) {

				case "info":
					message = colors.cyan(message);
				break;

				case "success":
					message = colors.green(message);
				break;

				case "warning":
					message = colors.yellow(message);
				break;

				case "error":
					message = colors.red(message);
				break;

				default:
					// nothing to do here
				break;

			}

			(0, console).log(message);

		}
	};

// tests

describe("Orchestrator / websockets", () => {

	describe("without server", () => {

		const orchestrator = new LocalOrchestrator(HERITED_OPTIONS);

		before(() => {

			return orchestrator.load().then(() => {
				return orchestrator.init();
			}).then(() => {

				orchestrator._Server._Descriptor = null;
				orchestrator._Server._descriptorValidated = false;

			});

		});

		after(() => {

			return orchestrator.release().then(() => {
				return orchestrator.destroy();
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

			orchestrator.on("error", (err) => {

				if (!ended) {
					ended = true;
					done(err);
				}

			})._Server.push("ping", "pong");

		});

	});

	describe("with server", () => {

		let port = 80;
		let runningServer = null;

		describe("init before server", () => {

			const orchestrator = new LocalOrchestrator(HERITED_OPTIONS);

			before(() => {

				return orchestrator.load().then(() => {
					return orchestrator.init();
				}).then(() => {

					port = parseInt(parse(orchestrator._Descriptor.servers[1].url).port, 10);

					runningServer = new WebSocketServer({
						port
					});

					orchestrator.socketMiddleware(runningServer);

				});

			});

			after(() => {

				return Promise.resolve().then(() => {

					return runningServer ? new Promise((resolve) => {

						runningServer.close(() => {
							runningServer = null;
							resolve();
						});

					}) : Promise.resolve();

				}).then(() => {
					return orchestrator.release();
				}).then(() => {
					return orchestrator.destroy();
				});

			});

			it("should test socket server", () => {

				return socketRequestTest(port, "ping", "pong");

			});

		});

		describe("init after server", () => {

			const orchestrator = new LocalOrchestrator(HERITED_OPTIONS);

			before(() => {

				runningServer = new WebSocketServer({
					port
				});

				orchestrator.socketMiddleware(runningServer);

				return orchestrator.load().then(() => {
					return orchestrator.init();
				});

			});

			after(() => {

				return Promise.resolve().then(() => {

					return runningServer ? new Promise((resolve) => {

						runningServer.close(() => {
							runningServer = null;
							resolve();
						});

					}) : Promise.resolve();

				}).then(() => {
					return orchestrator.release();
				}).then(() => {
					return orchestrator.destroy();
				});

			});

			it("should test socket server", () => {

				// DebugStep
				let pinged = false;
				orchestrator.on("ping", () => {
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
					orchestrator._Server.push(COMMAND, DATA);
				});

			});

		});

	});

});
