"use strict";

// deps

	// natives
	const { strictEqual } = require("assert");
	const { join } = require("path");
	const EventEmitter = require("events");

	// locals
	const { extractBody } = require(join(__dirname, "..", "lib", "utils", "request", "main.js"));

// tests

describe("utils / request / extractBody", () => {

	it("should test with missing data", (done) => {

		extractBody().then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

			done();

		});

	});

	it("should test with wrong data", (done) => {

		extractBody(false).then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

			done();

		});

	});

	it("should test with empty object", (done) => {

		extractBody({}).then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

			done();

		});

	});

	describe("on", () => {

		it("should test with missing data", (done) => {

			extractBody({
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

			extractBody({
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

			extractBody({
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

			extractBody({
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

			extractBody({
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

				extractBody({
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

				extractBody({
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

				extractBody(event)
					.then(resolve)
					.catch(reject);

				setTimeout(() => {
					event.emit("end");
				}, 150);

			});

		});

		it("should test with object body", (done) => {

			const data = { "test": "test2" };

			event.headers = {
				"content-length": Buffer.byteLength(JSON.stringify(data))
			};

			extractBody(event)
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

		it("should test with wrong string body", (done) => {

			const data = "{ \"test\": \"test2\"";

			event.headers = {
				"content-length": Buffer.byteLength(data)
			};

			extractBody(event)
				.then(() => {
					done(new Error("There is no generated error"));
				})
				.catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof SyntaxError, true, "Generated error is not as expected");

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

				extractBody(event)
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
