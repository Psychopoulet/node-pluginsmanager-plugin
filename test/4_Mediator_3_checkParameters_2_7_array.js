"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const LocalMediator = require(join(__dirname, "utils", "Mediator", "LocalMediator.js"));

// consts

	const DESCRIPTOR = require(join(__dirname, "utils", "DescriptorUser", "DescriptorOnlyBody.js"));

// tests

describe("Mediator / checkParameters / array", () => {

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

		mediator.checkParameters("testArray", {
			"path": {},
			"query": {},
			"headers": {},
			"cookies": {}
		}, JSON.stringify({
			"test": "test2"
		})).then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not as expected");
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

			done();

		});

	});

	it("should test wrong type", (done) => {

		mediator.checkParameters("testArray", {
			"path": {},
			"query": {},
			"headers": {},
			"cookies": {}
		}, JSON.stringify({
			"body-param-array": "test2"
		})).then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not as expected");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

			done();

		});

	});

	it("should test min", (done) => {

		mediator.checkParameters("testArray", {
			"path": {},
			"query": {},
			"headers": {},
			"cookies": {}
		}, JSON.stringify({
			"body-param-array": []
		})).then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not as expected");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

			done();

		});

	});

	it("should test max", (done) => {

		mediator.checkParameters("testArray", {
			"path": {},
			"query": {},
			"headers": {},
			"cookies": {}
		}, JSON.stringify({
			"body-param-array": [ "test", "test", "test", "test", "test", "test" ]
		})).then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not as expected");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

			done();

		});

	});

	it("should test one wrong sub-type", (done) => {

		mediator.checkParameters("testArray", {
			"path": {},
			"query": {},
			"headers": {},
			"cookies": {}
		}, JSON.stringify({
			"body-param-array": [ 3 ]
		})).then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not as expected");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

			done();

		});

	});

	it("should test one wrong sub-type", (done) => {

		mediator.checkParameters("testArray", {
			"path": {},
			"query": {},
			"headers": {},
			"cookies": {}
		}, JSON.stringify({
			"body-param-array": [ "test", 3 ]
		})).then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not as expected");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

			done();

		});

	});

	it("should test valid string data", () => {

		return mediator.checkParameters("testArray", {
			"path": {},
			"query": {},
			"headers": {},
			"cookies": {}
		}, JSON.stringify({
			"body-param-array": [ "test", "test", "test" ]
		}));

	});

});
