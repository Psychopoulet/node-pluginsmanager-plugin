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

describe("Mediator / checkParameters", () => {

	describe("operationId", () => {

		const mediator = new LocalMediator({
			"descriptor": DESCRIPTOR_ONLY_URL
		});

		before(() => {
			return mediator.init();
		});

		after(() => {
			return mediator.release();
		});

		it("should test missing operationId", (done) => {

			mediator.checkParameters().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test wrong operationId", (done) => {

			mediator.checkParameters(false).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test empty operationId", (done) => {

			mediator.checkParameters("").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test unknown operationId", (done) => {

			const descriptor = { ...DESCRIPTOR_ONLY_URL };

			new LocalMediator({
				descriptor
			}).checkParameters("testUnknowOperationId", {
				"path": {},
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

	});

	describe("url parameters", () => {

		const mediator = new LocalMediator({
			"descriptor": require(join(__dirname, "utils", "DescriptorUser", "Descriptor.json"))
		});

		before(() => {
			return mediator.init();
		});

		after(() => {
			return mediator.release();
		});

		it("should test missing parameters", (done) => {

			mediator.checkParameters("create").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test null parameters", (done) => {

			mediator.checkParameters("create", null).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test wrong parameters", (done) => {

			mediator.checkParameters("create", false).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test empty parameters", (done) => {

			mediator.checkParameters("create", {}).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

				done();

			});

		});

		describe("path", () => {

			it("should test missing parameters", (done) => {

				mediator.checkParameters("create", {
					"test": {}
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test null parameters", (done) => {

				mediator.checkParameters("create", {
					"path": null
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test wrong parameters", (done) => {

				mediator.checkParameters("create", {
					"path": false
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

		});

		describe("query", () => {

			it("should test missing parameters", (done) => {

				mediator.checkParameters("create", {
					"path": {}
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test null parameters", (done) => {

				mediator.checkParameters("create", {
					"path": {},
					"query": null
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test wrong parameters", (done) => {

				mediator.checkParameters("create", {
					"path": {},
					"query": false
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

		});

		describe("headers", () => {

			it("should test missing parameters", (done) => {

				mediator.checkParameters("create", {
					"path": {},
					"headers": {}
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test null parameters", (done) => {

				mediator.checkParameters("create", {
					"path": {},
					"headers": {},
					"query": null
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test wrong parameters", (done) => {

				mediator.checkParameters("create", {
					"path": {},
					"headers": {},
					"query": false
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

		});

		describe("cookies", () => {

			it("should test missing parameters", (done) => {

				mediator.checkParameters("create", {
					"path": {},
					"headers": {},
					"query": {}
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test null parameters", (done) => {

				mediator.checkParameters("create", {
					"path": {},
					"headers": {},
					"query": {},
					"cookies": null
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test wrong parameters", (done) => {

				mediator.checkParameters("create", {
					"path": {},
					"headers": {},
					"query": {},
					"cookies": false
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

		});

	});

	describe("body parameters", () => {

		const mediator = new LocalMediator({
			"descriptor": require(join(__dirname, "utils", "DescriptorUser", "Descriptor.json"))
		});

		before(() => {
			return mediator.init();
		});

		after(() => {
			return mediator.release();
		});

		it("should test missing parameters", (done) => {

			mediator.checkParameters("create", {
				"path": {},
				"query": {},
				"headers": {},
				"cookies": {}
			}).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test null parameters", (done) => {

			mediator.checkParameters("create", {
				"path": {},
				"query": {},
				"headers": {},
				"cookies": {}
			}, null).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test wrong parameters", (done) => {

			mediator.checkParameters("create", {
				"path": {},
				"query": {},
				"headers": {},
				"cookies": {}
			}, false).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

	});

	describe("valid", () => {

		const mediator = new LocalMediator({
			"descriptor": DESCRIPTOR_ONLY_URL
		});

		before(() => {
			return mediator.init();
		});

		after(() => {
			return mediator.release();
		});

		it("should test valid url request", () => {

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

});
