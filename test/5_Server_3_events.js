"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

		// plugin
		const { Mediator } = require(join(__dirname, "..", "lib", "main.js"));
		const readJSONFile = require(join(__dirname, "..", "lib", "utils", "readJSONFile.js"));

		// utils
		const LocalServer = require(join(__dirname, "utils", "Server", "LocalServer.js"));

// tests

describe("Server / events", () => {

	let descriptor = null;
	const mediator = new Mediator();

	before(() => {

		return readJSONFile(join(__dirname, "utils", "Descriptor.json")).then((data) => {
			descriptor = data;
		});

	});

	it("should test events before init", () => {

		const server = new LocalServer({
			"descriptor": descriptor,
			"mediator": mediator
		});

		return new Promise((resolve) => {

			server
				.once("test", resolve)
				.emit("test");

		});

	});

	it("should test events after init", () => {

		const server = new LocalServer({
			"descriptor": descriptor,
			"mediator": mediator
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

		const server = new LocalServer({
			"descriptor": descriptor,
			"mediator": mediator
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
