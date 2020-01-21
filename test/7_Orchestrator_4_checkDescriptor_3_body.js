"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");
	const { homedir } = require("os");
	const { unlink } = require("fs");

	// locals
	const LocalOrchestrator = require(join(__dirname, "utils", "Orchestrator", "LocalOrchestrator.js"));
	const generateDescriptorWithPaths = require(join(__dirname, "utils", "Orchestrator", "generateDescriptorWithPaths.js"));

// consts

	const TMP_DESCRIPTOR = join(homedir(), "tmp_descriptor.json");

// tests

describe("Orchestrator / checkDescriptor / body", () => {

	const orchestrator = new LocalOrchestrator({
		"packageFile": join(__dirname, "..", "package.json"),
		"descriptorFile": TMP_DESCRIPTOR,
		"mediatorFile": join(__dirname, "utils", "Mediator", "LocalMediator.js"),
		"serverFile": join(__dirname, "..", "lib", "components", "Server.js")
	});

	afterEach(() => {

		return orchestrator.release().then(() => {

			return new Promise((resolve, reject) => {

				unlink(TMP_DESCRIPTOR, (err) => {
					return err ? reject(err) : resolve();
				});

			});

		});

	});

	after(() => {
		return orchestrator.destroy();
	});

	it("should check wrong requestBody", () => {

		return generateDescriptorWithPaths({
			"/test": {
				"post": {
					"requestBody": "test",
					"responses": {
						"200": {
							"description": "Everything is fine"
						}
					}
				}
			}
		}, TMP_DESCRIPTOR).then(() => {
			return orchestrator.load();
		}).then(() => {

			return new Promise((resolve, reject) => {

				orchestrator.init().then(() => {
					reject(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof Error, true, "Generated error is not as expected");

					resolve();

				});

			});

		});

	});

	it("should check wrong requestBody content", () => {

		return generateDescriptorWithPaths({
			"/test": {
				"post": {
					"requestBody": {
						"content": "test"
					},
					"responses": {
						"200": {
							"description": "Everything is fine"
						}
					}
				}
			}
		}, TMP_DESCRIPTOR).then(() => {
			return orchestrator.load();
		}).then(() => {

			return new Promise((resolve, reject) => {

				orchestrator.init().then(() => {
					reject(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof Error, true, "Generated error is not as expected");

					resolve();

				});

			});

		});

	});

	it("should check wrong requestBody content contentType", () => {

		return generateDescriptorWithPaths({
			"/test": {
				"post": {
					"requestBody": {
						"content": {
							"application/json": false
						}
					},
					"responses": {
						"200": {
							"description": "Everything is fine"
						}
					}
				}
			}
		}, TMP_DESCRIPTOR).then(() => {
			return orchestrator.load();
		}).then(() => {

			return new Promise((resolve, reject) => {

				orchestrator.init().then(() => {
					reject(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof Error, true, "Generated error is not as expected");

					resolve();

				});

			});

		});

	});

	it("should check wrong requestBody content contentType schema", () => {

		return generateDescriptorWithPaths({
			"/test": {
				"post": {
					"requestBody": {
						"content": {
							"application/json": {
								"schema": false
							}
						}
					},
					"responses": {
						"200": {
							"description": "Everything is fine"
						}
					}
				}
			}
		}, TMP_DESCRIPTOR).then(() => {
			return orchestrator.load();
		}).then(() => {

			return new Promise((resolve, reject) => {

				orchestrator.init().then(() => {
					reject(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof Error, true, "Generated error is not as expected");

					resolve();

				});

			});

		});

	});

	it("should check method for requestBody", () => {

		return generateDescriptorWithPaths({
			"/test": {
				"get": {
					"requestBody": {
						"content": {
							"application/json": {
								"schema": {
									"type": "object",
									"properties": {
										"test": {
											"type": "string"
										}
									}
								}
							}
						}
					},
					"responses": {
						"200": {
							"description": "Everything is fine"
						}
					}
				}
			}
		}, TMP_DESCRIPTOR).then(() => {
			return orchestrator.load();
		}).then(() => {

			return new Promise((resolve, reject) => {

				orchestrator.init().then(() => {
					reject(new Error("There is no generated error"));
				}).catch((err) => {

					strictEqual(typeof err, "object", "Generated error is not an object");
					strictEqual(err instanceof Error, true, "Generated error is not as expected");

					resolve();

				});

			});

		});

	});

});
