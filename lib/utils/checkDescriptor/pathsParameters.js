"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const paramWithoutDescription = require(join(__dirname, "pathsParameters", "paramWithoutDescription.js"));
	const parametersDescription = require(join(__dirname, "pathsParameters", "parametersDescription.js"));

// module

module.exports = function pathsParameters (descriptor) {

	// search path parameters wihout description
	return Promise.resolve().then(() => {

		return paramWithoutDescription(descriptor);

	}).then(() => {

		return parametersDescription(descriptor);

	});

};
