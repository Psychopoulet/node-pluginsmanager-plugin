"use strict";

// deps

	// natives
	const { join } = require("path");
	const { strictEqual } = require("assert");
	const { homedir } = require("os");
	const { writeFile, unlink } = require("fs");

	// locals

		// plugin
		const readJSONFile = require(join(__dirname, "..", "lib", "utils", "readJSONFile.js"));

		// utils
		const LocalOrchestrator = require(join(__dirname, "utils", "Orchestrator", "LocalOrchestrator.js"));

// consts

	const DESCRIPTOR = join(__dirname, "utils", "DescriptorUser", "Descriptor.json");
	const TMP_DESCRIPTOR = join(homedir(), "tmp_descriptor.json");

// tests

describe("Orchestrator / checkDescriptor / schema / limits", () => {

	let descriptor = null;

	const orchestrator = new LocalOrchestrator({
		"packageFile": join(__dirname, "..", "package.json"),
		"descriptorFile": TMP_DESCRIPTOR,
		"mediatorFile": join(__dirname, "utils", "Mediator", "LocalMediator.js"),
		"serverFile": join(__dirname, "..", "lib", "components", "Server.js")
	});

	before(() => {

		return readJSONFile(DESCRIPTOR).then((d) => {

			descriptor = d;

		});

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

	it("should test wrong integer minimum", () => {

		return new Promise((resolve, reject) => {

			const d = JSON.parse(JSON.stringify(descriptor));

				d.components.schemas.TestInteger = {
					"type": "integer",
					"minimum": false
				};

			writeFile(TMP_DESCRIPTOR, JSON.stringify(d), "utf8", (err) => {
				return err ? reject(err) : resolve();
			});

		}).then(() => {
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

	it("should test wrong integer maximum", () => {

		return new Promise((resolve, reject) => {

			const d = JSON.parse(JSON.stringify(descriptor));

				d.components.schemas.TestInteger = {
					"type": "integer",
					"maximum": false
				};

			writeFile(TMP_DESCRIPTOR, JSON.stringify(d), "utf8", (err) => {
				return err ? reject(err) : resolve();
			});

		}).then(() => {
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

	it("should test wrong number minimum", () => {

		return new Promise((resolve, reject) => {

			const d = JSON.parse(JSON.stringify(descriptor));

				d.components.schemas.TestInteger = {
					"type": "number",
					"minimum": false
				};

			writeFile(TMP_DESCRIPTOR, JSON.stringify(d), "utf8", (err) => {
				return err ? reject(err) : resolve();
			});

		}).then(() => {
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

	it("should test wrong number maximum", () => {

		return new Promise((resolve, reject) => {

			const d = JSON.parse(JSON.stringify(descriptor));

				d.components.schemas.TestInteger = {
					"type": "number",
					"maximum": false
				};

			writeFile(TMP_DESCRIPTOR, JSON.stringify(d), "utf8", (err) => {
				return err ? reject(err) : resolve();
			});

		}).then(() => {
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

	it("should test wrong string minLength", () => {

		return new Promise((resolve, reject) => {

			const d = JSON.parse(JSON.stringify(descriptor));

				d.components.schemas.TestInteger = {
					"type": "string",
					"minLength": false
				};

			writeFile(TMP_DESCRIPTOR, JSON.stringify(d), "utf8", (err) => {
				return err ? reject(err) : resolve();
			});

		}).then(() => {
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

	it("should test wrong string maxLength", () => {

		return new Promise((resolve, reject) => {

			const d = JSON.parse(JSON.stringify(descriptor));

				d.components.schemas.TestInteger = {
					"type": "string",
					"maxLength": false
				};

			writeFile(TMP_DESCRIPTOR, JSON.stringify(d), "utf8", (err) => {
				return err ? reject(err) : resolve();
			});

		}).then(() => {
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