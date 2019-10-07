"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const extractBodyParams = require(join(__dirname, "extractFromDescriptor", "extractBodyParams.js"));
	const checkExtractedParameters = require(join(__dirname, "checkExtractedParameters.js"));

// module

module.exports = function checkBodyParameters (parameters, docParameters, contentType, components) {

	// extract & formate body parameters from doc
	const paramsDoc = extractBodyParams(docParameters, contentType, components);

	const res = checkExtractedParameters(parameters, paramsDoc, "body");

	return res instanceof Error ? Promise.reject(res) : Promise.resolve(res);

};
