"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

		// utils
		const LocalOrchestrator = require(join(__dirname, "utils", "Orchestrator", "LocalOrchestrator.js"));

// consts

	const GOOD_OPTIONS = {
		"packageFile": join(__dirname, "..", "package.json"),
		"descriptorFile": join(__dirname, "utils", "DescriptorUser", "Descriptor.json"),
		"mediatorFile": join(__dirname, "utils", "Mediator", "LocalMediator.js"),
		"serverFile": join(__dirname, "..", "lib", "components", "Server.js")
	};

// tests

describe("Orchestrator / events", () => {

	describe("events", () => {

		it("should test events before init", () => {

			const orchestrator = new LocalOrchestrator(GOOD_OPTIONS);

			return Promise.resolve().then(() => {

				return new Promise((resolve) => {

					orchestrator
						.once("test", resolve)
						.emit("test");

				});

			});

		});

		it("should test events after init", () => {

			const orchestrator = new LocalOrchestrator(GOOD_OPTIONS);

			return new Promise((resolve, reject) => {

				orchestrator
					.once("initialized", resolve);

				orchestrator.load().then(() => {
					return orchestrator.init();
				}).catch(reject);

			});

		});

		it("should test events after release", () => {

			const orchestrator = new LocalOrchestrator(GOOD_OPTIONS);

			return new Promise((resolve, reject) => {

				orchestrator
					.once("test", () => {
						reject(new Error("Should not fire this event"));
					})
					.once("released", resolve);

				orchestrator.load().then(() => {
					return orchestrator.init();
				}).then(() => {
					return orchestrator.release();
				}).then(() => {

					orchestrator.emit("test");

					return Promise.resolve();

				}).catch(reject);

			});

		});

	});

});
