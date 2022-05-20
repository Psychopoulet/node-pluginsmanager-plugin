
"use strict";

// deps

	// natives
	const { exec } = require("child_process");
	const { join } = require("path");
	const { unlink, readFile, writeFile } = require("fs");

// consts

	const MAX_TIMEOUT = 10000;

// tests

describe("compilation typescript", () => {

	after((done) => {

		unlink(join(__dirname, "typescript", "compilation.js"), (err) => {
			return err ? done(err) : done();
		});

	});

	it("should compile typescript file", (done) => {

		exec("npx tsc " + join(__dirname, "typescript", "compilation.ts") + " --target ES6 --moduleResolution node", {
			"cwd": join(__dirname, ".."),
			"windowsHide": true
		}, (err) => {
			return err ? done(err) : done();
		});

	}).timeout(MAX_TIMEOUT);

	it("should change compiled file package", () => {

		const { name } = require(join(__dirname, "..", "package.json"));

		return new Promise((resolve, reject) => {

			readFile(join(__dirname, "typescript", "compilation.js"), "utf-8", (err, content) => {
				return err ? reject(err) : resolve(content);
			});
	
		}).then((content) => {

			return new Promise((resolve, reject) => {

				writeFile(join(__dirname, "typescript", "compilation.js"), content.replace(name, "../../lib/main.js"), "utf-8", (err) => {
					return err ? reject(err) : resolve();
				});
		
			});

		});

	});

	/* @TODO : add proper transpilation (with valid js import)
	it("should exec compiled typescript file", (done) => {

		exec("node " + join(__dirname, "typescript", "compilation.js"), {
			"cwd": join(__dirname, ".."),
			"windowsHide": true
		}, (err) => {
			return err ? done(err) : done();
		});

	});
	*/

});
