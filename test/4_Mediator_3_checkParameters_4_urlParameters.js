"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const LocalMediator = require(join(__dirname, "utils", "Mediator", "LocalMediator.js"));
		const checkUrlParameters = require(join(__dirname, "..", "lib", "utils", "checkParameters", "checkUrlParameters.js"));

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

			checkUrlParameters({},
				mediator._Descriptor.paths["/test/{path-param-string}"].get.parameters,
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

			checkUrlParameters({
				"path-param-string": "test",
				"test": "test"
			},
				mediator._Descriptor.paths["/test/{path-param-string}"].get.parameters,
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

				checkUrlParameters({
					"path-param-boolean": 1
				},
					mediator._Descriptor.paths["/test/{path-param-boolean}"].get.parameters,
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

				return checkUrlParameters({
					"path-param-boolean": "true"
				},
					mediator._Descriptor.paths["/test/{path-param-boolean}"].get.parameters,
					mediator._Descriptor.components
				).then((parsedData) => {

					strictEqual(typeof parsedData, "object", "Parsed data is not as expected");
					strictEqual(typeof parsedData["path-param-boolean"], "boolean", "Sended data is not as expected");
					strictEqual(parsedData["path-param-boolean"], true, "Sended data is not as expected");

				});

			});

			it("should test boolean data", () => {

				return checkUrlParameters({
					"path-param-boolean": true
				},
					mediator._Descriptor.paths["/test/{path-param-boolean}"].get.parameters,
					mediator._Descriptor.components
				).then((parsedData) => {

					strictEqual(typeof parsedData, "object", "Parsed data is not as expected");
					strictEqual(typeof parsedData["path-param-boolean"], "boolean", "Sended data is not as expected");
					strictEqual(parsedData["path-param-boolean"], true, "Sended data is not as expected");

				});

			});

		});

		describe("integer", () => {

			it("should test wrong data", (done) => {

				checkUrlParameters({
					"path-param-integer": false
				},
					mediator._Descriptor.paths["/test/{path-param-integer}"].get.parameters,
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

				return checkUrlParameters({
					"path-param-integer": "1"
				},
					mediator._Descriptor.paths["/test/{path-param-integer}"].get.parameters,
					mediator._Descriptor.components
				).then((parsedData) => {

					strictEqual(typeof parsedData, "object", "Parsed data is not as expected");
					strictEqual(typeof parsedData["path-param-integer"], "number", "Sended data is not as expected");
					strictEqual(parsedData["path-param-integer"], 1, "Sended data is not as expected");

				});

			});

			it("should test integer data", () => {

				return checkUrlParameters({
					"path-param-integer": 1
				},
					mediator._Descriptor.paths["/test/{path-param-integer}"].get.parameters,
					mediator._Descriptor.components
				).then((parsedData) => {

					strictEqual(typeof parsedData, "object", "Parsed data is not as expected");
					strictEqual(typeof parsedData["path-param-integer"], "number", "Sended data is not as expected");
					strictEqual(parsedData["path-param-integer"], 1, "Sended data is not as expected");

				});

			});

		});

		describe("number", () => {

			it("should test wrong data", (done) => {

				checkUrlParameters({
					"path-param-number": false
				},
					mediator._Descriptor.paths["/test/{path-param-number}"].get.parameters,
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

				return checkUrlParameters({
					"path-param-number": "1.1"
				},
					mediator._Descriptor.paths["/test/{path-param-number}"].get.parameters,
					mediator._Descriptor.components
				).then((parsedData) => {

					strictEqual(typeof parsedData, "object", "Parsed data is not as expected");
					strictEqual(typeof parsedData["path-param-number"], "number", "Sended data is not as expected");
					strictEqual(parsedData["path-param-number"], 1.1, "Sended data is not as expected");

				});

			});

			it("should test number data", () => {

				return checkUrlParameters({
					"path-param-number": 1.1
				},
					mediator._Descriptor.paths["/test/{path-param-number}"].get.parameters,
					mediator._Descriptor.components
				).then((parsedData) => {

					strictEqual(typeof parsedData, "object", "Parsed data is not as expected");
					strictEqual(typeof parsedData["path-param-number"], "number", "Sended data is not as expected");
					strictEqual(parsedData["path-param-number"], 1.1, "Sended data is not as expected");

				});

			});

		});

	});

});
