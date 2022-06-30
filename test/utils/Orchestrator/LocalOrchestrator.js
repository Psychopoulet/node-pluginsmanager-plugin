"use strict";

// deps

	// natives
	const { join } = require("path");
	const { unlink, writeFile } = require("fs");
	const { homedir } = require("os");

	// locals
	const isFile = require(join(__dirname, "..", "..", "..", "lib", "cjs", "utils", "file", "isFile.js"));
	const { Orchestrator } = require(join(__dirname, "..", "..", "..", "lib", "cjs", "main.cjs"));

// consts

	const FILE = join(homedir(), "test.json");

// module

module.exports = class LocalOrchestrator extends Orchestrator {

	_initWorkSpace () {

		this._Server.on("ping", () => {
			this.emit("ping");
		});

		return Promise.resolve();

	}

	install () {

		return new Promise((resolve, reject) => {

			writeFile(FILE, "test", (err) => {
				return err ? reject(err) : resolve();
			});

		});

	}

	update () {

		return isFile.default(FILE).then((exists) => {
			return exists ? Promise.resolve() : this.install();
		});

	}

	uninstall () {

		return new Promise((resolve, reject) => {

			unlink(FILE, (err) => {
				return err ? reject(err) : resolve();
			});

		});

	}

};
