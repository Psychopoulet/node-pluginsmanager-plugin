"use strict";

// module

module.exports = function extractSchema (_schema, components) {

	const schema = "undefined" !== typeof _schema.$ref ? components.schemas[_schema.$ref.split("/")[3]] : _schema;

	const result = {
		"type": schema.type
	};

		switch (schema.type) {

			case "string":
			case "array":

				if ("undefined" !== typeof schema.minLength) {
					result.min = schema.minLength;
				}

				if ("undefined" !== typeof schema.maxLength) {
					result.max = schema.maxLength;
				}

			break;

			case "integer":
			case "number":

				if ("undefined" !== typeof schema.minimum) {
					result.min = schema.minimum;
				}

				if ("undefined" !== typeof schema.maximum) {
					result.max = schema.maximum;
				}

			break;

			default:
				// nothing to do here
			break;

		}

	return result;


};
