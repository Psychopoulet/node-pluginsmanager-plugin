"use strict";

// module

module.exports = function requiredProperty (path, method, parameter) {

	let err = null;

		if (parameter.in && "path" === parameter.in) {

			if ("undefined" === typeof parameter.required) {

				err = new ReferenceError(
					"\"required\" property of \"" + parameter.name + "\" parameter must exists and be setted to true" +
					" for \"in\" property setted to \"path\"" +
					" in the request path \"[" + method + "]" + path + "\""
				);

			}
			else if ("boolean" !== typeof parameter.required) {

				err = new TypeError(
					"\"required\" property of \"" + parameter.name + "\" parameter must be a boolean and be setted to true" +
					" for \"in\" property setted to \"path\"" +
					" in the request path \"[" + method + "]" + path + "\""
				);

			}
			else if (!parameter.required) {

				err = new Error(
					"\"required\" property of \"" + parameter.name + "\" parameter must be setted to true" +
					" for \"in\" property setted to \"path\"" +
					" in the request path \"[" + method + "]" + path + "\""
				);

			}

		}

	return err;

};
