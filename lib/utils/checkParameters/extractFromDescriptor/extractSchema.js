"use strict";

// private

	// methods

		/**
		* Extract schema
		* @param {object} _schema data from descriptor
		* @param {object} components components from descriptor
		* @returns {object} extracted data
		*/
		function _extractSchema (_schema, components) {

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

						if ("array" === schema.type) {
							result.items = _extractSchema(schema.items, components);
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

					case "object": {

						const { properties } = schema;
						const required = schema.required || [];

						result.properties = Object.keys(properties).map((param) => {

							// formate
							return {
								"name": param,
								"required": required.includes(param),
								..._extractSchema(properties[param], components)
							};

						});

					} break;

					default:
						// nothing to do here
					break;

				}

			return result;

		}

// module

module.exports = _extractSchema;
