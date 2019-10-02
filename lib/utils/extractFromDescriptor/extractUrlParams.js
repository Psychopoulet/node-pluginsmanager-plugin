"use strict";

// module

module.exports = function extractUrlParams (parameters, parametersComponents) {

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
			return parametersComponents[param.$ref.split("/")[3]];
		})).map((param) => {

			return {
				"name": param.name,
				"in": param.in,
				"required": Boolean(param.required),
				"type": param.schema.type
			};

		});

	}

};
