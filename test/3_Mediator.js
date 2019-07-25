"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");
	const Events = require("events");

	// locals
	const Bootable = require(join(__dirname, "..", "lib", "components", "Bootable.js"));
	const Mediator = require(join(__dirname, "..", "lib", "components", "Mediator.js"));
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

});
