"use strict";

// consts

	const ALLOWED = [ "query", "header", "path", "cookie" ];

// module

module.exports = function inProperty (path, method, parameter) {

	let err = null;

		if ("undefined" === typeof parameter.in) {

			err = new ReferenceError(
				"\"in\" property of \"" + parameter.name + "\" parameter is missing" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}
		else if ("string" !== typeof parameter.in) {

			err = new TypeError(
				"\"in\" property of \"" + parameter.name + "\" parameter must be a string" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}
		else if ("" === parameter.in.trim()) {

			err = new RangeError(
				"\"in\" property of \"" + parameter.name + "\" parameter is empty" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}
		else if (!ALLOWED.includes(parameter.in)) {

			err = new RangeError(
				"\"in\" property of \"" + parameter.name + "\" parameter is not in [ \"" + ALLOWED.join("\", \"") + "\" ]" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}

	return err;

};
