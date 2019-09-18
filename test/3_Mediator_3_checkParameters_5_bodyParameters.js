"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const LocalMediator = require(join(__dirname, "utils", "Mediator", "LocalMediator.js"));

// consts

	const DESCRIPTOR_ONLY_BODY = require(join(__dirname, "utils", "DescriptorUser", "DescriptorOnlyBody.js"));

// tests

describe("Mediator / checkParameters / body parameters content", () => {

	const mediator = new LocalMediator({
		"descriptor": DESCRIPTOR_ONLY_BODY
	});

	before(() => {
		return mediator.init();
	});

	after(() => {
		return mediator.release();
	});

	describe("length", () => {

		it("should test missing body parameter", (done) => {

			mediator.checkParameters("create", {}, {}, "application/json").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test too much url parameter", (done) => {

			mediator.checkParameters("create", {}, {
				"body-param": "test",
				"test": "test"
			}, "application/json").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

	});

});
