"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const DescriptorUser = require(join(__dirname, "..", "lib", "components", "DescriptorUser.js"));
		const LocalDescriptorUser = require(join(__dirname, "utils", "DescriptorUser", "LocalDescriptorUser.js"));

// tests

describe("DescriptorUser / init", () => {

	it("should test non-herited _initWorkSpace", (done) => {

		const nonHerited = new DescriptorUser();

		nonHerited._initWorkSpace().then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test non-herited init", (done) => {

		const nonHerited = new DescriptorUser();

		nonHerited.init().then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test _initWorkSpace", () => {
		return new LocalDescriptorUser()._initWorkSpace();
	});

	it("should test init", () => {
		return new LocalDescriptorUser().init();
	});

});
