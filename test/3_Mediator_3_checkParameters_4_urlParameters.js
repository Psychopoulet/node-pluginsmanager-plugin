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

	describe("length", () => {

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
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

	});

	describe("types", () => {

		describe("boolean", () => {

			it("should test wrong data", (done) => {

				mediator.checkParameters("testBoolean", {
					"path-param-boolean": 1
				}, {}, "application/json").then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test string data", () => {

				return mediator.checkParameters("testBoolean", {
					"path-param-boolean": "true"
				}, {}, "application/json").then((parsedData) => {

					strictEqual(typeof parsedData, "object", "Parsed data is not as expected");
					strictEqual(typeof parsedData["path-param-boolean"], "boolean", "Sended data is not as expected");
					strictEqual(parsedData["path-param-boolean"], true, "Sended data is not as expected");

				});

			});

			it("should test boolean data", () => {

				return mediator.checkParameters("testBoolean", {
					"path-param-boolean": true
				}, {}, "application/json").then((parsedData) => {

					strictEqual(typeof parsedData, "object", "Parsed data is not as expected");
					strictEqual(typeof parsedData["path-param-boolean"], "boolean", "Sended data is not as expected");
					strictEqual(parsedData["path-param-boolean"], true, "Sended data is not as expected");

				});

			});

		});

		describe("integer", () => {

			it("should test wrong data", (done) => {

				mediator.checkParameters("testInteger", {
					"path-param-integer": false
				}, {}, "application/json").then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test string data", () => {

				return mediator.checkParameters("testInteger", {
					"path-param-integer": "1"
				}, {}, "application/json").then((parsedData) => {

					strictEqual(typeof parsedData, "object", "Parsed data is not as expected");
					strictEqual(typeof parsedData["path-param-integer"], "number", "Sended data is not as expected");
					strictEqual(parsedData["path-param-integer"], 1, "Sended data is not as expected");

				});

			});

			it("should test integer data", () => {

				return mediator.checkParameters("testInteger", {
					"path-param-integer": 1
				}, {}, "application/json").then((parsedData) => {

					strictEqual(typeof parsedData, "object", "Parsed data is not as expected");
					strictEqual(typeof parsedData["path-param-integer"], "number", "Sended data is not as expected");
					strictEqual(parsedData["path-param-integer"], 1, "Sended data is not as expected");

				});

			});

		});

		describe("number", () => {

			it("should test wrong data", (done) => {

				mediator.checkParameters("testNumber", {
					"path-param-number": false
				}, {}, "application/json").then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test string data", () => {

				return mediator.checkParameters("testNumber", {
					"path-param-number": "1.1"
				}, {}, "application/json").then((parsedData) => {

					strictEqual(typeof parsedData, "object", "Parsed data is not as expected");
					strictEqual(typeof parsedData["path-param-number"], "number", "Sended data is not as expected");
					strictEqual(parsedData["path-param-number"], 1.1, "Sended data is not as expected");

				});

			});

			it("should test number data", () => {

				return mediator.checkParameters("testNumber", {
					"path-param-number": 1.1
				}, {}, "application/json").then((parsedData) => {

					strictEqual(typeof parsedData, "object", "Parsed data is not as expected");
					strictEqual(typeof parsedData["path-param-number"], "number", "Sended data is not as expected");
					strictEqual(parsedData["path-param-number"], 1.1, "Sended data is not as expected");

				});

			});

		});

	});

});
