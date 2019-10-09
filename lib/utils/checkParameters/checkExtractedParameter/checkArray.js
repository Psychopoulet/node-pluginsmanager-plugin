/*
	eslint default-case: 0
*/

"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const checkBoolean = require(join(__dirname, "checkBoolean.js"));
	const checkInteger = require(join(__dirname, "checkInteger.js"));
	const checkNumber = require(join(__dirname, "checkNumber.js"));
	const checkString = require(join(__dirname, "checkString.js"));

	// avoid recursive loop
	let checkObject = null;

// private

	// methods

		/**
		* Check array validity
		* @param {string} masterKey: data key
		* @param {any} val: data value
		* @param {object} docParam: data doc
		* @param {string} type: data origine
		* @return {TypeError|RangeError|array} error or formated data
		*/
		function checkArray (masterKey, val, docParam, type) {

			let err = null;
			let result = null;

				if ("object" === typeof val && val instanceof Array) {
					result = val;
				}
				else {
					err = new TypeError("\"" + masterKey + "\" " + type + " parameter is not an Array");
				}

				if (!err && "number" === typeof docParam.min && result.length < docParam.min) {

					err = new RangeError(
						"\"" + masterKey + "\" " + type + " parameter length must be" +
						" higher or equals to " + docParam.min
					);

				}

				if (!err && "number" === typeof docParam.max && result.length > docParam.max) {

					err = new RangeError(
						"\"" + masterKey + "\" " + type + " parameter length must be" +
						" lower or equals to " + docParam.max
					);

				}

				if (!err) {

					for (let i = 0; i < result.length; ++i) {

						const subKey = masterKey + "[" + i + "]";

						let res = null;

						switch (docParam.items.type) {

							case "boolean":
								res = checkBoolean(subKey, result[i], docParam.items, type);
							break;

							case "integer":
								res = checkInteger(subKey, result[i], docParam.items, type);
							break;

							case "number":
								res = checkNumber(subKey, result[i], docParam.items, type);
							break;

							case "string":
								res = checkString(subKey, result[i], docParam.items, type);
							break;

							case "array":
								res = checkArray(subKey, result[i], docParam.items, type);
							break;

							case "object":

								// avoid recursive loop
								if (!checkObject) {
									checkObject = require(join(__dirname, "checkObject.js"));
								}

								res = checkObject(subKey, result[i], docParam.items, type);

							break;

						}

						if (res instanceof Error) {
							err = res; break;
						}
						else {
							result[i] = res;
						}

					}

				}

			return err instanceof Error ? err : result;

		}

// module

module.exports = checkArray;
