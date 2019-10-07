"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const extractUrlParams = require(join(__dirname, "extractFromDescriptor", "extractUrlParams.js"));
	const checkExtractedParameters = require(join(__dirname, "checkExtractedParameters.js"));

// module

module.exports = function checkUrlParameters (parameters, docParameters, components) {

	const res = checkExtractedParameters(parameters, extractUrlParams(docParameters, components), "url");

	return res instanceof Error ? Promise.reject(res) : Promise.resolve(res);

};
