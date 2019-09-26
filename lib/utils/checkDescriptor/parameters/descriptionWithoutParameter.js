"use strict";

// module

module.exports = function descriptionWithoutParameter (path, method, parameter) {

	let err = null;

		if ("path" === parameter.in && !path.includes("{" + parameter.name + "}")) {

			err = new ReferenceError(
				"There is a \"" + parameter.name + "\" path parameter which is not is the url" +
				" in the request path \"[" + method + "]" + path + "\""
			);

		}

	return err;

};
