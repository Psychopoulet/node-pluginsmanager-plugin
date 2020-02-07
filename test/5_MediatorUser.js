"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");
	const Events = require("events");

	// locals

		// plugin
		const { DescriptorUser, MediatorUser, Mediator } = require(join(__dirname, "..", "lib", "components", "main.js"));

		// utils
		const LocalMediator = require(join(__dirname, "utils", "Mediator", "LocalMediator.js"));
		const LocalMediatorUser = require(join(__dirname, "utils", "MediatorUser", "LocalMediatorUser.js"));

// consts

	const DESCRIPTOR = require(join(__dirname, "utils", "DescriptorUser", "DescriptorOnlyUrl.js"));

// tests

describe("MediatorUser", () => {

	it("should test constructor", () => {

		const mediatorUser = new LocalMediatorUser();

		strictEqual(typeof mediatorUser, "object", "Generated mediatorUser is not an object");
		strictEqual(mediatorUser instanceof Events, true, "Generated mediatorUser is not a Events instance");
		strictEqual(mediatorUser instanceof DescriptorUser, true, "Generated mediatorUser is not a DescriptorUser instance");
		strictEqual(mediatorUser instanceof MediatorUser, true, "Generated mediatorUser is not a MediatorUser instance");
		strictEqual(mediatorUser instanceof LocalMediatorUser, true, "Generated mediatorUser is not a LocalMediatorUser instance");

		strictEqual(typeof mediatorUser._Mediator, "object", "Generated mediatorUser _Mediator is not an object");
		strictEqual(mediatorUser._Mediator, null, "Generated mediatorUser _Mediator is not as expected");

	});

	it("should init mediatorUser", () => {

		return new LocalMediatorUser({
			"mediator": new Mediator()
		}).init("test init");

	});

	it("should test non-herited _initWorkSpace", () => {
		return new MediatorUser()._initWorkSpace();
	});

	it("should release mediatorUser without mediator", () => {

		return new LocalMediatorUser().release("test release");

	});

	it("should test non-herited _releaseWorkSpace", () => {
		return new MediatorUser()._releaseWorkSpace();
	});

	it("should release mediatorUser with mediator", () => {

		return new LocalMediatorUser({
			"mediator": new Mediator()
		}).release("test release");

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

			const mediatorUser = new LocalMediatorUser();

				mediatorUser._Mediator = "test";

			mediatorUser.checkMediator().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");
				strictEqual(err instanceof TypeError, true, "Generated error is not a TypeError instance");

				done();

			});

		});

		it("should check with wrong mediator (object)", (done) => {

			const mediatorUser = new LocalMediatorUser();

				mediatorUser._Mediator = {};

			mediatorUser.checkMediator().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");
				strictEqual(err instanceof TypeError, true, "Generated error is not a TypeError instance");

				done();

			});

		});

		it("should check with right mediator", () => {

			const mediatorUser = new LocalMediatorUser();

				mediatorUser._Mediator = new LocalMediator();

			return mediatorUser.checkMediator();

		});

	});

	describe("events", () => {

		it("should test events before init", () => {

			const mediatorUser = new LocalMediator();

			return new Promise((resolve) => {

				mediatorUser
					.once("test", resolve)
					.emit("test");

			});

		});

		it("should test events after init", () => {

			const mediatorUser = new LocalMediator({
				"descriptor": DESCRIPTOR
			});

			return new Promise((resolve, reject) => {

				mediatorUser
					.once("test", resolve);

				mediatorUser.init().then(() => {
					mediatorUser.emit("test");
				}).catch(reject);

			});

		});

		it("should test events after release", () => {

			const mediatorUser = new LocalMediator({
				"descriptor": DESCRIPTOR
			});

			return new Promise((resolve, reject) => {

				mediatorUser.once("test", () => {
					reject(new Error("Should not fire this event"));
				});

				mediatorUser.init().then(() => {
					return mediatorUser.release();
				}).then(() => {

					mediatorUser.emit("test");

					resolve();

				}).catch(reject);

			});

		});

	});

});
