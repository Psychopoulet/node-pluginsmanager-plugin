"use strict";

// deps

	// natives
	const { strictEqual, throws } = require("assert");
	const { join } = require("path");
	const EventEmitter = require("events");

	// locals
	const extractBody = require(join(__dirname, "..", "lib", "cjs", "utils", "request", "extractBody.js"));

// tests

describe("utils / request / extractBody", () => {

	it("should test with missing data", (done) => {

		extractBody.default().then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

			done();

		});

	});

	it("should test with wrong data", (done) => {

		extractBody.default(false).then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

			done();

		});

	});

	it("should test with empty object", (done) => {

		extractBody.default({}).then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

			done();

		});

	});

	describe("on", () => {

		it("should test with missing data", (done) => {

			extractBody.default({
				"test": "test"
			}).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong data", (done) => {

			extractBody.default({
				"on": "test"
			}).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

	});

	describe("headers", () => {

		it("should test with missing data", (done) => {

			extractBody.default({
				"on": () => {
					// nothing to do here
				}
			}).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with wrong data", (done) => {

			extractBody.default({
				"on": () => {
					// nothing to do here
				},
				"headers": "test"
			}).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should test with empty data", (done) => {

			extractBody.default({
				"on": () => {
					// nothing to do here
				},
				"headers": {}
			}).then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

				done();

			});

		});

		describe("content-length", () => {

			it("should test with missing data", (done) => {

				extractBody.default({
					"on": () => {
						// nothing to do here
					},
					"headers": {
						"test": "test"
					}
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should test with wrong data", (done) => {

				extractBody.default({
					"on": () => {
						// nothing to do here
					},
					"headers": {
						"content-length": "test"
					}
				}).then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

		});

	});

	describe("execute", () => {

		const event = new EventEmitter();

		it("should test with empty body", () => {

			event.headers = {
				"content-length": Buffer.byteLength("")
			};

			return new Promise((resolve, reject) => {

				extractBody.default(event)
					.then(resolve)
					.catch(reject);

				setTimeout(() => {
					event.emit("end");
				}, 150);

			});

		});

		it("should test with object body (result is \"[object Object]\", fail on content-lenght)", (done) => {

			const data = { "test1": "test1", "test2": "test2" };

			event.headers = {
				"content-length": Buffer.byteLength(JSON.stringify(data))
			};

			extractBody.default(event)
				.then(() => {
					done(new Error("There is no generated error"));
				})
				.catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof Error, true, "Generated error is not as expected");

					done();

				});

			setTimeout(() => {

				event.emit("data", data);
				event.emit("end");

			}, 150);

		});

		it("should test with string body", () => {

			const data = "{ \"test\": \"test2\" }";

			event.headers = {
				"content-length": Buffer.byteLength(data)
			};

			return new Promise((resolve, reject) => {

				extractBody.default(event)
					.then(resolve)
					.catch(reject);

				setTimeout(() => {

					event.emit("data", data);
					event.emit("end");

				}, 150);

			});

		});

	});

});
