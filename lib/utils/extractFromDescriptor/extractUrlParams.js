"use strict";

// module

module.exports = function extractUrlParams (parameters) {

	if ("object" !== typeof parameters || !(parameters instanceof Array) || !parameters.length) {
		return [];
	}
	else {

		return parameters.map((param) => {

			if ("object" !== typeof param || null === param) {

				return {
					"name": String(param),
					"required": false,
					"type": "unknown"
				};

			}
			else {

				return {
					"name": param.name || "unknown",
					"required": Boolean(param.required),
					"type": param.schema && param.schema.type ? param.schema.type : "unknown"
				};

			}

		});

	}

};
