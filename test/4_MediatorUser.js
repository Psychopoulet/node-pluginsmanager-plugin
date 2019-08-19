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

		// plugin
		const Bootable = require(join(__dirname, "..", "lib", "components", "Bootable.js"));
		const MediatorUser = require(join(__dirname, "..", "lib", "components", "MediatorUser.js"));
		const { Mediator } = require(join(__dirname, "..", "lib", "main.js"));

		// utils
		const LocalMediator = require(join(__dirname, "utils", "Mediator", "LocalMediator.js"));
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

	it("should init mediatorUser", () => {

		return new LocalMediatorUser({
			"mediator": new Mediator()
		}).init("test init");

	});

	it("should test non-herited _initWorkSpace", (done) => {

		const nonHerited = new MediatorUser();

		nonHerited.init().then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

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

		nonHerited.release().then(() => {
			done(new Error("There is no generated Error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated Error is not as expected");
			strictEqual(err instanceof Error, true, "Generated Error is not as expected");

			done();

		});

	});

	describe("checkDescriptor", () => {

		it("should check without descriptor", (done) => {

			const mediatorUser = new LocalMediatorUser();

				delete mediatorUser._Descriptor;

			mediatorUser.checkDescriptor().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not a ReferenceError instance");

				done();

			});

		});

		it("should check with null descriptor", (done) => {

			const mediatorUser = new LocalMediatorUser();

				mediatorUser._Descriptor = null;

			mediatorUser.checkDescriptor().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not a ReferenceError instance");

				done();

			});

		});

		it("should check with wrong descriptor (string)", (done) => {

			const mediatorUser = new LocalMediatorUser();

				mediatorUser._Descriptor = "test";

			mediatorUser.checkDescriptor().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");
				strictEqual(err instanceof TypeError, true, "Generated error is not a TypeError instance");

				done();

			});

		});

		it("should check with right descriptor", () => {

			const mediatorUser = new LocalMediatorUser();

				mediatorUser._Descriptor = {};

			return mediatorUser.checkDescriptor();

		});

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

			const mediatorUser = new LocalMediator();

			return new Promise((resolve, reject) => {

				mediatorUser
					.once("test", resolve);

				mediatorUser.init().then(() => {
					mediatorUser.emit("test");
				}).catch(reject);

			});

		});

		it("should test events after release", () => {

			const mediatorUser = new LocalMediator();

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
