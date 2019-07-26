"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");
	const Events = require("events");

	// locals

	const Bootable = require(join(__dirname, "..", "lib", "components", "Bootable.js"));
	const LocalBootable = require(join(__dirname, "utils", "Bootable", "LocalBootable.js"));

// tests

describe("Bootable", () => {

	it("should test constructor", () => {

		const bootable = new LocalBootable();

		strictEqual(typeof bootable, "object", "Generated bootable is not an object");
		strictEqual(bootable instanceof Events, true, "Generated bootable is not a Events instance");
		strictEqual(bootable instanceof LocalBootable, true, "Generated bootable is not a LocalBootable instance");
		strictEqual(bootable instanceof Bootable, true, "Generated bootable is not a Bootable instance");

	});

	it("should test event", () => {

		return new Promise((resolve, reject) => {

			new LocalBootable()
				.once("error", reject)
				.once("test", resolve)
				.emit("test");

		});

	});

	it("should test init", () => {

		return new LocalBootable().init();

	});

	it("should test non-herited _initWorkSpace", (done) => {

		const nonHerited = new Bootable();

		nonHerited.init().then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test release", () => {

		const bootable = new LocalBootable();

		return bootable.init().then(() => {
			return bootable.release();
		});

	});

	it("should test non-herited _releaseWorkSpace", (done) => {

		const nonHerited = new Bootable();

		nonHerited.release().then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

});
