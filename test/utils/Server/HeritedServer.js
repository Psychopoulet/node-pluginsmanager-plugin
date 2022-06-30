"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

		// plugin
		const readJSONFile = require(join(__dirname, "..", "..", "..", "lib", "cjs", "utils", "file", "readJSONFile.js"));

		// utils
		const HeritedMediator = require(join(__dirname, "..", "Mediator", "HeritedMediator.js"));
		const ServerWithSockets = require(join(__dirname, "..", "Server", "ServerWithSockets.js"));

// module

module.exports = class HeritedServer extends ServerWithSockets {

	init (...data) {

		return readJSONFile.default(join(__dirname, "..", "DescriptorUser", "Descriptor.json")).then((content) => {

			this._Descriptor = content;
			this._Mediator = new HeritedMediator({
				"descriptor": this._Descriptor
			});

			return this._Mediator.init();

		}).then(() => {

			return super.init(...data);

		});

	}

};
