"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const LocalMediator = require(join(__dirname, "utils", "Mediator", "LocalMediator.js"));

// consts

	const DESCRIPTOR_BASIC = require(join(__dirname, "utils", "DescriptorUser", "DescriptorBasic.js"));

// tests

describe("Mediator / checkParameters / empty", () => {

	it("should test without paths", (done) => {

		new LocalMediator({
			"descriptor": DESCRIPTOR_BASIC
		}).checkParameters("create", {}, {}, "application/json").then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not as expected");
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

			done();

		});

	});

});
