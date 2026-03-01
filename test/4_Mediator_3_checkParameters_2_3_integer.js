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

describe("Mediator / checkParameters / integer", () => {

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

		mediator.checkParameters("testInteger", {
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

	it("should test wrong string", (done) => {

		mediator.checkParameters("testInteger", {
			"path": {
				"path-param-integer": "test2"
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

	it("should test float", (done) => {

		mediator.checkParameters("testInteger", {
			"path": {
				"path-param-integer": 1.5
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

	it("should test min", (done) => {

		mediator.checkParameters("testInteger", {
			"path": {
				"path-param-integer": 0
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

	it("should test max", (done) => {

		mediator.checkParameters("testInteger", {
			"path": {
				"path-param-integer": 6
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

	it("should test string", (done) => {

		mediator.checkParameters("testInteger", {
			"path": {
				"path-param-integer": "3"
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

	it("should test valid data", () => {

		return mediator.checkParameters("testInteger", {
			"path": {
				"path-param-integer": 3
			},
			"query": {},
			"headers": {},
			"cookies": {}
		}, "");

	});

});
