"use strict";

// module

module.exports = function nameProperty (path, method, parameter) {

	let err = null;

		if ("undefined" === typeof parameter.name) {

			err = new ReferenceError(
				"\"name\" property of a parameter is missing" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}
		else if ("string" !== typeof parameter.name) {

			err = new TypeError(
				"\"name\" property of a parameter must be a string" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}
		else if ("" === parameter.name.trim()) {

			err = new RangeError(
				"\"name\" property of \"" + parameter.name + "\" parameter is empty" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}

	return err;

};
