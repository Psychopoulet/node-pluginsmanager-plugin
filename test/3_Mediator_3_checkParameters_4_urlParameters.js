"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const LocalMediator = require(join(__dirname, "utils", "Mediator", "LocalMediator.js"));

// consts

	const DESCRIPTOR_ONLY_URL = require(join(__dirname, "utils", "DescriptorUser", "DescriptorOnlyUrl.js"));

// tests

describe("Mediator / checkParameters / url parameters content", () => {

	const mediator = new LocalMediator({
		"descriptor": DESCRIPTOR_ONLY_URL
	});

	before(() => {
		return mediator.init();
	});

	after(() => {
		return mediator.release();
	});

	it("should test missing url parameter", (done) => {

		mediator.checkParameters("create", {}, {}, "application/json").then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not as expected");
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

			done();

		});

	});

	it("should test too much url parameter", (done) => {

		mediator.checkParameters("create", {
			"path-param": "test",
			"test": "test"
		}, {}, "application/json").then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not as expected");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

			done();

		});

	});

	it("should test component", () => {

		return mediator.checkParameters("get", {
			"path-param-number": 1
		}, {}, "application/json");

	});

	/*
	it("should test formate", (done) => {

		mediator.checkParameters("get", {
			"path-param-number": "1"
		}, {}, "application/json").then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not as expected");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

			done();

		});

	});
	*/

});
