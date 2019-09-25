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

	const mediator = new LocalMediator({
		"descriptor": DESCRIPTOR_ONLY_URL
	});

	before(() => {
		return mediator.init();
	});

	after(() => {
		return mediator.release();
	});

	describe("operationId", () => {

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

			const descriptor = JSON.parse(JSON.stringify(DESCRIPTOR_ONLY_URL));
			delete descriptor.paths["/test/{path-param-string}"].get.operationId;

			new LocalMediator({
				"descriptor": descriptor
			}).checkParameters("testString", {}, {}, "application/json").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

	});

	describe("url parameters", () => {

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

	});

	describe("body parameters", () => {

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

	describe("contentType", () => {

		it("should test missing contentType", (done) => {

			mediator.checkParameters("create", {}, {}).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test wrong contentType", (done) => {

			mediator.checkParameters("create", {}, {}, false).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test empty contentType", (done) => {

			mediator.checkParameters("create", {}, {}, "").then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not as expected");
				strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

				done();

			});

		});

	});

});
