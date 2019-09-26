/*
	eslint max-params: [ "error", 5 ], no-param-reassign: 0
*/

"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

	const {
		checkObject,
		checkNonEmptyObject,
		checkObjectLengthBetween
	} = require(join(__dirname, "..", "..", "..", "checkers", "main.js"));

	const checkRef = require(join(__dirname, "..", "properties", "checkRef.js"));
	const checkType = require(join(__dirname, "..", "properties", "checkType.js"));

// module

module.exports = function checkSchema (path, method, name, schema, components = {}) {

	const fullpath = "\"[" + method + "]" + path + "\"--parameter[" + name + "]--schema";

	let err = checkObject(fullpath, schema, false);

		if (!err && "undefined" !== typeof schema.$ref) {

			err = checkObjectLengthBetween(fullpath, schema, 1, 1, false);

			if (!err) {
				err = checkRef(fullpath, schema.$ref, false);
			}

			if (!err) {

				const splittedRef = schema.$ref.split("/");

				if ("undefined" === typeof components ||
					"undefined" === typeof components.schemas ||
					"undefined" === typeof components.schemas[splittedRef[3]]) {

					err = new ReferenceError(
						"\"$ref\" property of " + name + " parameter schema does not refer to an existing component" +
						" in the request path \"" + fullpath + "\""
					);

				}
				else {

					schema = components.schemas[splittedRef[3]];

				}

			}

		}

		if (!err) {
			err = checkType(fullpath + "--type", schema.type, false);
		}

		if (!err && "object" === schema.type) {
			err = checkNonEmptyObject(fullpath + "--properties", schema.properties, false);
		}

	return err;

};
