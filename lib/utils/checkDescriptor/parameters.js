"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const parametersWithoutDescription = require(join(__dirname, "parameters", "parametersWithoutDescription.js"));
	const parametersDescription = require(join(__dirname, "parameters", "parametersDescription.js"));

// module

module.exports = function parameters (descriptor) {

	return Promise.resolve().then(() => {

		return parametersWithoutDescription(descriptor);

	}).then(() => {

		return parametersDescription(descriptor);

	});

};
