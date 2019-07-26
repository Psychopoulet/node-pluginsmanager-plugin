"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");
	const Events = require("events");

	// locals

	const Bootable = require(join(__dirname, "..", "lib", "components", "Bootable.js"));
	const { Mediator } = require(join(__dirname, "..", "lib", "main.js"));
	const LocalMediator = require(join(__dirname, "utils", "Mediator", "LocalMediator.js"));

// tests

describe("Mediator", () => {

	const mediator = new LocalMediator();

	afterEach(() => {
		return mediator.release();
	});

	it("should test constructor", () => {

		strictEqual(typeof mediator, "object", "Generated mediator is not an object");
		strictEqual(mediator instanceof Events, true, "Generated mediator is not a Events instance");
		strictEqual(mediator instanceof Bootable, true, "Generated mediator is not a Bootable instance");
		strictEqual(mediator instanceof Mediator, true, "Generated mediator is not a Mediator instance");
		strictEqual(mediator instanceof LocalMediator, true, "Generated mediator is not a LocalMediator instance");

	});

	it("should test non-herited _initWorkSpace", (done) => {

		const nonHerited = new Mediator();

		nonHerited
			.once("initialized", () => {
				done(new Error("There is no generated Error"));
			})
			.once("error", (err) => {

				strictEqual(nonHerited.initialized, false, "Generated nonHerited is not as expected");

				strictEqual(typeof err, "object", "Generated Error is not as expected");
				strictEqual(err instanceof Error, true, "Generated Error is not as expected");

				done();

			});

		nonHerited.init().catch(done);

	});

	it("should test non-herited _releaseWorkSpace", (done) => {

		const nonHerited = new Mediator();

		nonHerited
			.once("released", () => {
				done(new Error("There is no generated Error"));
			})
			.once("error", (err) => {

				strictEqual(nonHerited.initialized, false, "Generated nonHerited is not as expected");

				strictEqual(typeof err, "object", "Generated Error is not as expected");
				strictEqual(err instanceof Error, true, "Generated Error is not as expected");

				done();

			});

		nonHerited.release().catch(done);

	});

});
