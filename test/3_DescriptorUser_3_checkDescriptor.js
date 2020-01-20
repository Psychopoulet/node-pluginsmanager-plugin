/*
	eslint max-nested-callbacks: 0
*/

"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");

	// locals

		// plugin
		const LocalDescriptorUser = require(join(__dirname, "utils", "DescriptorUser", "LocalDescriptorUser.js"));

// consts

	const DESCRIPTOR = require(join(
		__dirname, "utils", "DescriptorUser", "DescriptorBasic.js"
	));

// tests

describe("DescriptorUser / checkDescriptor", () => {

	it("should check without Descriptor", (done) => {

		const descriptorUser = new LocalDescriptorUser();

			delete descriptorUser._Descriptor;

		descriptorUser.checkDescriptor().then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

			done();

		});

	});

	it("should check with null Descriptor", (done) => {

		new LocalDescriptorUser({
			"descriptor": null
		}).checkDescriptor().then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

			done();

		});

	});

	it("should check with wrong Descriptor (string)", (done) => {

		new LocalDescriptorUser({
			"descriptor": "test"
		}).checkDescriptor().then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

			done();

		});

	});

	it("should check with empty Descriptor", (done) => {

		new LocalDescriptorUser({
			"descriptor": {}
		}).checkDescriptor().then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

			done();

		});

	});

	describe("info", () => {

		it("should check with missing Descriptor info", (done) => {

			new LocalDescriptorUser({
				"descriptor": {
					"test": "test"
				}
			}).checkDescriptor().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should check with wrong Descriptor info (string)", (done) => {

			new LocalDescriptorUser({
				"descriptor": {
					"info": "test"
				}
			}).checkDescriptor().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

				done();

			});

		});

		it("should check with empty Descriptor info", (done) => {

			new LocalDescriptorUser({
				"descriptor": {
					"info": {}
				}
			}).checkDescriptor().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

				done();

			});

		});

		describe("title", () => {

			it("should check with missing Descriptor info title", (done) => {

				new LocalDescriptorUser({
					"descriptor": {
						"info": {
							"test": "test"
						}
					}
				}).checkDescriptor().then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should check with wrong Descriptor info title (boolean)", (done) => {

				new LocalDescriptorUser({
					"descriptor": {
						"info": {
							"title": true
						}
					}
				}).checkDescriptor().then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should check with empty Descriptor info title", (done) => {

				new LocalDescriptorUser({
					"descriptor": {
						"info": {
							"title": ""
						}
					}
				}).checkDescriptor().then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should check with UpperCase Descriptor info title", (done) => {

				new LocalDescriptorUser({
					"descriptor": {
						"info": {
							"title": "Test"
						}
					}
				}).checkDescriptor().then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof Error, true, "Generated error is not as expected");

					done();

				});

			});

		});

		describe("version", () => {

			it("should check with missing Descriptor info version", (done) => {

				new LocalDescriptorUser({
					"descriptor": {
						"info": {
							"title": "test"
						}
					}
				}).checkDescriptor().then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should check with wrong Descriptor info version (boolean)", (done) => {

				new LocalDescriptorUser({
					"descriptor": {
						"info": {
							"title": "test",
							"version": true
						}
					}
				}).checkDescriptor().then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof TypeError, true, "Generated error is not as expected");

					done();

				});

			});

			it("should check with empty Descriptor info version", (done) => {

				new LocalDescriptorUser({
					"descriptor": {
						"info": {
							"title": "test",
							"version": ""
						}
					}
				}).checkDescriptor().then(() => {
					done(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof RangeError, true, "Generated error is not as expected");

					done();

				});

			});

		});

	});

	describe("paths", () => {

		it("should check with mutliple operatorIds", (done) => {

			new LocalDescriptorUser({
				"descriptor": {
					"info": {
						"title": "test",
						"version": ""
					},
					"paths": {
						"/test/test1": {
							"get": {
								"operationId": "test"
							}
						},
						"/test/test2": {
							"get": {
								"operationId": "test"
							}
						}
					}
				}
			}).checkDescriptor().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not as expected");

				done();

			});

		});

	});

	describe("correct", () => {

		it("should check with valid basic Descriptor", () => {

			return new LocalDescriptorUser({
				"descriptor": DESCRIPTOR
			}).checkDescriptor();

		});

	});

});
