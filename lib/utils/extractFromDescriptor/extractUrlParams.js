"use strict";

// module

module.exports = function extractUrlParams (parameters) {

	// check function parameters
	if ("object" !== typeof parameters || !(parameters instanceof Array) || !parameters.length) {
		return [];
	}
	else {

		return parameters.map((param) => {

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
