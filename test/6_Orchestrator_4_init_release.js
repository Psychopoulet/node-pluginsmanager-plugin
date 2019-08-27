"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const { Mediator, Server, Orchestrator } = require(join(__dirname, "..", "lib", "main.js"));

		// utils
		const LocalOrchestrator = require(join(__dirname, "utils", "Orchestrator", "LocalOrchestrator.js"));
		const NonEnabledOrchestrator = require(join(__dirname, "utils", "Orchestrator", "NonEnabledOrchestrator.js"));

// consts

	const EMPTY_CLASS_TEST = join(__dirname, "utils", "EmptyClassTest.js");

	const GOOD_OPTIONS = {
		"packageFile": join(__dirname, "..", "package.json"),
		"descriptorFile": join(__dirname, "utils", "Descriptor.json"),
		"mediatorFile": join(__dirname, "utils", "Mediator", "LocalMediator.js"),
		"serverFile": join(__dirname, "utils", "Server", "LocalServer.js")
	};

// tests

describe("Orchestrator / init & release", () => {

	describe("init", () => {

		it("should init orchestrator with wrong Mediator", (done) => {

			const opt = JSON.parse(JSON.stringify(GOOD_OPTIONS));
			opt.mediatorFile = EMPTY_CLASS_TEST;

			new LocalOrchestrator(opt).init().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");

				done();

			});

		});

		it("should init orchestrator with wrong Server", (done) => {

			const opt = JSON.parse(JSON.stringify(GOOD_OPTIONS));
			opt.serverFile = EMPTY_CLASS_TEST;

			new LocalOrchestrator(opt).init().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");

				done();

			});

		});

		it("should init non enabled orchestrator", () => {

			const orchestrator = new NonEnabledOrchestrator(GOOD_OPTIONS);

			strictEqual(typeof orchestrator.enabled, "boolean", "Generated orchestrator enabled is not a boolean");
			strictEqual(orchestrator.enabled, true, "Generated orchestrator enabled is not as expected");

			return orchestrator.load().then(() => {
				return orchestrator.init();
			}).then(() => {

				strictEqual(typeof orchestrator.enabled, "boolean", "Generated orchestrator enabled is not a boolean");
				strictEqual(orchestrator.enabled, false, "Generated orchestrator enabled is not as expected");

				strictEqual(typeof orchestrator.initialized, "boolean", "Generated orchestrator initialized is not a boolean");
				strictEqual(orchestrator.initialized, false, "Generated orchestrator initialized is not as expected");

				return Promise.resolve();

			});

		});

		it("should test non-herited _initWorkSpace", () => {

			const orchestrator = new Orchestrator(GOOD_OPTIONS);

			return orchestrator.load().then(() => {
				return orchestrator.init();
			});

		});

		it("should test package file loader with wrong Descriptor title", (done) => {

			const orchestrator = new LocalOrchestrator(GOOD_OPTIONS);

				orchestrator._packageFile = join(__dirname, "utils", "Orchestrator", "package_descriptor_title.json");

			orchestrator.load().then(() => {
				return orchestrator.init();
			}).then(() => {
				done(new Error("There is no generated Error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated errors is not an Error");

				done();

			});

		});

		it("should test package file loader with wrong Descriptor version", (done) => {

			const orchestrator = new LocalOrchestrator(GOOD_OPTIONS);

				orchestrator._packageFile = join(__dirname, "utils", "Orchestrator", "package_descriptor_version.json");

			orchestrator.load().then(() => {
				return orchestrator.init();
			}).then(() => {
				done(new Error("There is no generated Error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated errors is not an Error");

				done();

			});

		});

		it("should init orchestrator", () => {

			const orchestrator = new LocalOrchestrator(GOOD_OPTIONS);

			return new Promise((resolve, reject) => {

				orchestrator
					.once("initialized", resolve)
					.once("error", reject);

				orchestrator.load().then(() => {
					return orchestrator.init();
				}).catch(reject);

			}).then(() => {

				strictEqual(typeof orchestrator._Mediator, "object", "Generated orchestrator _Mediator is not an object");
				strictEqual(orchestrator._Mediator instanceof Mediator, true, "Generated orchestrator _Mediator is not as expected");

				strictEqual(typeof orchestrator._Server, "object", "Generated orchestrator _Server is not an object");
				strictEqual(orchestrator._Server instanceof Server, true, "Generated orchestrator _Mediator is not as expected");

				strictEqual(typeof orchestrator.initialized, "boolean", "Generated orchestrator initialized is not a boolean");
				strictEqual(orchestrator.initialized, true, "Generated orchestrator initialized is not as expected");

				return Promise.resolve();

			});

		});

	});

	describe("release", () => {

		it("should release orchestrator", () => {

			const orchestrator = new LocalOrchestrator(GOOD_OPTIONS);

			return orchestrator.load().then(() => {
				return orchestrator.init();
			}).then(() => {
				return orchestrator.release("test release");
			});

		});

		it("should test non-herited _releaseWorkSpace", () => {

			return new Orchestrator().release();

		});

	});

});
