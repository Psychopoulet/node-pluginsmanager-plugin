/*
	eslint class-methods-use-this: 0
*/

"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const isFile = require(join(__dirname, "isFile.js"));
	const isDirectory = require(join(__dirname, "isDirectory.js"));
	const readJSONFile = require(join(__dirname, "readJSONFile.js"));

// module

module.exports = class Plugin extends require("events") {

	constructor (directory) {

		super();

		// params
		this.directory = directory;

		// native
		this.authors = [];
		this.description = "";
		this.dependencies = {};
		this.devDependencies = {};
		this.engines = {
			"node": ">=6.0.0"
		};
		this.license = "MIT";
		this.main = "lib/main.js";
		this.name = "";
		this.scripts = {};
		this.version = "";

		// specifics
		this.designs = [];
		this.javascripts = [];
		this.templates = [];

	}

	// read

	loadDataFromPackageFile () {

		// check directory
		return isDirectory(this.directory).then((exists) => {

			return exists ? Promise.resolve() :
				Promise.reject(new Error("\"" + this.directory + "\" does not exist."));

		}).then(() => {

			const file = join(this.directory, "package.json");

			// check package.json
			return isFile(file).then((exists) => {

				return exists ? Promise.resolve() :
					Promise.reject(new Error("\"" + file + "\" does not exist."));

			// read package.json content
			}).then(() => {

				return readJSONFile(file);

			});

		// formate authors
		}).then((data) => {

			if (data.author) {

				if (data.authors) {
					this.authors = data.authors.slice(0);
					delete data.authors;
				}
				else {
					this.authors = [];
				}

				this.authors.push(data.author);

				delete data.author;

			}

			return Promise.resolve(data);

		// formate designs, javascripts & templates
		}).then((data) => {

			this.designs = [];
			if (data.designs) {

				if (data.designs instanceof Array && 0 < data.designs.length) {

					for (let i = 0, l = data.designs.length; i < l; ++i) {
						this.designs.push(join(this.directory, data.designs[i]));
					}

				}

				delete data.designs;

			}

			this.javascripts = [];
			if (data.javascripts) {

				if (data.javascripts instanceof Array && 0 < data.javascripts.length) {

					for (let i = 0, l = data.javascripts.length; i < l; ++i) {
						this.javascripts.push(join(this.directory, data.javascripts[i]));
					}

				}

				delete data.javascripts;

			}

			this.templates = [];
			if (data.templates) {

				if (data.templates instanceof Array && 0 < data.templates.length) {

					for (let i = 0, l = data.templates.length; i < l; ++i) {
						this.templates.push(join(this.directory, data.templates[i]));
					}

				}

				delete data.templates;

			}

			return Promise.resolve(data);

		// formate other data
		}).then((data) => {

			for (const key in data) {

				if (Object.prototype.hasOwnProperty.call(data, key)) {
					this[key] = data[key];
				}

			}

			return Promise.resolve(this);

		});

	}

	// load

	load () {
		return Promise.resolve();
	}

	unload (destroy = false) {

		return Promise.resolve().then(() => {
			this.removeAllListeners(); return Promise.resolve();
		}).then(() => {

			if (destroy) {

				// native
				this.authors = null;
				this.description = null;
				this.dependencies = null;
				this.devDependencies = null;
				this.engines = null;
				this.license = null;
				this.main = null;
				this.name = null;
				this.scripts = null;
				this.version = null;

				// specifics
				this.directory = null;
				this.designs = null;
				this.javascripts = null;
				this.templates = null;

			}

			return Promise.resolve();

		});

	}

	// write

	install () {
		return Promise.resolve();
	}

	update () {
		return Promise.resolve();
	}

	uninstall () {
		return Promise.resolve();
	}

};
