"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

		// plugin
		const LocalDescriptorUser = require(join(__dirname, "utils", "DescriptorUser", "LocalDescriptorUser.js"));

// tests

describe("DescriptorUser / events", () => {

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
