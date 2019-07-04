"use strict";

// deps

	// natives
	const { join } = require("path");
	const assert = require("assert");
	const Events = require("events");

	// locals
	const Bootable = require(join(__dirname, "..", "lib", "components", "Bootable.js"));
	const Mediator = require(join(__dirname, "..", "lib", "components", "Mediator.js"));

// tests

describe("Mediator", () => {

	let mediator = null;

	it("should test constructor", () => {

		mediator = new Mediator();

		assert.strictEqual(typeof mediator, "object", "Generated mediator is not an object");
		assert.strictEqual(mediator instanceof Events, true, "Generated mediator is not a Events instance");
		assert.strictEqual(mediator instanceof Bootable, true, "Generated mediator is not a Bootable instance");
		assert.strictEqual(mediator instanceof Mediator, true, "Generated mediator is not a Mediator instance");

		assert.strictEqual(typeof mediator.initialized, "boolean", "Generated mediator initialized is not a boolean");
		assert.strictEqual(mediator.initialized, false, "Generated mediator initialized is not as expected");

	});

	it("should test event", () => {

		return new Promise((resolve, reject) => {

			mediator
				.once("error", reject)
				.once("test", resolve)
				.emit("test");

		}).then(() => {
			return mediator.release();
		});

	});

	it("should init mediator", () => {

		assert.strictEqual(typeof mediator.initialized, "boolean", "Generated mediator initialized is not a boolean");
		assert.strictEqual(mediator.initialized, false, "Generated mediator initialized is not as expected");

		return mediator.init("test init").then(() => {

			assert.strictEqual(typeof mediator.initialized, "boolean", "Generated mediator initialized is not a boolean");
			assert.strictEqual(mediator.initialized, true, "Generated mediator initialized is not as expected");

			return Promise.resolve();

		});

	});

	it("should release mediator", () => {

		assert.strictEqual(typeof mediator.initialized, "boolean", "Generated mediator initialized is not a boolean");
		assert.strictEqual(mediator.initialized, true, "Generated mediator initialized is not as expected");

		return mediator.release("test release").then(() => {

			assert.strictEqual(typeof mediator.initialized, "boolean", "Generated mediator initialized is not a boolean");
			assert.strictEqual(mediator.initialized, false, "Generated mediator initialized is not as expected");

			return Promise.resolve();

		});

	});

});
