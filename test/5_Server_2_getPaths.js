"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const readJSONFile = require(join(__dirname, "..", "lib", "utils", "readJSONFile.js"));

		// utils
		const LocalServer = require(join(__dirname, "utils", "Server", "LocalServer.js"));

// tests

describe("Server / getPaths", () => {

	let descriptor = null;
	let paths = null;

	before(() => {

		return readJSONFile(join(__dirname, "utils", "Descriptor.json")).then((data) => {

			descriptor = data;

			paths = JSON.parse(JSON.stringify(descriptor.paths));

		});

	});

	beforeEach(() => {

		descriptor.paths = paths;

	});

	it("should test without descriptor", (done) => {

		const server = new LocalServer();

		server.getPaths().then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test with descriptor without paths", () => {

		const server = new LocalServer({
			"descriptor": descriptor
		});

			delete server._Descriptor.paths;

		return server.getPaths().then((data) => {

			strictEqual(typeof data, "object", "paths is not an object");
			strictEqual(data instanceof Array, true, "paths is not an Array");
			strictEqual(data.length, 0, "paths is not empty");

		});

	});

	it("should test with descriptor with null paths", () => {

		const server = new LocalServer({
			"descriptor": descriptor
		});

			server._Descriptor.paths = null;

		return server.getPaths().then((data) => {

			strictEqual(typeof data, "object", "paths is not an object");
			strictEqual(data instanceof Array, true, "paths is not an Array");
			strictEqual(data.length, 0, "paths is not empty");

		});

	});

	it("should test with descriptor with empty paths", () => {

		const server = new LocalServer({
			"descriptor": descriptor
		});

			server._Descriptor.paths = {};

		return server.getPaths().then((data) => {

			strictEqual(typeof data, "object", "paths is not an object");
			strictEqual(data instanceof Array, true, "paths is not an Array");
			strictEqual(data.length, 0, "paths is not empty");

		});

	});

	it("should test with valid descriptor", () => {

		const server = new LocalServer({
			"descriptor": descriptor
		});

		return server.getPaths().then((data) => {

			strictEqual(typeof data, "object", "paths is not an object");
			strictEqual(data instanceof Array, true, "paths is not an Array");
			strictEqual(data.length, 2, "paths is empty");

		});

	});

});
