/*
	eslint max-statements: 0, max-depth: 0
*/

"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals

	const {
		checkNonEmptyArray,
		checkNonEmptyString,
		checkObjectLengthBetween
	} = require(join(__dirname, "..", "..", "..", "checkers", "main.js"));

	const checkRef = require(join(__dirname, "..", "properties", "checkRef.js"));
	const checkSchema = require(join(__dirname, "..", "schemas", "checkSchema.js"));

	const checkIn = require(join(__dirname, "checkIn.js"));
	const checkRequired = require(join(__dirname, "checkRequired.js"));
	const multiplesParameters = require(join(__dirname, "multiplesParameters.js"));
	const descriptionWithoutParameter = require(join(__dirname, "descriptionWithoutParameter.js"));
	const parameterWithoutDescription = require(join(__dirname, "parameterWithoutDescription.js"));

// consts

	const ALLOWED_TYPES = [ "string", "number", "integer", "boolean" ];

// module

module.exports = function checkUrlParameters (path, method, parameters, components) {

	let err = null;

		const fullpath = "[" + method + "]" + path + "--parameters";

		if ("undefined" !== typeof parameters) {

			err = checkNonEmptyArray(fullpath, parameters, false);

			if (!err) {

				for (let k = 0; k < parameters.length; ++k) {

					let parameter = parameters[k];

					if ("undefined" !== typeof parameter.$ref) {

						err = checkObjectLengthBetween(fullpath + "[" + k + "]", parameter, 1, 1, false);

						if (!err) {
							err = checkRef(fullpath + "[" + k + "]", parameter.$ref, false);
						}

						if (!err) {

							const splittedRef = parameter.$ref.split("/");

							if (
								"undefined" === typeof components.parameters ||
								"undefined" === typeof components.parameters[splittedRef[3]]
							) {

								err = new ReferenceError(
									"\"$ref\" property of a parameter does not refer to an existing component" +
									" in the request path \"" + fullpath + "\""
								);

								break;

							}
							else {

								parameter = components.parameters[splittedRef[3]];

								parameters[k] = parameter;
								parameters[k] = parameter;

							}

						}

					}

					if (!err) {
						err = checkNonEmptyString(fullpath, parameter.name, false);
					}

					if (!err) {
						err = checkIn(fullpath, parameter.in, false);
					}

					if (!err) {
						err = checkRequired(fullpath, parameter.in, parameter.required, false);
					}

					if (!err) {
						err = descriptionWithoutParameter(path, method, parameter);
					}

					if (!err) {
						err = checkSchema(path, method, parameter.name, parameter.schema, components);
					}

					if (!err && !ALLOWED_TYPES.includes(parameter.schema.type)) {

						err = new RangeError(
							"\"type\" property of \"" + parameter.name + "\" parameter is not in [" +
								" \"" + ALLOWED_TYPES.join("\", \"") + "\"" +
							" ] in the request path \"" + fullpath + "\""
						);

					}

					if (err) {
						break;
					}

				}

				if (!err) {
					err = multiplesParameters(path, method, parameters);
				}

			}

		}

		if (!err) {
			err = parameterWithoutDescription(path, method, parameters);
		}

	return err;

};
