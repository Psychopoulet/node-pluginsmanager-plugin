"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals

	const {
		checkNonEmptyObject
	} = require(join(__dirname, "..", "..", "..", "checkers", "main.js"));

	const checkSchema = require(join(__dirname, "..", "schemas", "checkSchema.js"));

// module

module.exports = function checkBodyParameters (path, method, parameters, components) {

	let err = null;

		if ("undefined" !== typeof parameters) {

			const fullpath = "[" + method + "]" + path + "--requestBody";

			err = checkNonEmptyObject(fullpath, parameters, false);

			if (!err) {
				err = checkNonEmptyObject(fullpath + "--content", parameters.content, false);
			}

			if (!err) {

				for (
					let contentTypes = Object.keys(parameters.content), k = 0;
					k < contentTypes.length; ++k
				) {

					const contentType = contentTypes[k];

					err = checkNonEmptyObject(fullpath + "--content[" + contentType + "]", parameters.content[contentType], false);

					if (!err) {

						err = checkSchema(
							path, method, "requestBody.content", contentType, parameters.content[contentType].schema, components
						);

					}

					if (err) {
						break;
					}

				}

			}

		}

	return err;

};
