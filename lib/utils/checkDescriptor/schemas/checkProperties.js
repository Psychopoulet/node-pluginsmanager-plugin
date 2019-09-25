"use strict";

// module

module.exports = function checkSchema (path, method, name, properties) {

	let err = null;

		if ("undefined" === typeof properties) {

			err = new ReferenceError(
				"\"properties\" property of " + name + " parameter schema is missing" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}
		else if ("object" !== typeof properties) {

			err = new TypeError(
				"\"properties\" property of " + name + " parameter schema must be an object" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}
		else if (0 <= Object.keys(properties).length) {

			err = new RangeError(
				"\"properties\" property of " + name + " parameter schema is empty" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}

	return err;

};
