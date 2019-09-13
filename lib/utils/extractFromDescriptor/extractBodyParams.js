"use strict";

// module

module.exports = function extractBodyParams (requestBody, contentType) {

	// check function parameters
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

		const mainParameter = requestBody.content[contentType].schema;

		// check main parameter
		if (
			"string" !== typeof mainParameter.type || "object" !== mainParameter.type ||
			"object" !== typeof mainParameter.properties || null === mainParameter.properties
		) {
			return [];
		}

		else {

			const { properties } = mainParameter;
			const required = mainParameter.required || [];

			return Object.keys(properties).map((param) => {

				// formate
				return {
					"name": param,
					"required": required.includes(param),
					"type": properties && properties[param] && properties[param].type ? properties[param].type : "unknown"
				};

			});

		}

	}

};
