/*
	eslint no-param-reassign: 0, max-params: 0
*/

"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const checkRef = require(join(__dirname, "..", "properties", "checkRef.js"));
	const checkType = require(join(__dirname, "..", "properties", "checkType.js"));
	const checkProperties = require(join(__dirname, "checkProperties.js"));

// module

module.exports = function checkSchema (path, method, name, schema, components = {}) {

	let err = null;

		if ("undefined" === typeof schema) {

			err = new ReferenceError(
				"\"schema\" property of \"" + name + "\" parameter is missing" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}
		else if ("object" !== typeof schema) {

			err = new TypeError(
				"\"schema\" property of " + name + " parameter must be an object" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}

		else if ("undefined" !== typeof schema.$ref) {

			if (1 < Object.keys(schema).length) {

				err = new RangeError(
					"\"schema\" property of " + name + " parameter cannot have more than 1 property if there is a \"$ref\" one" +
					" in the request path \"[" + method + "]" + path + "\""
				);

			}
			else {
				err = checkRef("[" + method + "]" + path + "--parameter[" + name + "]", schema.$ref, false);
			}

			if (!err) {

				const splittedRef = schema.$ref.split("/");

				if ("undefined" === typeof components ||
					"undefined" === typeof components.schemas ||
					"undefined" === typeof components.schemas[splittedRef[3]]) {

					err = new ReferenceError(
						"\"$ref\" property of " + name + " parameter schema does not refer to an existing component" +
						" in the request path \"[" + method + "]" + path + "\""
					);

				}
				else {

					schema = components.schemas[splittedRef[3]];

				}

			}

		}

		if (!err) {
			err = checkType("[" + method + "]" + path + "--type[" + name + "]", schema.type, false);
		}

		if (!err && "object" === schema.type) {
			err = checkProperties(path, method, name, schema.properties);
		}

	return err;

};
