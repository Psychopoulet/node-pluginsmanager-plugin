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

describe("Orchestrator / checkDescriptor / url", () => {

	const orchestrator = new LocalOrchestrator({
		"packageFile": join(__dirname, "..", "package.json"),
		"descriptorFile": TMP_DESCRIPTOR,
		"mediatorFile": join(__dirname, "utils", "Mediator", "LocalMediator.js"),
		"serverFile": join(__dirname, "utils", "Server", "LocalServer.js")
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

	it("should check wrong parameters", () => {

		return generateDescriptorWithPaths({
			"/test": {
				"get": {
					"parameters": "test",
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

	/*
	@TODO
	it("should check non-defined existant path parameter", () => {

		return generateDescriptorWithPaths({
			"/test/{path-test}": {
				"get": {
					"operationId": "test",
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
	*/

	it("should check inexistant defined path parameter", () => {

		return generateDescriptorWithPaths({
			"/test/{path-test}": {
				"get": {
					"operationId": "test",
					"parameters": [
						{
							"name": "path-test",
							"in": "path"
						}
					],
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

	it("should check with no required data", () => {

		return generateDescriptorWithPaths({
			"/test/{path-test}": {
				"get": {
					"operationId": "test",
					"parameters": [
						{
							"name": "path-test",
							"in": "path",
							"schema": {
								"type": "string"
							}
						}
					],
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

	it("should check with wrong \"in\"", () => {

		return generateDescriptorWithPaths({
			"/test": {
				"get": {
					"operationId": "test",
					"parameters": [
						{
							"name": "path-test",
							"in": "test",
							"schema": {
								"type": "string"
							},
							"required": true
						}
					],
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

	it("should test wrong path reference", () => {

		return generateDescriptorWithPaths({
			"/test/{path-param}": {
				"get": {
					"operationId": "test",
					"parameters": [
						{
							"name": "path-param",
							"in": "path",
							"schema": {
								"$ref": "#/components/parameters/fczeczec"
							},
							"required": true
						}
					],
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
