/*
	eslint-disable no-sync
*/

"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");
	const Events = require("events");

	// locals

	const Bootable = require(join(__dirname, "..", "lib", "components", "Bootable.js"));
	const { Mediator } = require(join(__dirname, "..", "lib", "main.js"));
	const LocalMediator = require(join(__dirname, "utils", "Mediator", "LocalMediator.js"));
	const MediatorUser = require(join(__dirname, "..", "lib", "components", "MediatorUser.js"));
	const LocalMediatorUser = require(join(__dirname, "utils", "MediatorUser", "LocalMediatorUser.js"));

// tests

describe("MediatorUser", () => {

	it("should test constructor", () => {

		const mediatorUser = new LocalMediatorUser();

		strictEqual(typeof mediatorUser, "object", "Generated mediatorUser is not an object");
		strictEqual(mediatorUser instanceof Events, true, "Generated mediatorUser is not a Events instance");
		strictEqual(mediatorUser instanceof Bootable, true, "Generated mediatorUser is not a Bootable instance");
		strictEqual(mediatorUser instanceof MediatorUser, true, "Generated mediatorUser is not a MediatorUser instance");
		strictEqual(mediatorUser instanceof LocalMediatorUser, true, "Generated mediatorUser is not a LocalMediatorUser instance");

		strictEqual(typeof mediatorUser._Mediator, "object", "Generated mediatorUser _Mediator is not an object");
		strictEqual(mediatorUser._Mediator, null, "Generated mediatorUser _Mediator is not as expected");

	});

	it("should test constructor with Mediator", () => {

		const mediatorUser = new LocalMediatorUser({
			"mediator": new Mediator()
		});

		strictEqual(typeof mediatorUser._Mediator, "object", "Generated mediatorUser _Mediator is not an object");
		strictEqual(mediatorUser._Mediator instanceof Events, true, "Generated mediatorUser _Mediator is not a Events instance");
		strictEqual(mediatorUser._Mediator instanceof Bootable, true, "Generated mediatorUser _Mediator is not a Bootable instance");
		strictEqual(mediatorUser._Mediator instanceof Mediator, true, "Generated mediatorUser _Mediator is not a Mediator instance");

	});

	it("should test event", () => {

		const mediatorUser = new LocalMediatorUser();

		return new Promise((resolve, reject) => {

			mediatorUser
				.once("error", reject)
				.once("test", resolve)
				.emit("test");

		}).then(() => {
			return mediatorUser.release();
		});

	});

	it("should init mediatorUser", () => {

		return new LocalMediatorUser({
			"mediator": new Mediator()
		}).init("test init");

	});

	it("should test non-herited _initWorkSpace", (done) => {

		const nonHerited = new MediatorUser();

		nonHerited
			.once("initialized", () => {
				done(new Error("There is no generated Error"));
			})
			.once("error", (err) => {

				strictEqual(nonHerited.initialized, false, "Generated nonHerited is not as expected");

				strictEqual(typeof err, "object", "Generated Error is not as expected");
				strictEqual(err instanceof Error, true, "Generated Error is not as expected");

				done();

			});

		nonHerited.init().catch(done);

	});

	it("should release mediatorUser without mediator", () => {

		return new LocalMediatorUser().release("test release");

	});

	it("should release mediatorUser with mediator", () => {

		return new LocalMediatorUser({
			"mediator": new Mediator()
		}).release("test release");

	});

	it("should test non-herited _releaseWorkSpace", (done) => {

		const nonHerited = new MediatorUser();

		nonHerited
			.once("released", () => {
				done(new Error("There is no generated Error"));
			})
			.once("error", (err) => {

				strictEqual(nonHerited.initialized, false, "Generated nonHerited is not as expected");

				strictEqual(typeof err, "object", "Generated Error is not as expected");
				strictEqual(err instanceof Error, true, "Generated Error is not as expected");

				done();

			});

		nonHerited.release().catch(done);

	});

	describe("checkMediator", () => {

		it("should check without mediator", (done) => {

			const mediatorUser = new LocalMediatorUser();
			delete mediatorUser._Mediator;

			mediatorUser.checkMediator().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not a ReferenceError instance");

				done();

			});

		});

		it("should check with null mediator", (done) => {

			const mediatorUser = new LocalMediatorUser();
			mediatorUser._Mediator = null;

			mediatorUser.checkMediator().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not a ReferenceError instance");

				done();

			});

		});

		it("should check with wrong mediator (string)", (done) => {

			new LocalMediatorUser({
				"mediator": "test"
			}).checkMediator().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");
				strictEqual(err instanceof TypeError, true, "Generated error is not a TypeError instance");

				done();

			});

		});

		it("should check with wrong mediator (object)", (done) => {

			new LocalMediatorUser({
				"mediator": {}
			}).checkMediator().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");
				strictEqual(err instanceof TypeError, true, "Generated error is not a TypeError instance");

				done();

			});

		});

		it("should check with not initialized mediator", (done) => {

			new LocalMediatorUser({
				"mediator": new Mediator()
			}).checkMediator().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");

				done();

			});

		});

		it("should check with right mediator", () => {

			const mediator = new LocalMediator();

			return mediator.init().then(() => {

				return new LocalMediatorUser({
					"mediator": mediator
				}).checkMediator();

			});

		});

	});

	describe("checkMediatorSync", () => {

		it("should check without mediator", () => {

			const mediatorUser = new LocalMediatorUser();
			delete mediatorUser._Mediator;

			const res = mediatorUser.checkMediatorSync();

			strictEqual(typeof res, "boolean", "Generated result is not as expected");
			strictEqual(res, false, "Generated result is not as expected");

		});

		it("should check with null mediator", () => {

			const mediatorUser = new LocalMediatorUser();
			mediatorUser._Mediator = null;

			const res = mediatorUser.checkMediatorSync();

			strictEqual(typeof res, "boolean", "Generated result is not as expected");
			strictEqual(res, false, "Generated result is not as expected");

		});

		it("should check with wrong mediator (string)", () => {

			const res = new LocalMediatorUser({
				"mediator": "test"
			}).checkMediatorSync();

			strictEqual(typeof res, "boolean", "Generated result is not as expected");
			strictEqual(res, false, "Generated result is not as expected");

		});

		it("should check with wrong mediator (object)", () => {

			const res = new LocalMediatorUser({
				"mediator": {}
			}).checkMediatorSync();

			strictEqual(typeof res, "boolean", "Generated result is not as expected");
			strictEqual(res, false, "Generated result is not as expected");

		});

		it("should check with not initialized mediator", () => {

			const res = new LocalMediatorUser({
				"mediator": new Mediator()
			}).checkMediatorSync();

			strictEqual(typeof res, "boolean", "Generated result is not as expected");
			strictEqual(res, false, "Generated result is not as expected");

		});

		it("should check with right mediator", (done) => {

			const mediator = new LocalMediator();

			mediator.init().then(() => {

				const res = new LocalMediatorUser({
					"mediator": mediator
				}).checkMediatorSync();

				strictEqual(typeof res, "boolean", "Generated result is not as expected");
				strictEqual(res, true, "Generated result is not as expected");

				done();

			});

		});

	});

});
