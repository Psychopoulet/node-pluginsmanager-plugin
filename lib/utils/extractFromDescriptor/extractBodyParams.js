"use strict";

// module

module.exports = function extractBodyParams (requestBody, contentType) {

	if (
		"object" !== typeof requestBody || null === requestBody ||
		"object" !== typeof requestBody.content || null === requestBody.content ||
		"string" !== typeof contentType || "" === contentType.trim() ||
		"object" !== typeof requestBody.content[contentType] || null === requestBody.content[contentType] ||
		"object" !== typeof requestBody.content[contentType].schema || null === requestBody.content[contentType].schema
	) {
		return [];
	}
	else {

		const properties = requestBody.content[contentType].schema.properties || {};
		const required = requestBody.content[contentType].schema.required || [];

		return Object.keys(properties).map((param) => {

			return {
				"name": param,
				"required": required.includes(param),
				"type": properties[param].type || "unknown"
			};

		});

	}

};
