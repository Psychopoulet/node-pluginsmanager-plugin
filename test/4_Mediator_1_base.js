"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");
	const Events = require("events");

	// locals

		// plugin
		const { DescriptorUser, Mediator } = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));
		const LocalMediator = require(join(__dirname, "utils", "Mediator", "LocalMediator.js"));

// consts

	const DESCRIPTOR_ONLY_URL = require(join(__dirname, "utils", "DescriptorUser", "DescriptorOnlyUrl.js"));

// tests

describe("Mediator", () => {

	it("should test constructor", () => {

		const mediator = new LocalMediator();

		strictEqual(typeof mediator, "object", "Generated mediator is not an object");
		strictEqual(mediator instanceof Events, true, "Generated mediator is not a Events instance");
		strictEqual(mediator instanceof DescriptorUser, true, "Generated mediator is not a DescriptorUser instance");
		strictEqual(mediator instanceof Mediator, true, "Generated mediator is not a Mediator instance");
		strictEqual(mediator instanceof LocalMediator, true, "Generated mediator is not a LocalMediator instance");

		strictEqual(typeof mediator.initialized, "boolean", "Generated mediator is not as expected");
		strictEqual(mediator.initialized, false, "Generated mediator is not as expected");

	});

	it("should test init", () => {

		const mediator = new LocalMediator({
			"descriptor": DESCRIPTOR_ONLY_URL
		});

		return mediator.init().then(() => {

			strictEqual(typeof mediator.initialized, "boolean", "Generated mediator is not as expected");
			strictEqual(mediator.initialized, true, "Generated mediator is not as expected");

			return Promise.resolve();

		});

	});

	it("should test non-herited _initWorkSpace", (done) => {

		const nonHerited = new Mediator();

		nonHerited.init().then(() => {

			done(new Error("There is no generated Error"));

		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test non-herited _releaseWorkSpace", (done) => {

		const nonHerited = new Mediator();

		nonHerited.release().then(() => {

			done(new Error("There is no generated Error"));

		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test release", () => {

		const mediator = new LocalMediator({
			"descriptor": DESCRIPTOR_ONLY_URL
		});

		return mediator.init().then(() => {

			strictEqual(typeof mediator.initialized, "boolean", "Generated mediator is not as expected");
			strictEqual(mediator.initialized, true, "Generated mediator is not as expected");

			return mediator.release();

		}).then(() => {

			strictEqual(typeof mediator.initialized, "boolean", "Generated mediator is not as expected");
			strictEqual(mediator.initialized, false, "Generated mediator is not as expected");

			return Promise.resolve();

		});

	});

});
