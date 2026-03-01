"use strict";

// deps

	// natives
	const { strictEqual, ok } = require("node:assert");
	const { join } = require("node:path");

	// locals

		// plugin
		const LocalMediator = require(join(__dirname, "utils", "Mediator", "LocalMediator.js"));

// consts

	const DESCRIPTOR = require(join(__dirname, "utils", "DescriptorUser", "DescriptorInheritance.js"));

// tests

describe("Mediator / checkParameters / inheritance", () => {

	const mediator = new LocalMediator({
		"descriptor": DESCRIPTOR
	});

	before(() => {
		return mediator.init();
	});

	after(() => {
		return mediator.release();
	});

	it("should test missing params", (done) => {

		mediator.checkParameters("testInheritance", {
			"path": {},
			"query": {},
			"headers": {},
			"cookies": {}
		}, {
			"test": "test2"
		}).then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not as expected");
			ok(err instanceof ReferenceError, "Generated error is not as expected");

			done();

		});

	});

	it("should test wrong type", (done) => {

		mediator.checkParameters("testInheritance", {
			"path": {},
			"query": {},
			"headers": {},
			"cookies": {}
		}, {
			"doors": "test",
			"wheels": {
				"count": 4
			}
		}).then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not as expected");
			ok(err instanceof TypeError, "Generated error is not as expected");

			done();

		});

	});

	it("should test out of maximum", (done) => {

		mediator.checkParameters("testInheritance", {
			"path": {},
			"query": {},
			"headers": {},
			"cookies": {}
		}, {
			"doors": {
				"count": 6
			},
			"wheels": {
				"count": 4
			}
		}).then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not as expected");
			ok(err instanceof RangeError, "Generated error is not as expected");

			done();

		});

	});

	it("should test valid string data", () => {

		return mediator.checkParameters("testInheritance", {
			"path": {},
			"query": {},
			"headers": {},
			"cookies": {}
		}, {
			"doors": {
				"count": 4
			},
			"wheels": {
				"count": 4
			}
		});

	});

});
