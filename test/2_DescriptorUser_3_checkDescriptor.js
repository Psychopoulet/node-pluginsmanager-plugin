"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const LocalDescriptorUser = require(join(__dirname, "utils", "DescriptorUser", "LocalDescriptorUser.js"));

// tests

describe("DescriptorUser / checkDescriptor", () => {

	it("should check without descriptor", (done) => {

		const bootable = new LocalDescriptorUser();

			delete bootable._Descriptor;

		bootable.checkDescriptor().then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

			done();

		});

	});

	it("should check with null descriptor", (done) => {

		const bootable = new LocalDescriptorUser();

			bootable._Descriptor = null;

		bootable.checkDescriptor().then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

			done();

		});

	});

	it("should check with wrong descriptor (string)", (done) => {

		const bootable = new LocalDescriptorUser();

			bootable._Descriptor = "test";

		bootable.checkDescriptor().then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

			done();

		});

	});

	describe("info", () => {

		it("should check without info", (done) => {

			const bootable = new LocalDescriptorUser();

				bootable._Descriptor = {};

			bootable.checkDescriptor().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should check with wrong info", (done) => {

			const bootable = new LocalDescriptorUser();

				bootable._Descriptor = {
					"info": false
				};

			bootable.checkDescriptor().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		describe("title", () => {

			it("should check without title", (done) => {

				const bootable = new LocalDescriptorUser();

					bootable._Descriptor = {
						"info": {}
					};

				bootable.checkDescriptor().then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should check with wrong title", (done) => {

				const bootable = new LocalDescriptorUser();

					bootable._Descriptor = {
						"info": {
							"title": false
						}
					};

				bootable.checkDescriptor().then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should check with empty title", (done) => {

				const bootable = new LocalDescriptorUser();

					bootable._Descriptor = {
						"info": {
							"title": ""
						}
					};

				bootable.checkDescriptor().then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

					done();

				});

			});

		});

		describe("version", () => {

			it("should check without version", (done) => {

				const bootable = new LocalDescriptorUser();

					bootable._Descriptor = {
						"info": {
							"title": "test"
						}
					};

				bootable.checkDescriptor().then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should check with wrong version", (done) => {

				const bootable = new LocalDescriptorUser();

					bootable._Descriptor = {
						"info": {
							"title": "test",
							"version": false
						}
					};

				bootable.checkDescriptor().then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should check with empty version", (done) => {

				const bootable = new LocalDescriptorUser();

					bootable._Descriptor = {
						"info": {
							"title": "test",
							"version": ""
						}
					};

				bootable.checkDescriptor().then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

					done();

				});

			});

		});

		describe("paths", () => {

			it("should check without paths", () => {

				return new LocalDescriptorUser({
					"descriptor": {
						"info": {
							"title": "test",
							"version": "1.0.0"
						}
					}
				}).checkDescriptor();

			});

			it("should check with multiple operationIds into descriptor", (done) => {

				const bootable = new LocalDescriptorUser();

					bootable._Descriptor = {
						"info": {
							"title": "test",
							"version": "1.0.0"
						},
						"paths": {
							"/test": {
								"get": {
									"operationId": "test"
								}
							},
							"/test2": {
								"get": {
									"operationId": "test"
								}
							},
							"/test3": {
								"get": {
									"operationId": "test"
								}
							}
						}
					};

				bootable.checkDescriptor().then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof Error, true, "Generated error is not a Error instance");

					done();

				});

			});

		});

		describe("valid", () => {

			it("should check with valid descriptor", () => {

				return new LocalDescriptorUser({
					"descriptor": {
						"info": {
							"title": "test",
							"version": "1.0.0"
						},
						"paths": {
							"/test": {
								"get": {
									"operationId": "test"
								}
							}
						}
					}
				}).checkDescriptor();

			});

		});

	});

});
