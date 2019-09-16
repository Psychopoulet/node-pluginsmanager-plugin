/*
	eslint max-lines: 0
*/

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

		new LocalDescriptorUser({
			"descriptor": null
		}).checkDescriptor().then(() => {
			done(new Error("There is no generated error"));
		}).catch((err) => {

			strictEqual(typeof err, "object", "Generated error is not an object");
			strictEqual(err instanceof ReferenceError, true, "Generated error is not as expected");

			done();

		});

	});

	it("should check with wrong descriptor (string)", (done) => {

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

		it("should check with path which contains space", (done) => {

			new LocalDescriptorUser({
				"descriptor": {
					"info": {
						"title": "test",
						"version": "1.0.0"
					},
					"paths": {
						"/acaozecnzoejcn/ test/s": {
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
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");

				done();

			});

		});

		it("should check with path which not begin with slash", (done) => {

			new LocalDescriptorUser({
				"descriptor": {
					"info": {
						"title": "test",
						"version": "1.0.0"
					},
					"paths": {
						"test": {
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
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");

				done();

			});

		});

		it("should check with path which not begin with plugin name", (done) => {

			new LocalDescriptorUser({
				"descriptor": {
					"info": {
						"title": "test",
						"version": "1.0.0"
					},
					"paths": {
						"/acaozecnzoejcn": {
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
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");

				done();

			});

		});

		it("should check with multiple operationIds into descriptor", (done) => {

			new LocalDescriptorUser({
				"descriptor": {
					"info": {
						"title": "test",
						"version": "1.0.0"
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
						},
						"/test/test3": {
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
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");

				done();

			});

		});

		it("should check with multiple parameters into descriptor", (done) => {

			new LocalDescriptorUser({
				"descriptor": {
					"info": {
						"title": "test",
						"version": "1.0.0"
					},
					"paths": {
						"/test": {
							"get": {
								"operationId": "test",
								"parameters": [
									{
										"name": "test",
										"in": "path"
									},
									{
										"name": "test",
										"in": "url"
									}
								]
							}
						}
					}
				}
			}).checkDescriptor().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");

				done();

			});

		});

		it("should check inexistant defined path parameter", (done) => {

			new LocalDescriptorUser({
				"descriptor": {
					"info": {
						"title": "test",
						"version": "1.0.0"
					},
					"paths": {
						"/test": {
							"get": {
								"operationId": "test",
								"parameters": [
									{
										"name": "test",
										"in": "path"
									}
								]
							}
						}
					}
				}
			}).checkDescriptor().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not a Error instance");

				done();

			});

		});

		it("should check non-defined existant path parameter", (done) => {

			new LocalDescriptorUser({
				"descriptor": {
					"info": {
						"title": "test",
						"version": "1.0.0"
					},
					"paths": {
						"/test/{id}": {
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
				strictEqual(err instanceof ReferenceError, true, "Generated error is not a Error instance");

				done();

			});

		});

		it("should check non-defined existant path parameter 2", (done) => {

			new LocalDescriptorUser({
				"descriptor": {
					"info": {
						"title": "test",
						"version": "1.0.0"
					},
					"paths": {
						"/test/{id}": {
							"get": {
								"operationId": "test",
								"parameters": [
									{
										"name": "test",
										"in": "path"
									}
								]
							}
						}
					}
				}
			}).checkDescriptor().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not a Error instance");

				done();

			});

		});

		it("should check wrong-formated path parameter", (done) => {

			new LocalDescriptorUser({
				"descriptor": {
					"info": {
						"title": "test",
						"version": "1.0.0"
					},
					"paths": {
						"/test/{id5}": {
							"get": {
								"operationId": "test",
								"parameters": [
									{
										"name": "id5",
										"in": "path"
									}
								]
							}
						}
					}
				}
			}).checkDescriptor().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof Error, true, "Generated error is not a Error instance");

				done();

			});

		});

		it("should check with defined but non required path parameter", (done) => {

			new LocalDescriptorUser({
				"descriptor": {
					"info": {
						"title": "test",
						"version": "1.0.0"
					},
					"paths": {
						"/test/{test}": {
							"get": {
								"operationId": "test",
								"parameters": [
									{
										"name": "test",
										"in": "path"
									}
								]
							}
						}
					}
				}
			}).checkDescriptor().then(() => {
				done(new Error("There is no generated error"));
			}).catch((err) => {

				strictEqual(typeof err, "object", "Generated error is not an object");
				strictEqual(err instanceof ReferenceError, true, "Generated error is not a Error instance");

				done();

			});

		});

	});

	describe("valid", () => {

		it("should check with valid basic descriptor", () => {

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

		it("should check with defined path parameter", () => {

			return new LocalDescriptorUser({
				"descriptor": {
					"info": {
						"title": "test",
						"version": "1.0.0"
					},
					"paths": {
						"/test/{test}": {
							"get": {
								"operationId": "test",
								"parameters": [
									{
										"name": "test",
										"in": "path",
										"required": true
									}
								]
							}
						}
					}
				}
			}).checkDescriptor();

		});

	});

});
