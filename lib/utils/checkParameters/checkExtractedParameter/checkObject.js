/*
	eslint default-case: 0
*/

"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const checkObjectKeys = require(join(__dirname, "checkObjectKeys.js"));
	const checkBoolean = require(join(__dirname, "checkBoolean.js"));
	const checkInteger = require(join(__dirname, "checkInteger.js"));
	const checkNumber = require(join(__dirname, "checkNumber.js"));
	const checkString = require(join(__dirname, "checkString.js"));

	// avoid recursive loop
	let checkArray = null;

// private

	// methods

		/**
		* Check object validity
		* @param {string} masterKey: data key
		* @param {any} val: data value
		* @param {object} docParam: data doc
		* @param {string} type: data origine
		* @return {TypeError|RangeError|object} error or formated data
		*/
		function checkObject (masterKey, val, docParam, type) {

			let err = null;

				if ("object" !== typeof val) {
					err = new TypeError("\"" + masterKey + "\" " + type + " parameter is not an object");
				}
				else {
					err = checkObjectKeys(val, docParam.properties, type);
				}

				if (err) {
					return err;
				}

			const result = {};

				for (let i = 0, keys = Object.keys(val); i < keys.length; ++i) {

					const key = keys[i];

					const docItem = docParam.properties.find((param) => {
						return param.name === key;
					});

					const subKey = masterKey + "[" + key + "]";

					let res = null;

					switch (docItem.type) {

						case "boolean":
							res = checkBoolean(subKey, val[key], docItem, type);
						break;

						case "integer":
							res = checkInteger(subKey, val[key], docItem, type);
						break;

						case "number":
							res = checkNumber(subKey, val[key], docItem, type);
						break;

						case "string":
							res = checkString(subKey, val[key], docItem, type);
						break;

						case "array":

							// avoid recursive loop
							if (!checkArray) {
								checkArray = require(join(__dirname, "checkArray.js"));
							}

							res = checkArray(subKey, val[key], docItem, type);

						break;

						case "object":
							res = checkObject(subKey, val[key], docItem, type);
						break;

					}

					if (res instanceof Error) {
						err = res; break;
					}
					else {
						result[key] = res;
					}

				}

			return err instanceof Error ? err : result;

		}

// module

module.exports = checkObject;
