/*

"use strict";

// deps

	// natives
	const { join } = require("path");
	const assert = require("assert");
	const Events = require("events");

	// locals
	const Server = require(join(__dirname, "..", "lib", "components", "Server.js"));

// tests

describe("Server", () => {

	let plugin = null;

	it("should test constructor", () => {

		plugin = new Server(__dirname);

		assert.strictEqual(typeof plugin, "object", "Generated plugin is not an object");
		assert.strictEqual(plugin instanceof Server, true, "Generated plugin is not a Server instance");

		assert.strictEqual(typeof plugin.directory, "string", "Generated plugin directory is not a string");
		assert.strictEqual(plugin.directory, __dirname, "Generated plugin directory is not as expected");

		assert.strictEqual(typeof plugin.engines, "object", "Generated plugin engines is not an object");
		assert.strictEqual(typeof plugin.engines.node, "string", "Generated plugin engines node is not a string");
		assert.strictEqual(plugin.engines.node, ">=6.0.0", "Generated plugin engines node is not as expected");

		assert.strictEqual(typeof plugin.license, "string", "Generated plugin license is not a string");
		assert.strictEqual(plugin.license, "MIT", "Generated plugin license is not as expected");

		assert.strictEqual(typeof plugin.main, "string", "Generated plugin main is not a string");
		assert.strictEqual(plugin.main, "lib/main.js", "Generated plugin main is not as expected");

	});

	it("should test event", () => {

		return new Promise((resolve, reject) => {

			plugin
				.once("error", reject)
				.once("test", resolve)
				.emit("test");

		}).then(() => {
			return plugin.unload();
		});

	});

	it("should load data from inexistant directory", (done) => {

		plugin.directory = join(__dirname, "zsgfzeojrfnoaziendfzoe");
		plugin.loadDataFromPackageFile().then(() => {
			done(new Error("Inexistant directory used"));
		}).catch((err) => {

			assert.strictEqual(typeof err, "object", "Generated error is not an object");
			assert.strictEqual(err instanceof Error, true, "Generated error is not an Error instance");

			done();

		});

	});

	it("should load data from inexistant package file", (done) => {

		plugin.directory = join(__dirname);
		plugin.loadDataFromPackageFile().then(() => {
			done(new Error("Inexistant file loaded"));
		}).catch((err) => {

			assert.strictEqual(typeof err, "object", "Generated error is not an object");
			assert.strictEqual(err instanceof Error, true, "Generated error is not an Error instance");

			done();

		});

	});

	it("should load data from package file", () => {

		const DIRECTORY = join(__dirname, "..");

		plugin.directory = DIRECTORY;

		return plugin.loadDataFromPackageFile().then(() => {

			return readJSONFile(join(plugin.directory, "package.json"));

		}).then((data) => {

			// params
			return Promise.resolve().then(() => {

				assert.strictEqual(typeof plugin.directory, "string", "directory is not as expected");
				assert.deepStrictEqual(plugin.directory, DIRECTORY, "directory is not as expected");

				return Promise.resolve();

			// native
			}).then(() => {

				assert.strictEqual(typeof plugin.authors, "object", "authors is not as expected");
				assert.strictEqual(plugin.authors instanceof Array, true, "authors is not as expected");
				assert.deepStrictEqual(plugin.authors, [ data.author ], "authors is not as expected");

				return Promise.resolve();

			}).then(() => {

				assert.strictEqual(typeof plugin.description, "string", "description is not as expected");
				assert.deepStrictEqual(plugin.description, data.description, "description is not as expected");

				return Promise.resolve();

			}).then(() => {

				assert.strictEqual(typeof plugin.dependencies, "object", "dependencies is not as expected");
				assert.deepStrictEqual(plugin.dependencies, data.dependencies, "dependencies is not as expected");

				return Promise.resolve();

			}).then(() => {

				assert.strictEqual(typeof plugin.devDependencies, "object", "devDependencies is not as expected");
				assert.deepStrictEqual(plugin.devDependencies, data.devDependencies, "devDependencies is not as expected");

				return Promise.resolve();

			}).then(() => {

				assert.strictEqual(typeof plugin.engines, "object", "engines is not as expected");
				assert.deepStrictEqual(plugin.engines, data.engines, "engines is not as expected");

				return Promise.resolve();

			}).then(() => {

				assert.strictEqual(typeof plugin.license, "string", "license is not as expected");
				assert.deepStrictEqual(plugin.license, data.license, "license is not as expected");

				return Promise.resolve();

			}).then(() => {

				assert.strictEqual(typeof plugin.main, "string", "main is not as expected");
				assert.deepStrictEqual(plugin.main, data.main, "main is not as expected");

				return Promise.resolve();

			}).then(() => {

				assert.strictEqual(typeof plugin.name, "string", "name is not as expected");
				assert.deepStrictEqual(plugin.name, data.name, "name is not as expected");

				return Promise.resolve();

			}).then(() => {

				assert.strictEqual(typeof plugin.scripts, "object", "scripts is not as expected");
				assert.deepStrictEqual(plugin.scripts, data.scripts, "scripts is not as expected");

				return Promise.resolve();

			}).then(() => {

				assert.strictEqual(typeof plugin.version, "string", "version is not as expected");
				assert.deepStrictEqual(plugin.version, data.version, "version is not as expected");

				return Promise.resolve();

			// specifics
			}).then(() => {

				assert.strictEqual(typeof plugin.designs, "object", "designs is not as expected");
				assert.strictEqual(plugin.designs instanceof Array, true, "designs is not as expected");
				assert.deepStrictEqual(plugin.designs, [ join(DIRECTORY, "styles", "test.css") ], "designs is not as expected");

				return Promise.resolve();

			}).then(() => {

				assert.strictEqual(typeof plugin.javascripts, "object", "javascripts is not as expected");
				assert.strictEqual(plugin.javascripts instanceof Array, true, "javascripts is not as expected");
				assert.deepStrictEqual(plugin.javascripts, [ join(DIRECTORY, "scripts", "test.js") ], "javascripts is not as expected");

				return Promise.resolve();

			}).then(() => {

				assert.strictEqual(typeof plugin.templates, "object", "templates is not as expected");
				assert.strictEqual(plugin.templates instanceof Array, true, "templates is not as expected");
				assert.deepStrictEqual(plugin.templates, [ join(DIRECTORY, "templates", "test.html") ], "templates is not as expected");

				return Promise.resolve();

			});

		});

	});

	it("should init plugin", () => {
		return plugin.init("test init");
	});

	it("should release plugin", () => {
		return plugin.release("test release");
	});

});

*/
