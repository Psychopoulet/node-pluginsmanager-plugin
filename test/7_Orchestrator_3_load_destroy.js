/*
	eslint-disable max-statements
*/

"use strict";

// deps

	// natives
	const { join } = require("path");
	const { deepStrictEqual, strictEqual } = require("assert");

	// locals

		// plugin
		const readJSONFile = require(join(__dirname, "..", "lib", "cjs", "utils", "file", "readJSONFile.js"));

		// utils
		const LocalOrchestrator = require(join(__dirname, "utils", "Orchestrator", "LocalOrchestrator.js"));

// consts

	const GOOD_OPTIONS = {
		"packageFile": join(__dirname, "..", "package.json"),
		"descriptorFile": join(__dirname, "utils", "DescriptorUser", "Descriptor.json"),
		"mediatorFile": join(__dirname, "utils", "Mediator", "LocalMediator.js"),
		"serverFile": join(__dirname, "utils", "Server", "LocalServer.js")
	};

// tests

describe("Orchestrator / load & destroy", () => {

	describe("load", () => {

		it("should test package file loader", () => {

			const orchestrator = new LocalOrchestrator(GOOD_OPTIONS);

			return orchestrator.load().then(() => {

				strictEqual(typeof orchestrator._Mediator, "object", "Generated orchestrator _Mediator is not an object");
				strictEqual(orchestrator._Mediator, null, "Generated orchestrator _Mediator is not as expected");

				strictEqual(typeof orchestrator._Server, "object", "Generated orchestrator _Server is not an object");
				strictEqual(orchestrator._Server, null, "Generated orchestrator _Server is not as expected");

				// params

				strictEqual(typeof orchestrator._packageFile, "string", "Generated orchestrator _packageFile is not a string");
				strictEqual(orchestrator._packageFile, GOOD_OPTIONS.packageFile, "Generated orchestrator _packageFile is not as expected");

				strictEqual(typeof orchestrator._mediatorFile, "string", "Generated orchestrator _mediatorFile is not a string");
				strictEqual(orchestrator._mediatorFile, GOOD_OPTIONS.mediatorFile, "Generated orchestrator _mediatorFile is not as expected");

				strictEqual(typeof orchestrator._serverFile, "string", "Generated orchestrator _serverFile is not a string");
				strictEqual(orchestrator._serverFile, GOOD_OPTIONS.serverFile, "Generated orchestrator _serverFile is not as expected");

				// extended

				strictEqual(typeof orchestrator._extended, "object", "Generated orchestrator extended is not an object");
				strictEqual(orchestrator._extended instanceof Array, true, "Generated orchestrator extended is not an Array");
				deepStrictEqual(orchestrator._extended, [
					"type",
					"typings",
					"exports",
					"files",
					"optionalDependencies",
					"husky",
					"keywords",
					"homepage",
					"repository",
					"bugs"
				], "Generated orchestrator extended is not as expected");

				return readJSONFile.default(GOOD_OPTIONS.packageFile);

			}).then((data) => {

				// native

				strictEqual(typeof orchestrator.authors, "object", "Generated orchestrator authors is not an object");
				strictEqual(orchestrator.authors instanceof Array, true, "Generated orchestrator authors is not an Array");
				deepStrictEqual(orchestrator.authors, [ data.author ], "Generated orchestrator authors is not as expected");

				strictEqual(typeof orchestrator.description, "string", "Generated orchestrator description is not a string");
				strictEqual(orchestrator.description, data.description, "Generated orchestrator description is not as expected");

				strictEqual(typeof orchestrator.dependencies, "object", "Generated orchestrator dependencies is not an object");
				deepStrictEqual(orchestrator.dependencies, data.dependencies, "Generated orchestrator dependencies is not as expected");

				strictEqual(typeof orchestrator.devDependencies, "object", "Generated orchestrator devDependencies is not an object");
				deepStrictEqual(orchestrator.devDependencies, data.devDependencies, "Generated orchestrator devDependencies is not as expected");

				strictEqual(typeof orchestrator.engines, "object", "Generated orchestrator engines is not an object");
				deepStrictEqual(orchestrator.engines, data.engines, "Generated orchestrator engines is not as expected");

				strictEqual(typeof orchestrator.license, "string", "Generated orchestrator license is not a string");
				strictEqual(orchestrator.license, data.license, "Generated orchestrator license is not as expected");

				strictEqual(typeof orchestrator.main, "string", "Generated orchestrator main is not a string");
				strictEqual(orchestrator.main, data.main, "Generated orchestrator main is not as expected");

				strictEqual(typeof orchestrator.name, "string", "Generated orchestrator name is not a string");
				strictEqual(orchestrator.name, data.name, "Generated orchestrator name is not as expected");

				strictEqual(typeof orchestrator.scripts, "object", "Generated orchestrator scripts is not an object");
				deepStrictEqual(orchestrator.scripts, data.scripts, "Generated orchestrator scripts is not as expected");

				strictEqual(typeof orchestrator.version, "string", "Generated orchestrator version is not a string");
				strictEqual(orchestrator.version, data.version, "Generated orchestrator version is not as expected");

				return Promise.resolve();

			});

		});

		it("should test package file loader with multiple authors", () => {

			const orchestrator = new LocalOrchestrator(GOOD_OPTIONS);

				orchestrator._packageFile = join(__dirname, "utils", "Orchestrator", "package_authors_and_author.json");

			return orchestrator.load().then(() => {

				strictEqual(typeof orchestrator.authors, "object", "Generated orchestrator authors is not an object");
				strictEqual(orchestrator.authors instanceof Array, true, "Generated orchestrator authors is not an Array");
				deepStrictEqual(orchestrator.authors, [
					"Sébastien VIDAL",
					"Fabien VIDAL"
				], "Generated orchestrator authors is not as expected");

				return Promise.resolve();

			});

		});

	});

	describe("destroy", () => {

		it("should destroy orchestrator", () => {

			const orchestrator = new LocalOrchestrator(GOOD_OPTIONS);

			return orchestrator.load().then(() => {

				return orchestrator.destroy();

			}).then(() => {

				// params

				strictEqual(typeof orchestrator._packageFile, "string", "Generated orchestrator _packageFile is not a string");
				strictEqual(orchestrator._packageFile, "", "Generated orchestrator _packageFile is not as expected");

				strictEqual(typeof orchestrator._mediatorFile, "string", "Generated orchestrator _mediatorFile is not a string");
				strictEqual(orchestrator._mediatorFile, "", "Generated orchestrator _mediatorFile is not as expected");

				strictEqual(typeof orchestrator._serverFile, "string", "Generated orchestrator _serverFile is not a string");
				strictEqual(orchestrator._serverFile, "", "Generated orchestrator _serverFile is not as expected");

				// extended

				strictEqual(typeof orchestrator._extended, "object", "Generated orchestrator extended is not an object");
				strictEqual(orchestrator._extended instanceof Array, true, "Generated orchestrator extended is not an Array");
				deepStrictEqual(orchestrator._extended, [], "Generated orchestrator extended is not as expected");

				// native

				strictEqual(typeof orchestrator.authors, "object", "Generated orchestrator authors is not an object");
				strictEqual(orchestrator.authors instanceof Array, true, "Generated orchestrator authors is not an Array");
				deepStrictEqual(orchestrator.authors, [], "Generated orchestrator authors is not as expected");

				strictEqual(typeof orchestrator.description, "string", "Generated orchestrator description is not a string");
				strictEqual(orchestrator.description, "", "Generated orchestrator description is not as expected");

				strictEqual(typeof orchestrator.dependencies, "object", "Generated orchestrator dependencies is not an object");
				strictEqual(orchestrator.dependencies, null, "Generated orchestrator dependencies is not as expected");

				strictEqual(typeof orchestrator.devDependencies, "object", "Generated orchestrator devDependencies is not an object");
				strictEqual(orchestrator.devDependencies, null, "Generated orchestrator devDependencies is not as expected");

				strictEqual(typeof orchestrator.engines, "object", "Generated orchestrator engines is not an object");
				strictEqual(orchestrator.engines, null, "Generated orchestrator engines is not as expected");

				strictEqual(typeof orchestrator.license, "string", "Generated orchestrator license is not a string");
				strictEqual(orchestrator.license, "", "Generated orchestrator license is not as expected");

				strictEqual(typeof orchestrator.main, "string", "Generated orchestrator main is not a string");
				strictEqual(orchestrator.main, "", "Generated orchestrator main is not as expected");

				strictEqual(typeof orchestrator.name, "string", "Generated orchestrator name is not a string");
				strictEqual(orchestrator.name, "", "Generated orchestrator name is not as expected");

				strictEqual(typeof orchestrator.scripts, "object", "Generated orchestrator scripts is not an object");
				strictEqual(orchestrator.scripts, null, "Generated orchestrator scripts is not as expected");

				strictEqual(typeof orchestrator.version, "string", "Generated orchestrator version is not a string");
				strictEqual(orchestrator.version, "", "Generated orchestrator version is not as expected");

				return Promise.resolve();

			});

		});

	});

});
