"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const LocalMediator = require(join(__dirname, "utils", "Mediator", "LocalMediator.js"));
		const checkBodyParameters = require(join(__dirname, "..", "lib", "utils", "checkParameters", "checkBodyParameters.js"));

// consts

	const DESCRIPTOR_ONLY_BODY = require(join(__dirname, "utils", "DescriptorUser", "DescriptorOnlyBody.js"));

// tests

describe("Mediator / checkParameters / body parameters content", () => {

	const mediator = new LocalMediator({
		"descriptor": DESCRIPTOR_ONLY_BODY
	});

	before(() => {
		return mediator.init();
	});

	after(() => {
		return mediator.release();
	});

	describe("length", () => {

		it("should test missing body parameter", (done) => {

			checkBodyParameters({},
				mediator._Descriptor.paths["/test/string"].post.requestBody,
				"application/json",
				mediator._Descriptor.components
			).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test too much url parameter", (done) => {

			checkBodyParameters({
				"body-param-string": "test",
				"test": "test"
			}, mediator._Descriptor.paths["/test/string"].post.requestBody,
				"application/json",
				mediator._Descriptor.components
			).then(() => {
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

				checkBodyParameters({
					"body-param-boolean": 1
				}, mediator._Descriptor.paths["/test/boolean"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test string data", () => {

				return checkBodyParameters({
					"body-param-boolean": "true"
				}, mediator._Descriptor.paths["/test/boolean"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then((parsedData) => {

					strictEqual(typeof parsedData, "object", "Parsed data is not as expected");
					strictEqual(typeof parsedData["body-param-boolean"], "boolean", "Sended data is not as expected");
					strictEqual(parsedData["body-param-boolean"], true, "Sended data is not as expected");

				});

			});

			it("should test boolean data", () => {

				return checkBodyParameters({
					"body-param-boolean": true
				}, mediator._Descriptor.paths["/test/boolean"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then((parsedData) => {

					strictEqual(typeof parsedData, "object", "Parsed data is not as expected");
					strictEqual(typeof parsedData["body-param-boolean"], "boolean", "Sended data is not as expected");
					strictEqual(parsedData["body-param-boolean"], true, "Sended data is not as expected");

				});

			});

		});

		describe("integer", () => {

			it("should test wrong data", (done) => {

				checkBodyParameters({
					"body-param-integer": false
				}, mediator._Descriptor.paths["/test/integer"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test string data", () => {

				return checkBodyParameters({
					"body-param-integer": "1"
				}, mediator._Descriptor.paths["/test/integer"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then((parsedData) => {

					strictEqual(typeof parsedData, "object", "Parsed data is not as expected");
					strictEqual(typeof parsedData["body-param-integer"], "number", "Sended data is not as expected");
					strictEqual(parsedData["body-param-integer"], 1, "Sended data is not as expected");

				});

			});

			it("should test integer data", () => {

				return checkBodyParameters({
					"body-param-integer": 1
				}, mediator._Descriptor.paths["/test/integer"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then((parsedData) => {

					strictEqual(typeof parsedData, "object", "Parsed data is not as expected");
					strictEqual(typeof parsedData["body-param-integer"], "number", "Sended data is not as expected");
					strictEqual(parsedData["body-param-integer"], 1, "Sended data is not as expected");

				});

			});

		});

		describe("number", () => {

			it("should test wrong data", (done) => {

				checkBodyParameters({
					"body-param-number": false
				}, mediator._Descriptor.paths["/test/number"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test string data", () => {

				return checkBodyParameters({
					"body-param-number": "1.1"
				}, mediator._Descriptor.paths["/test/number"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then((parsedData) => {

					strictEqual(typeof parsedData, "object", "Parsed data is not as expected");
					strictEqual(typeof parsedData["body-param-number"], "number", "Sended data is not as expected");
					strictEqual(parsedData["body-param-number"], 1.1, "Sended data is not as expected");

				});

			});

			it("should test number data", () => {

				return checkBodyParameters({
					"body-param-number": 1.1
				}, mediator._Descriptor.paths["/test/number"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then((parsedData) => {

					strictEqual(typeof parsedData, "object", "Parsed data is not as expected");
					strictEqual(typeof parsedData["body-param-number"], "number", "Sended data is not as expected");
					strictEqual(parsedData["body-param-number"], 1.1, "Sended data is not as expected");

				});

			});

		});

		describe("object", () => {

			it("should test wrong data", (done) => {

				checkBodyParameters({
					"body-param-object": false
				}, mediator._Descriptor.paths["/test/object"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

			// @TODO create recurive tests (empty = required)

		});

		describe("array", () => {
			// @TODO create Array tests
		});

	});

	/*
	describe("limits", () => {

		describe("integer", () => {

			it("should test lower data", (done) => {

				checkBodyParameters({
					"body-param-object": false
				}, mediator._Descriptor.paths["/test/object"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

		});

		describe("number", () => {
		});

		describe("object", () => {
		});

	});
	*/

});
