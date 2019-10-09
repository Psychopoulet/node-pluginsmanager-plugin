"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
		const extractSchema = require(join(__dirname, "extractSchema.js"));

// module

module.exports = function extractUrlParams (parameters, components) {

	// check function parameters
	if ("object" !== typeof parameters || !(parameters instanceof Array) || !parameters.length) {
		return [];
	}
	else {

		return parameters.filter((param) => {
			return "undefined" === typeof param.$ref;
		}).concat(parameters.filter((param) => {
			return "undefined" !== typeof param.$ref;
		}).map((param) => {
			return components.parameters[param.$ref.split("/")[3]];
		})).map((param) => {

			return {
				"name": param.name,
				"in": param.in,
				"required": Boolean(param.required),
				...extractSchema(param.schema, components)
			};

		});

	}

};
