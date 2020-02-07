"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

		// plugin
		const LocalMediator = require(join(__dirname, "utils", "Mediator", "LocalMediator.js"));

// consts

	const DESCRIPTOR_ONLY_URL = require(join(__dirname, "utils", "DescriptorUser", "DescriptorOnlyUrl.js"));

// tests

describe("Mediator / events", () => {

	it("should test events before init", () => {

		const mediator = new LocalMediator();

		return new Promise((resolve) => {

			mediator
				.once("test", resolve)
				.emit("test");

		});

	});

	it("should test events after init", () => {

		const mediator = new LocalMediator({
			"descriptor": DESCRIPTOR_ONLY_URL
		});

		return new Promise((resolve, reject) => {

			mediator
				.once("initialized", resolve);

			mediator.init().catch(reject);

		});

	});

	it("should test events after release", () => {

		const mediator = new LocalMediator({
			"descriptor": DESCRIPTOR_ONLY_URL
		});

		return new Promise((resolve, reject) => {

			mediator
				.once("test", () => {
					reject(new Error("Should not fire this event"));
				})
				.once("released", resolve);

			mediator.init().then(() => {
				return mediator.release();
			}).then(() => {

				mediator.emit("test");

				return Promise.resolve();

			}).catch(reject);

		});

	});

});
