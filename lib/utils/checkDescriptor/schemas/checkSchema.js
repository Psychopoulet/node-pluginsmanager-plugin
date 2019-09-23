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

// module

module.exports = function checkSchema (path, method, name, schema, components = {}) {

	let err = null;

		if ("undefined" === typeof schema) {

			err = new ReferenceError(
				"\"schema\" property of a parameter is missing" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}
		else if ("object" !== typeof schema) {

			err = new TypeError(
				"\"schema\" property of a parameter must be a string" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}

		else if ("undefined" !== typeof schema.$ref) {

			if (1 < Object.keys(schema).length) {

				err = new RangeError(
					"\"schema\" property of a parameter cannot have more than 1 property if there is a \"$ref\" one" +
					" in the request path \"[" + method + "]" + path + "\""
				);

			}
			else {
				err = checkRef(path, method, schema.$ref);
			}

			if (!err) {

				const splittedRef = schema.$ref.split("/");

				if ("undefined" === typeof components ||
					"undefined" === typeof components.schemas ||
					"undefined" === typeof components.schemas[splittedRef[3]]) {

					err = new ReferenceError(
						"\"$ref\" property of a schema does not refer to an existing component" +
						" in the request path \"[" + method + "]" + path + "\""
					);

				}
				else {

					schema = components.schemas[splittedRef[3]];

				}

			}

		}

		if (!err) {

			err = checkType(path, method, name, schema.type);

		}

	return err;

};
