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

	describe("events", () => {

		it("should test events before init", () => {

			const bootable = new LocalBootable();

			return Promise.resolve().then(() => {

				return new Promise((resolve) => {

					bootable
						.once("test", resolve)
						.emit("test");

				});

			});

		});

		it("should test events after init", () => {

			const bootable = new LocalBootable();

			return new Promise((resolve, reject) => {

				bootable
					.once("test", resolve);

				bootable.init().then(() => {
					bootable.emit("test");
				}).catch(reject);

			});

		});

		it("should test events after release", () => {

			const bootable = new LocalBootable();

			return new Promise((resolve, reject) => {

				bootable.once("test", () => {
					reject(new Error("Should not fire this event"));
				});

				bootable.init().then(() => {
					return bootable.release();
				}).then(() => {

					bootable.emit("test");

					resolve();

				}).catch(reject);

			});

		});

	});

});
