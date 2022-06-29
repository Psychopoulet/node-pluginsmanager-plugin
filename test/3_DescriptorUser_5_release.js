"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const { DescriptorUser } = require(join(__dirname, "..", "lib", "cjs", "main.cjs"));
		const LocalDescriptorUser = require(join(__dirname, "utils", "DescriptorUser", "LocalDescriptorUser.js"));

// tests

describe("DescriptorUser / release", () => {

	it("should test non-herited _releaseWorkSpace", (done) => {

		const nonHerited = new DescriptorUser();

		nonHerited._releaseWorkSpace().then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test non-herited release", (done) => {

		const nonHerited = new DescriptorUser();

		nonHerited.release().then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	it("should test _releaseWorkSpace", () => {
		return new LocalDescriptorUser()._releaseWorkSpace();
	});

	it("should test release", () => {
		return new LocalDescriptorUser().release();
	});

});
