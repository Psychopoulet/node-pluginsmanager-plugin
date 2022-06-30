"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

		// plugin
		const { Mediator, Server } = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));
		const readJSONFile = require(join(__dirname, "..", "lib", "cjs", "utils", "file", "readJSONFile.js"));

// tests

describe("Server / events", () => {

	let descriptor = null;
	const mediator = new Mediator();

	before(() => {

		return readJSONFile.default(join(__dirname, "utils", "DescriptorUser", "Descriptor.json")).then((data) => {
			descriptor = data;
		});

	});

	it("should test events before init", () => {

		const server = new Server({
			descriptor,
			mediator
		});

		return new Promise((resolve) => {

			server
				.once("test", resolve)
				.emit("test");

		});

	});

	it("should test events after init", () => {

		const server = new Server({
			descriptor,
			mediator
		});

		return new Promise((resolve, reject) => {

			server
				.once("test", resolve);

			server.init().then(() => {
				server.emit("test");
			}).catch(reject);

		});

	});

	it("should test events after release", () => {

		const server = new Server({
			descriptor,
			mediator
		});

		return new Promise((resolve, reject) => {

			server.once("test", () => {
				reject(new Error("Should not fire this event"));
			});

			server.init().then(() => {
				return server.release();
			}).then(() => {

				server.emit("test");

				resolve();

			}).catch(reject);

		});

	});

});
