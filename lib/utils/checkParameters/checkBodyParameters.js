"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const extractBodyParams = require(join(__dirname, "extractFromDescriptor", "extractBodyParams.js"));
	const checkObject = require(join(__dirname, "checkExtractedParameter", "checkObject.js"));

// module

module.exports = function checkBodyParameters (parameters, docParameters, contentType, components) {

	const res = checkObject("requestBody", parameters, {
		"properties": extractBodyParams(docParameters, contentType, components)
	}, "body");

	return res instanceof Error ? Promise.reject(res) : Promise.resolve(res);

};
