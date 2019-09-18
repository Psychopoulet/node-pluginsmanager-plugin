"use strict";

// module

module.exports = function extractUrlParams (parameters, parametersComponents) {

	// check function parameters
	if ("object" !== typeof parameters || !(parameters instanceof Array) || !parameters.length) {
		return [];
	}
	else {

		if ("object" === typeof parametersComponents && null !== parametersComponents) {

			parameters.filter((param) => {
				return param && param.$ref;
			}).map((param) => {
				return param.$ref.split("/");
			}).filter((ref) => {
				return 4 === ref.length && "#" === ref[0] && "components" === ref[1] && "parameters" === ref[2];
			}).forEach((ref) => {

				if (parametersComponents[ref[3]]) {
					parameters.push(parametersComponents[ref[3]]);
				}

			});

		}

		return parameters.filter((param) => {
			return !param || !param.$ref;
		}).map((param) => {

			// check param
			if ("object" !== typeof param || null === param) {

				return {
					"name": String(param),
					"in": "unknown",
					"required": false,
					"type": "unknown"
				};

			}

			// formate
			else {

				return {
					"name": param.name || "unknown",
					"in": param.in || "unknown",
					"required": Boolean(param.required),
					"type": param.schema && param.schema.type ? param.schema.type : "unknown"
				};

			}

		});

	}

};
