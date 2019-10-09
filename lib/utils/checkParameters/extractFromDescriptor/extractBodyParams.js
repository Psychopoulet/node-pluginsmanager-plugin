"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
		const extractSchema = require(join(__dirname, "extractSchema.js"));

// module

module.exports = function extractBodyParams (requestBody, contentType, components) {

	// check function parameters
	if (
		"object" !== typeof requestBody || "object" !== typeof requestBody.content ||
		"string" !== typeof contentType ||
		"object" !== typeof requestBody.content[contentType] ||
		"object" !== typeof requestBody.content[contentType].schema
	) {
		return [];
	}
	else {

		return extractSchema(requestBody.content[contentType].schema, components).properties;

	}

};
