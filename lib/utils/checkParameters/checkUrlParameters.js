"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const extractUrlParams = require(join(__dirname, "extractFromDescriptor", "extractUrlParams.js"));
	const checkExtractedParameters = require(join(__dirname, "checkExtractedParameters.js"));

// module

module.exports = function checkUrlParameters (parameters, docParameters, components) {

	// extract & formate url parameters from doc
	const paramsDoc = extractUrlParams(docParameters, components);

	const res = checkExtractedParameters(parameters, paramsDoc, "url");

	return res instanceof Error ? Promise.reject(res) : Promise.resolve(res);

};
