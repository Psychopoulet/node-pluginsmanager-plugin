"use strict";

// deps

	// natives
	const { join } = require("path");
	const assert = require("assert");
	const Events = require("events");

	// locals
	const Bootable = require(join(__dirname, "..", "lib", "components", "Bootable.js"));

// tests

describe("Bootable", () => {

	let bootable = null;

	it("should test constructor", () => {

		bootable = new Bootable();

		assert.strictEqual(typeof bootable, "object", "Generated bootable is not an object");
		assert.strictEqual(bootable instanceof Events, true, "Generated bootable is not a Events instance");
		assert.strictEqual(bootable instanceof Bootable, true, "Generated bootable is not a Bootable instance");

	});

	it("should test event", () => {

		return new Promise((resolve, reject) => {

			bootable
				.once("error", reject)
				.once("test", resolve)
				.emit("test");

		}).then(() => {
			return bootable.release();
		});

	});

	it("should init bootable", () => {
		return bootable.init("test load");
	});

	it("should release bootable", () => {
		return bootable.release("test release");
	});

});
