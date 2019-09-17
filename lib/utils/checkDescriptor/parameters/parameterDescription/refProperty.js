"use strict";

// module

module.exports = function refProperty (path, method, parameter) {

	let err = null;

		if ("string" !== typeof parameter.$ref) {

			err = new TypeError(
				"\"$ref\" property of a parameter must be a string" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}
		else if ("" === parameter.$ref.trim()) {

			err = new RangeError(
				"\"$ref\" property of a parameter is empty" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}
		else if (1 < Object.keys(parameter).length) {

			err = new Error(
				"\"$ref\" property of a parameter is not the only property" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}
		else {

			const ref = parameter.$ref.split("/");

			if (
				4 !== ref.length ||
				"#" !== ref[0] ||
				"components" !== ref[1] ||
				"parameters" !== ref[2]
			) {

				err = new Error(
					"\"$ref\" property of a parameter must follow this pattern :" +
					" \"#/components/parameters/{ref}\"" +
					" in the request path \"[" + method + "]" + path + "\""
				);

			}

		}

	return err;

};
