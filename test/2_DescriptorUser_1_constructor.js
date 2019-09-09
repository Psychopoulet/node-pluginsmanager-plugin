"use strict";

// deps

	// natives
	const { join } = require("path");
	const { deepStrictEqual, strictEqual } = require("assert");
	const Events = require("events");

	// locals

		// plugin
		const DescriptorUser = require(join(__dirname, "..", "lib", "components", "DescriptorUser.js"));
		const LocalDescriptorUser = require(join(__dirname, "utils", "DescriptorUser", "LocalDescriptorUser.js"));

// tests

describe("DescriptorUser / constructor", () => {

	it("should test constructor without parameters", () => {

		const bootable = new LocalDescriptorUser();

		strictEqual(typeof bootable, "object", "Generated bootable is not an object");
		strictEqual(bootable instanceof Events, true, "Generated bootable is not a Events instance");
		strictEqual(bootable instanceof LocalDescriptorUser, true, "Generated bootable is not a LocalDescriptorUser instance");
		strictEqual(bootable instanceof DescriptorUser, true, "Generated bootable is not a DescriptorUser instance");

		strictEqual(typeof bootable._Descriptor, "object", "Generated bootable _Descriptor is not an object");
		strictEqual(bootable._Descriptor, null, "Generated bootable _Descriptor is not as expected");

		strictEqual(
			typeof bootable._externalRessourcesDirectory, "string",
			"Generated bootable _externalRessourcesDirectory is not a string"
		);
		strictEqual(
			bootable._externalRessourcesDirectory, "",
			"Generated bootable _externalRessourcesDirectory is not as expected"
		);

	});

	it("should test constructor with descriptor", () => {

		const bootable = new LocalDescriptorUser({
			"descriptor": {
				"test": "test"
			}
		});

		strictEqual(typeof bootable._Descriptor, "object", "Generated bootable _Descriptor is not an object");
		deepStrictEqual(bootable._Descriptor, {
			"test": "test"
		}, "Generated bootable _Descriptor is not as expected");

	});

	it("should test constructor with externalRessourcesDirectory", () => {

		const bootable = new LocalDescriptorUser({
			"externalRessourcesDirectory": __dirname
		});

		strictEqual(
			typeof bootable._externalRessourcesDirectory, "string",
			"Generated bootable _externalRessourcesDirectory is not a string"
		);
		strictEqual(
			bootable._externalRessourcesDirectory, __dirname,
			"Generated bootable _externalRessourcesDirectory is not as expected"
		);

	});

	describe("init", () => {

		it("should test non-herited _initWorkSpace", (done) => {

			const nonHerited = new DescriptorUser();

			nonHerited._initWorkSpace().then(() => {
				done(new Error("There is no generated Error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated Error is not as expected");
				strictEqual(err instanceof Error, true, "Generated Error is not as expected");

				done();

			});

		});

		it("should test non-herited init", (done) => {

			const nonHerited = new DescriptorUser();

			nonHerited.init().then(() => {
				done(new Error("There is no generated Error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated Error is not as expected");
				strictEqual(err instanceof Error, true, "Generated Error is not as expected");

				done();

			});

		});

		it("should test _initWorkSpace", () => {
			return new LocalDescriptorUser()._initWorkSpace();
		});

		it("should test init", () => {
			return new LocalDescriptorUser().init();
		});

	});

	describe("release", () => {

		it("should test non-herited _releaseWorkSpace", (done) => {

			const nonHerited = new DescriptorUser();

			nonHerited._releaseWorkSpace().then(() => {
				done(new Error("There is no generated Error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated Error is not as expected");
				strictEqual(err instanceof Error, true, "Generated Error is not as expected");

				done();

			});

		});

		it("should test non-herited release", (done) => {

			const nonHerited = new DescriptorUser();

			nonHerited.release().then(() => {
				done(new Error("There is no generated Error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated Error is not as expected");
				strictEqual(err instanceof Error, true, "Generated Error is not as expected");

				done();

			});

		});

		it("should test _releaseWorkSpace", () => {
			return new LocalDescriptorUser()._releaseWorkSpace();
		});

		it("should test release", () => {
			return new LocalDescriptorUser().release();
		});

	});

	describe("events", () => {

		it("should test events before init", () => {

			const bootable = new LocalDescriptorUser();

			return new Promise((resolve) => {

				bootable
					.once("test", resolve)
					.emit("test");

			});

		});

		it("should test events after init", () => {

			const bootable = new LocalDescriptorUser();

			return new Promise((resolve, reject) => {

				bootable
					.once("test", resolve);

				bootable.init().then(() => {
					bootable.emit("test");
				}).catch(reject);

			});

		});

		it("should test events after release", () => {

			const bootable = new LocalDescriptorUser();

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
