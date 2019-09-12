"use strict";

// module

module.exports = function extractUrlParams (parameters) {

	return (parameters || []).map((param) => {

		return {
			"name": param.name,
			"required": param.required,
			"type": param.schema && param.schema.type ? param.schema.type : "unknown"
		};

	});

};
