"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const extractUrlParams = require(join(__dirname, "extractFromDescriptor", "extractUrlParams.js"));
	const checkObject = require(join(__dirname, "checkExtractedParameter", "checkObject.js"));

// module

module.exports = function checkUrlParameters (parameters, docParameters, components) {

	const res = checkObject("parameters", parameters, {
		"properties": extractUrlParams(docParameters, components)
	}, "url");

	return res instanceof Error ? Promise.reject(res) : Promise.resolve(res);

};
