"use strict";

// deps

	// natives
	const { strictEqual, ok } = require("node:assert");
	const { join } = require("node:path");

	// locals

		// plugin
		const LocalMediator = require(join(__dirname, "utils", "Mediator", "LocalMediator.js"));

// consts

	const DESCRIPTOR = require(join(__dirname, "utils", "DescriptorUser", "DescriptorOnlyUrl.js"));

// tests

describe("Mediator / checkParameters / keys", () => {

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

		mediator.checkParameters("testString", {
			"path": {
				"test": "test2"
			},
			"query": {},
			"headers": {},
			"cookies": {}
		}, "").then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not as expected");
			ok(err instanceof ReferenceError, "Generated error is not as expected");

			done();

		});

	});

	it("should test wrong params", (done) => {

		mediator.checkParameters("testString", {
			"path": {
				"path-param-string": false
			},
			"query": {},
			"headers": {},
			"cookies": {}
		}, "").then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not as expected");
			ok(err instanceof TypeError, "Generated error is not as expected");

			done();

		});

	});

	it("should test too short params", (done) => {

		mediator.checkParameters("testString", {
			"path": {
				"path-param-string": ""
			},
			"query": {},
			"headers": {},
			"cookies": {}
		}, "").then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not as expected");
			ok(err instanceof RangeError, "Generated error is not as expected");

			done();

		});

	});

	it("should test too long params", (done) => {

		mediator.checkParameters("testString", {
			"path": {
				"path-param-string": "testtesttesttest"
			},
			"query": {},
			"headers": {},
			"cookies": {}
		}, "").then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not as expected");
			ok(err instanceof RangeError, "Generated error is not as expected");

			done();

		});

	});

	it("should test valid number of params", () => {

		return mediator.checkParameters("testString", {
			"path": {
				"path-param-string": "test2"
			},
			"query": {},
			"headers": {},
			"cookies": {}
		}, "");

	});

});
