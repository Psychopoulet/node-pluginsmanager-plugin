"use strict";

// module

module.exports = function extractBodyParams (requestBody, contentType) {

	if (!requestBody || !requestBody.content || !requestBody.content[contentType] || !requestBody.content[contentType].schema) {
		return [];
	}
	else if (Object.keys(requestBody.content[contentType].schema).includes("$ref")) {

		// console.log("references not managed yet");

		return [];

	}
	else {

		const properties = requestBody.content[contentType].schema.properties || {};
		const required = requestBody.content[contentType].schema.required || [];

		// console.log("properties", properties);

		return Object.keys(properties).map((param) => {

			return {
				"name": param,
				"required": required.includes(param),
				"type": properties[param].type || "unknown"
			};

		});

	}

};
