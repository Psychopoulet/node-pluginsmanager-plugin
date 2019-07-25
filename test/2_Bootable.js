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

	const bootable = new LocalBootable();

	afterEach(() => {
		return bootable.release();
	});

	it("should test constructor", () => {

		strictEqual(typeof bootable, "object", "Generated bootable is not an object");
		strictEqual(bootable instanceof Events, true, "Generated bootable is not a Events instance");
		strictEqual(bootable instanceof LocalBootable, true, "Generated bootable is not a LocalBootable instance");
		strictEqual(bootable instanceof Bootable, true, "Generated bootable is not a Bootable instance");

		strictEqual(typeof bootable.initialized, "boolean", "Generated mediator initialized is not a boolean");
		strictEqual(bootable.initialized, false, "Generated mediator initialized is not as expected");

	});

	it("should test event", () => {

		return new Promise((resolve, reject) => {

			bootable
				.once("error", reject)
				.once("test", resolve)
				.emit("test");

		});

	});

	it("should test non-herited init", (done) => {

		new Bootable().init().then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test init", () => {

		return new Promise((resolve, reject) => {

			bootable
				.once("error", reject)
				.once("initialized", resolve);

			bootable.init().catch(reject);

		}).then(() => {

			strictEqual(bootable.initialized, true, "Generated bootable is not as expected");

			return Promise.resolve();

		});

	});

	it("should test non-herited release", (done) => {

		new Bootable().release().then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test release", () => {

		return bootable.init().then(() => {

			return new Promise((resolve, reject) => {

				bootable
					.once("error", reject)
					.once("released", resolve);

				bootable.release().catch(reject);

			});

		}).then(() => {

			strictEqual(bootable.initialized, false, "Generated bootable is not as expected");

			return Promise.resolve();

		});

	});

});
