"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const Orchestrator = require(join(__dirname, "..", "..", "..", "lib", "components", "Orchestrator.js"));

// module

module.exports = class LocalOrchestrator extends Orchestrator {

	_initWorkSpace () {

		this._Server.on("ping", () => {
			this.emit("ping");
		});

		return Promise.resolve();

	}

	_releaseWorkSpace () {

		return Promise.resolve();

	}

};
