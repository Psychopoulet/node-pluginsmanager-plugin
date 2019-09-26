/*
	eslint max-statements: 0, complexity: 0, max-depth: 0
*/

"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals

	const {
		checkArray,
		checkNonEmptyString,
		checkObjectLengthBetween
	} = require(join(__dirname, "..", "..", "checkers", "main.js"));

	const checkRef = require(join(__dirname, "properties", "checkRef.js"));
	const checkSchema = require(join(__dirname, "schemas", "checkSchema.js"));

	const PARAMETERS_DESCRIPTION = join(__dirname, "parameters");

		const checkIn = require(join(PARAMETERS_DESCRIPTION, "checkIn.js"));
		const checkRequired = require(join(PARAMETERS_DESCRIPTION, "checkRequired.js"));
		const multiplesParameters = require(join(PARAMETERS_DESCRIPTION, "multiplesParameters.js"));
		const descriptionWithoutParameter = require(join(PARAMETERS_DESCRIPTION, "descriptionWithoutParameter.js"));
		const parameterWithoutDescription = require(join(PARAMETERS_DESCRIPTION, "parameterWithoutDescription.js"));

// consts

	const ALLOWED_TYPES = [ "string", "number", "integer", "boolean" ];

// module

module.exports = function parametersDescription (descriptor) {

	let err = null;

		for (let i = 0, paths = Object.keys(descriptor.paths); i < paths.length; ++i) {

			const path = paths[i];

			for (let j = 0, methods = Object.keys(descriptor.paths[path]); j < methods.length; ++j) {

				const method = methods[j];

				const fullpath = "[" + method + "]" + path + "--parameters";

				if ("undefined" !== typeof descriptor.paths[path][method].parameters) {
					err = checkArray(fullpath, descriptor.paths[path][method].parameters, false);
				}

				if (!err) {

					const parameters = descriptor.paths[path][method].parameters || [];

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
									"undefined" === typeof descriptor.components ||
									"undefined" === typeof descriptor.components.parameters ||
									"undefined" === typeof descriptor.components.parameters[splittedRef[3]]
								) {

									err = new ReferenceError(
										"\"$ref\" property of a parameter does not refer to an existing component" +
										" in the request path \"" + fullpath + "\""
									);

									break;

								}
								else {

									parameter = descriptor.components.parameters[splittedRef[3]];

									parameters[k] = parameter;
									descriptor.paths[path][method].parameters[k] = parameter;

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
							err = checkSchema(path, method, parameter.name, parameter.schema);
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

					if (!err) {
						err = parameterWithoutDescription(path, method, parameters);
					}

					if (err) {
						break;
					}

				}

			}

			if (err) {
				break;
			}

		}

	return err ? Promise.reject(err) : Promise.resolve();

};
