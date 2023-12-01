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

describe("Mediator / checkParameters / number", () => {

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

		mediator.checkParameters("testNumber", {
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

	it("should test wrong string", (done) => {

		mediator.checkParameters("testNumber", {
			"path": {
				"path-param-number": "test2"
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

	it("should test min", (done) => {

		mediator.checkParameters("testNumber", {
			"path": {
				"path-param-number": 0.9
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

	it("should test max", (done) => {

		mediator.checkParameters("testNumber", {
			"path": {
				"path-param-number": 1.6
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

	it("should test string", (done) => {

		mediator.checkParameters("testNumber", {
			"path": {
				"path-param-number": "1.3"
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

	it("should test valid data", () => {

		return mediator.checkParameters("testNumber", {
			"path": {
				"path-param-number": 1.3
			},
			"query": {},
			"headers": {},
			"cookies": {}
		}, "");

	});

});
