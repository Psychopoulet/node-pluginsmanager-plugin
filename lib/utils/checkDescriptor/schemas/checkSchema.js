/*
	eslint max-params: [ "error", 6 ], max-statements: 0, max-depth: 0
*/

"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

	const {
		checkNonEmptyObject,
		checkObjectLengthBetween
	} = require(join(__dirname, "..", "..", "..", "checkers", "main.js"));

	const checkRef = require(join(__dirname, "..", "properties", "checkRef.js"));
	const checkType = require(join(__dirname, "..", "properties", "checkType.js"));

	const checkLimits = require(join(__dirname, "checkLimits.js"));
	const checkRequired = require(join(__dirname, "checkRequired.js"));

// private

	// methods

		/**
		* Execute check on schema data
		* @param {string} path: path of the tested request
		* @param {string} method: method of the tested request
		* @param {string} parameterType: difference between url & body request
		* @param {string} name: data name of the tested request
		* @param {object} _schema: structure to test
		* @param {object} components: schemas components
		* @returns {ReferenceError|TypeError|RangeError|null} check result
		*/
		function _checkSchema (path, method, parameterType, name, _schema, components = {}) {

			const fullpath = "\"[" + method + "]" + path + "\"--" + parameterType + "[" + name + "]--schema";

			let schema = _schema;
			let err = checkNonEmptyObject(fullpath, schema, false);

				if (!err && "undefined" !== typeof schema.$ref) {

					err = checkObjectLengthBetween(fullpath, schema, 1, 1, false);

					if (!err) {
						err = checkRef(fullpath, schema.$ref, false);
					}

					if (!err) {

						const splittedRef = schema.$ref.split("/");

						if (
							"undefined" === typeof components ||
							"undefined" === typeof components.schemas ||
							"undefined" === typeof components.schemas[splittedRef[3]]
						) {

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
					err = checkType(fullpath, schema.type, false);
				}

				if (!err) {
					err = checkLimits(fullpath, schema);
				}

				if (!err && "object" === schema.type) {

					err = checkNonEmptyObject(fullpath + "--properties", schema.properties, false);

					if (!err) {

						const propertiesKeys = Object.keys(schema.properties);

						err = checkRequired(fullpath, propertiesKeys, schema.required);

						if (!err) {

							for (let i = 0; i < propertiesKeys.length; ++i) {

								err = _checkSchema(
									path, method, parameterType, name + "." + propertiesKeys[i],
									schema.properties[propertiesKeys[i]], components
								);

								if (err) {
									break;
								}

							}

						}

					}

				}

				if (!err && "array" === schema.type) {
					err = _checkSchema(path, method, parameterType, name + ".items", schema.items, components);
				}

			return err;

		}

// module

module.exports = _checkSchema;
