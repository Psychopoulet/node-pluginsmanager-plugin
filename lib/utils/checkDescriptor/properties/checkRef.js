"use strict";

// consts

	const ALLOWED = [ "schemas", "parameters" ];

// module

module.exports = function checkRef (path, method, ref) {

	let err = null;

		if ("undefined" === typeof ref) {

			err = new ReferenceError(
				"\"$ref\" property of a parameter is missing" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}
		else if ("string" !== typeof ref) {

			err = new TypeError(
				"\"$ref\" property of a parameter must be a string" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}
		else if ("" === ref.trim()) {

			err = new RangeError(
				"\"$ref\" property of a parameter is empty" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}
		else {

			const splittedRef = ref.split("/");

			if (
				4 !== splittedRef.length ||
				"#" !== splittedRef[0] ||
				"components" !== splittedRef[1] ||
				!ALLOWED.includes(splittedRef[2])
			) {

				err = new Error(
					"\"$ref\" property of a parameter must follow this pattern :" +
					" \"#/components/[" + ALLOWED.join("|") + "]/{ref}\"" +
					" in the request path \"[" + method + "]" + path + "\""
				);

			}

		}

	return err;

};
