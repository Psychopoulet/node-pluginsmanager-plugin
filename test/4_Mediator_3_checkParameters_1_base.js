/*
	eslint max-lines: 0
*/

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
			"descriptor": DESCRIPTOR_ONLY_URL
		});

		before(() => {
			return mediator.init();
		});

		after(() => {
			return mediator.release();
		});

		it("should test missing parameters", () => {
			return mediator.checkParameters("testNoParameter");
		});

		it("should test null parameters", (done) => {

			mediator.checkParameters("testNoParameter", null).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test wrong parameters", (done) => {

			mediator.checkParameters("testNoParameter", false).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test empty parameters", () => {
			return mediator.checkParameters("testNoParameter", {});
		});

		describe("path", () => {

			it("should test missing object", (done) => {

				mediator.checkParameters("testPathMissingParameter", {}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test null parameters", () => {

				mediator.checkParameters("testPathMissingParameter", {
					"path": null
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test wrong parameters", (done) => {

				mediator.checkParameters("testPathMissingParameter", {
					"path": false
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test missing parameters", (done) => {

				mediator.checkParameters("testPathMissingParameter", {
					"path": {}
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test valid parameters", () => {

				return mediator.checkParameters("testPathMissingParameter", {
					"path": {
                        "needed-param": "test"
                    }
				});

			});

		});

		describe("query", () => {

			it("should test missing object", (done) => {

				mediator.checkParameters("testQueryMissingParameter", {}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test null parameters", () => {

				mediator.checkParameters("testQueryMissingParameter", {
					"query": null
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test wrong parameters", (done) => {

				mediator.checkParameters("testQueryMissingParameter", {
					"query": false
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test missing parameters", (done) => {

				mediator.checkParameters("testQueryMissingParameter", {
					"query": {}
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test valid parameters", () => {

				return mediator.checkParameters("testQueryMissingParameter", {
					"query": {
                        "needed-param": "test"
                    }
				});

			});

		});

		describe("headers", () => {

			it("should test missing object", (done) => {

				mediator.checkParameters("testHeaderMissingParameter", {}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test null parameters", () => {

				mediator.checkParameters("testHeaderMissingParameter", {
					"headers": null
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test wrong parameters", (done) => {

				mediator.checkParameters("testHeaderMissingParameter", {
					"headers": false
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test missing parameters", (done) => {

				mediator.checkParameters("testHeaderMissingParameter", {
					"headers": {}
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test valid parameters", () => {

				return mediator.checkParameters("testHeaderMissingParameter", {
					"headers": {
                        "needed-param": "test"
                    }
				});

			});

		});

		describe("cookies", () => {

			it("should test missing object", (done) => {

				mediator.checkParameters("testCookieMissingParameter", {}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test null parameters", () => {

				mediator.checkParameters("testCookieMissingParameter", {
					"cookies": null
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test wrong parameters", (done) => {

				mediator.checkParameters("testCookieMissingParameter", {
					"cookies": false
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test missing parameters", (done) => {

				mediator.checkParameters("testCookieMissingParameter", {
					"cookies": {}
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not as expected");
					strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test valid parameters", () => {

				return mediator.checkParameters("testCookieMissingParameter", {
					"cookies": {
                        "needed-param": "test"
                    }
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

			mediator.checkParameters("create", {}).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test null parameters", (done) => {

			mediator.checkParameters("create", {}, null).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test wrong parameters", (done) => {

			mediator.checkParameters("create", {}, false).then(() => {
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
