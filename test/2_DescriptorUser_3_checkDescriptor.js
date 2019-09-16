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

// tests

describe("DescriptorUser / checkDescriptor", () => {

	it("should check without descriptor", (done) => {

		const bootable = new LocalDescriptorUser();

			delete bootable._Descriptor;

		bootable.checkDescriptor().then(() => {
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
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

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
			"descriptor": {
				"info": {
					"title": "test",
					"version": "1.0.0"
				}
			}
		}).checkDescriptor();

	});

	it("should check with valid basic descriptor", () => {

		return new LocalDescriptorUser({
			"descriptor": {
				"info": {
					"title": "test",
					"version": "1.0.0"
				},
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
