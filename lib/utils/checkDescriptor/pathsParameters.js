"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const paramWithoutDescription = require(join(__dirname, "pathsParameters", "paramWithoutDescription.js"));
	const descriptionWithoutParam = require(join(__dirname, "pathsParameters", "descriptionWithoutParam.js"));
	const parametersDescription = require(join(__dirname, "pathsParameters", "parametersDescription.js"));

// module

module.exports = function pathsParameters (descriptor) {

	// search path parameters wihout description
	return Promise.resolve().then(() => {

		return paramWithoutDescription(descriptor);

	// search description without path parameter
	}).then(() => {

		return descriptionWithoutParam(descriptor);

	}).then(() => {

		return parametersDescription(descriptor);

	});

};
