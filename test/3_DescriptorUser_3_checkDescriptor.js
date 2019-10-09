/*
	eslint max-lines: 0
*/

"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const LocalDescriptorUser = require(join(__dirname, "utils", "DescriptorUser", "LocalDescriptorUser.js"));

// consts

	const DESCRIPTOR_BASIC = require(join(
		__dirname, "utils", "DescriptorUser", "DescriptorBasic.js"
	));

// tests

describe("DescriptorUser / checkDescriptor", () => {

	describe("without paths", () => {

		it("should check without descriptor", (done) => {

			const descriptorUser = new LocalDescriptorUser();

				delete descriptorUser._Descriptor;

			descriptorUser.checkDescriptor().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should check with null descriptor", (done) => {

			new LocalDescriptorUser({
				"descriptor": null
			}).checkDescriptor().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should check with wrong descriptor (string)", (done) => {

			new LocalDescriptorUser({
				"descriptor": "test"
			}).checkDescriptor().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should check without paths", () => {

			return new LocalDescriptorUser({
				"descriptor": DESCRIPTOR_BASIC
			}).checkDescriptor();

		});

	});

	describe("with paths", () => {

		it("should check with path which does not start with slash", (done) => {

			new LocalDescriptorUser({
				"descriptor": {
					...DESCRIPTOR_BASIC,
					"paths": {
						"test/test/s": {
							"get": {
								"operationId": "test"
							}
						}
					}
				}
			}).checkDescriptor().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not as expected");

				done();

			});

		});

		it("should check with path which does no start with plugin name", (done) => {

			new LocalDescriptorUser({
				"descriptor": {
					...DESCRIPTOR_BASIC,
					"paths": {
						"/sgvsebrsdtbrdstb/test/s": {
							"get": {
								"operationId": "test"
							}
						}
					}
				}
			}).checkDescriptor().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not as expected");

				done();

			});

		});

		it("should check with paths which contains spaces", (done) => {

			new LocalDescriptorUser({
				"descriptor": {
					...DESCRIPTOR_BASIC,
					"paths": {
						"/test/ test/s": {
							"get": {
								"operationId": "test"
							}
						}
					}
				}
			}).checkDescriptor().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not as expected");

				done();

			});

		});

		it("should check with valid basic descriptor", () => {

			return new LocalDescriptorUser({
				"descriptor": {
					...DESCRIPTOR_BASIC,
					"paths": {
						"/test": {
							"get": {
								"operationId": "test"
							}
						}
					}
				}
			}).checkDescriptor();

		});

	});

});
