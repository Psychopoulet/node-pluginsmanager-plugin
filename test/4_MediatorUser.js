"use strict";

// deps

	// natives
	const { join } = require("path");
	const assert = require("assert");
	const Events = require("events");

	// locals
	const Bootable = require(join(__dirname, "..", "lib", "components", "Bootable.js"));
	const Mediator = require(join(__dirname, "..", "lib", "components", "Mediator.js"));
	const MediatorUser = require(join(__dirname, "..", "lib", "components", "MediatorUser.js"));

// tests

describe("MediatorUser", () => {

	it("should test constructor", () => {

		const mediatorUser = new MediatorUser();

		assert.strictEqual(typeof mediatorUser, "object", "Generated mediatorUser is not an object");
		assert.strictEqual(mediatorUser instanceof Events, true, "Generated mediatorUser is not a Events instance");
		assert.strictEqual(mediatorUser instanceof Bootable, true, "Generated mediatorUser is not a Bootable instance");
		assert.strictEqual(mediatorUser instanceof MediatorUser, true, "Generated mediatorUser is not a MediatorUser instance");

		assert.strictEqual(typeof mediatorUser._Mediator, "object", "Generated mediatorUser _Mediator is not an object");
		assert.strictEqual(mediatorUser._Mediator, null, "Generated mediatorUser _Mediator is not as expected");

	});

	it("should test constructor with Mediator", () => {

		const mediatorUser = new MediatorUser({
			"mediator": new Mediator()
		});

		assert.strictEqual(typeof mediatorUser._Mediator, "object", "Generated mediatorUser _Mediator is not an object");
		assert.strictEqual(mediatorUser._Mediator instanceof Events, true, "Generated mediatorUser _Mediator is not a Events instance");
		assert.strictEqual(mediatorUser._Mediator instanceof Bootable, true, "Generated mediatorUser _Mediator is not a Bootable instance");
		assert.strictEqual(mediatorUser._Mediator instanceof Mediator, true, "Generated mediatorUser _Mediator is not a Mediator instance");

	});

	it("should test event", () => {

		const mediatorUser = new MediatorUser();

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

		return new MediatorUser({
			"mediator": new Mediator()
		}).init("test init");

	});

	it("should release mediatorUser without mediator", () => {

		return new MediatorUser().release("test release");

	});

	it("should release mediatorUser with mediator", () => {

		return new MediatorUser({
			"mediator": new Mediator()
		}).release("test release");

	});

	describe("checkMediator", () => {

		it("should check without mediator", (done) => {

			new MediatorUser().checkMediator().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				assert.strictEqual(typeof err, "object", "Generated error is not an object");
				assert.strictEqual(err instanceof Error, true, "Generated error is not a Error instance");
				assert.strictEqual(err instanceof ReferenceError, true, "Generated error is not a ReferenceError instance");

				done();

			});

		});

		it("should check with wrong mediator", (done) => {

			new MediatorUser({
				"mediator": "test"
			}).checkMediator().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				assert.strictEqual(typeof err, "object", "Generated error is not an object");
				assert.strictEqual(err instanceof Error, true, "Generated error is not a Error instance");
				assert.strictEqual(err instanceof TypeError, true, "Generated error is not a TypeError instance");

				done();

			});

		});

		it("should check with wrong mediator 2", (done) => {

			new MediatorUser({
				"mediator": {}
			}).checkMediator().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				assert.strictEqual(typeof err, "object", "Generated error is not an object");
				assert.strictEqual(err instanceof Error, true, "Generated error is not a Error instance");
				assert.strictEqual(err instanceof TypeError, true, "Generated error is not a TypeError instance");

				done();

			});

		});

		it("should check with wrong mediator 2", (done) => {

			new MediatorUser({
				"mediator": new Mediator()
			}).checkMediator().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				assert.strictEqual(typeof err, "object", "Generated error is not an object");
				assert.strictEqual(err instanceof Error, true, "Generated error is not a Error instance");

				done();

			});

		});

		it("should check with right mediator", () => {

			const mediator = new Mediator();

			return mediator.init().then(() => {

				return new MediatorUser({
					"mediator": mediator
				}).checkMediator();

			});

		});

	});

});
