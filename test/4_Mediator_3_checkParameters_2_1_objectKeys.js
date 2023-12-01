"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

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
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

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
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

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
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

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
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

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
