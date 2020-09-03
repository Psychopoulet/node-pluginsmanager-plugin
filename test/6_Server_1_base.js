"use strict";

// deps

	// natives
	const { join } = require("path");
	const { deepStrictEqual, strictEqual } = require("assert");
	const Events = require("events");

	// locals

		// plugin
		const { DescriptorUser, MediatorUser, Mediator, Server } = require(join(__dirname, "..", "lib", "components", "main.js"));
		const { readJSONFile } = require(join(__dirname, "..", "lib", "utils", "file", "main.js"));

// tests

describe("Server", () => {

	let descriptor = null;

	before(() => {

		return readJSONFile(join(__dirname, "utils", "DescriptorUser", "Descriptor.json")).then((data) => {
			descriptor = data;
		});

	});

	it("should test constructor", () => {

		const server = new Server();

		strictEqual(typeof server, "object", "Generated server is not an object");
		strictEqual(server instanceof Events, true, "Generated server is not a Events instance");
		strictEqual(server instanceof DescriptorUser, true, "Generated server is not a DescriptorUser instance");
		strictEqual(server instanceof MediatorUser, true, "Generated server is not a MediatorUser instance");
		strictEqual(server instanceof Server, true, "Generated server is not a Server instance");

	});

	it("should init server without Descriptor or Mediator", (done) => {

		const server = new Server();

		strictEqual(typeof server._Descriptor, "object", "Generated server _Descriptor is not an object");
		strictEqual(server._Descriptor, null, "Generated server _Descriptor is not null");
		strictEqual(typeof server._Mediator, "object", "Generated server _Mediator is not an object");
		strictEqual(server._Mediator, null, "Generated server _Mediator is not null");

		server.init("test init").then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should init server without Mediator with Descriptor", (done) => {

		const server = new Server({
			descriptor
		});

		strictEqual(typeof server._Descriptor, "object", "Generated server _Descriptor is not an object");
		deepStrictEqual(server._Descriptor, descriptor, "Generated server _Descriptor is not as expected");
		strictEqual(typeof server._Mediator, "object", "Generated server _Mediator is not an object");
		strictEqual(server._Mediator, null, "Generated server _Mediator is not null");

		server.init("test init").then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should init server without Descriptor with Mediator", (done) => {

		const mediator = new Mediator();
		const server = new Server({
			mediator
		});

		strictEqual(typeof server._Descriptor, "object", "Generated server _Descriptor is not an object");
		strictEqual(server._Descriptor, null, "Generated server _Descriptor is not null");
		strictEqual(typeof server._Mediator, "object", "Generated server _Mediator is not an object");
		strictEqual(server._Mediator instanceof Events, true, "Generated server _Mediator is not a Events instance");
		strictEqual(server._Mediator instanceof DescriptorUser, true, "Generated server _Mediator is not a DescriptorUser instance");
		strictEqual(server._Mediator instanceof Mediator, true, "Generated server _Mediator is not a Mediator instance");

		server.init("test init").then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test non-herited _initWorkSpace", () => {
		return new Server()._initWorkSpace();
	});

	it("should init server with Descriptor and Mediator", () => {

		const mediator = new Mediator();
		const server = new Server({
			descriptor,
			mediator
		});

		strictEqual(typeof server._Descriptor, "object", "Generated server _Descriptor is not an object");
		deepStrictEqual(server._Descriptor, descriptor, "Generated server _Descriptor is not as expected");
		strictEqual(typeof server._Mediator, "object", "Generated server _Mediator is not an object");
		strictEqual(server._Mediator instanceof Events, true, "Generated server _Mediator is not a Events instance");
		strictEqual(server._Mediator instanceof DescriptorUser, true, "Generated server _Mediator is not a DescriptorUser instance");
		strictEqual(server._Mediator instanceof Mediator, true, "Generated server _Mediator is not a Mediator instance");

		return server.init("test init");

	});

	it("should test non-herited _releaseWorkSpace", () => {
		return new Server()._releaseWorkSpace();
	});

	it("should release server", () => {
		return new Server().release("test release");
	});

});
