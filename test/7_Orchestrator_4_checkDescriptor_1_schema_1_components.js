"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");
	const { homedir } = require("os");
	const { unlink } = require("fs");

	// locals
	const LocalOrchestrator = require(join(__dirname, "utils", "Orchestrator", "LocalOrchestrator.js"));
	const generateDescriptorWithSchemas = require(join(__dirname, "utils", "Orchestrator", "generateDescriptorWithSchemas.js"));

// consts

	const TMP_DESCRIPTOR = join(homedir(), "tmp_descriptor.json");

// tests

describe("Orchestrator / checkDescriptor / schema / components", () => {

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

	it("should test wrong ref", () => {

		return generateDescriptorWithSchemas({
			"TestObject": {
				"type": "object",
				"properties": {
					"body-param-string": {
						"$ref": 5
					}
				},
				"required": [ "body-param-string" ]
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

	it("should test missing ref", () => {

		return generateDescriptorWithSchemas({
			"TestObject": {
				"type": "object",
				"properties": {
					"body-param-string": {
						"$ref": "#/components/schemas/tazdjnazdojnaozdnaozd"
					}
				},
				"required": [ "body-param-string" ]
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
