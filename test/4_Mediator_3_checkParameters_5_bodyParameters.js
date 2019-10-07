/*
	eslint max-lines: 0
*/

"use strict";

// deps

	// natives
	const { join } = require("path");
	const { deepStrictEqual, strictEqual } = require("assert");

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
					"body-param-number": "0.1"
				}, mediator._Descriptor.paths["/test/number"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then((parsedData) => {

					strictEqual(typeof parsedData, "object", "Parsed data is not as expected");
					strictEqual(typeof parsedData["body-param-number"], "number", "Sended data is not as expected");
					strictEqual(parsedData["body-param-number"], 0.1, "Sended data is not as expected");

				});

			});

			it("should test number data", () => {

				return checkBodyParameters({
					"body-param-number": 0.1
				}, mediator._Descriptor.paths["/test/number"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then((parsedData) => {

					strictEqual(typeof parsedData, "object", "Parsed data is not as expected");
					strictEqual(typeof parsedData["body-param-number"], "number", "Sended data is not as expected");
					strictEqual(parsedData["body-param-number"], 0.1, "Sended data is not as expected");

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

			it("should test missing data", (done) => {

				checkBodyParameters({
					"body-param-object": {}
				}, mediator._Descriptor.paths["/test/object"].post.requestBody,
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

			it("should test too much data", (done) => {

				checkBodyParameters({
					"body-param-object": {
						"zefzef": "test"
					}
				}, mediator._Descriptor.paths["/test/object"].post.requestBody,
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

			it("should test object data", () => {

				return checkBodyParameters({
					"body-param-object": {
						"test": "test"
					}
				}, mediator._Descriptor.paths["/test/object"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then((parsedData) => {

					strictEqual(typeof parsedData, "object", "Parsed data is not as expected");
					strictEqual(typeof parsedData["body-param-object"], "object", "Sended data is not as expected");
					deepStrictEqual(parsedData["body-param-object"], {
						"test": "test"
					}, "Sended data is not as expected");

				});

			});

		});

		describe("array", () => {

			it("should test wrong data", (done) => {

				checkBodyParameters({
					"body-param-array": false
				}, mediator._Descriptor.paths["/test/array"].post.requestBody,
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

			/*
			it("should test missing data", (done) => {

				checkBodyParameters({
					"body-param-array": []
				}, mediator._Descriptor.paths["/test/array"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test object data", () => {

				return checkBodyParameters({
					"body-param-array": {
						"test": "test"
					}
				}, mediator._Descriptor.paths["/test/array"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then((parsedData) => {

					strictEqual(typeof parsedData, "array", "Parsed data is not as expected");
					strictEqual(typeof parsedData["body-param-array"], "object", "Sended data is not as expected");
					strictEqual(parsedData["body-param-array"] instanceof Array, true, "Sended data is not as expected");
					deepStrictEqual(parsedData["body-param-array"], [
						{
							"test": "test"
						}
					], "Sended data is not as expected");

				});

			});
			*/

		});

	});

	describe("limits", () => {

		describe("integer", () => {

			it("should test lower data", (done) => {

				checkBodyParameters({
					"body-param-integer": 0
				}, mediator._Descriptor.paths["/test/integer"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test higher data", (done) => {

				checkBodyParameters({
					"body-param-integer": 6
				}, mediator._Descriptor.paths["/test/integer"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

					done();

				});

			});

		});

		describe("number", () => {

			it("should test lower data", (done) => {

				checkBodyParameters({
					"body-param-number": 0
				}, mediator._Descriptor.paths["/test/number"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test higher data", (done) => {

				checkBodyParameters({
					"body-param-number": 0.6
				}, mediator._Descriptor.paths["/test/number"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

					done();

				});

			});

		});

		describe("string", () => {

			it("should test lower data length", (done) => {

				checkBodyParameters({
					"body-param-string": ""
				}, mediator._Descriptor.paths["/test/string"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test higher data length", (done) => {

				checkBodyParameters({
					"body-param-string": "this is a test"
				}, mediator._Descriptor.paths["/test/string"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

					done();

				});

			});

		});

		describe("array", () => {

			it("should test lower data length", (done) => {

				checkBodyParameters({
					"body-param-array": []
				}, mediator._Descriptor.paths["/test/array"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test higher data length", (done) => {

				checkBodyParameters({
					"body-param-array": [ "test", "test", "test", "test", "test", "test" ]
				}, mediator._Descriptor.paths["/test/array"].post.requestBody,
					"application/json",
					mediator._Descriptor.components
				).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

					done();

				});

			});

		});

	});

});
