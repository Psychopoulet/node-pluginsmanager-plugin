"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const {
		checkInteger,
		checkNumber
	} = require(join(__dirname, "..", "..", "..", "checkers", "main.js"));

// module

module.exports = function checkLimits (fullpath, schema) {

	let err = null;

		switch (schema.type) {

			case "integer":

				if (!err && "undefined" !== typeof schema.minimum) {
					err = checkInteger(fullpath + "--minimum", schema.minimum, false);
				}

				if (!err && "undefined" !== typeof schema.maximum) {
					err = checkInteger(fullpath + "--maximum", schema.maximum, false);
				}

			break;

			case "number":

				if (!err && "undefined" !== typeof schema.minimum) {
					err = checkNumber(fullpath + "--minimum", schema.minimum, false);
				}

				if (!err && "undefined" !== typeof schema.maximum) {
					err = checkNumber(fullpath + "--maximum", schema.maximum, false);
				}

			break;

			case "string":

				if (!err && "undefined" !== typeof schema.minLength) {
					err = checkInteger(fullpath + "--minLength", schema.minLength, false);
				}

				if (!err && "undefined" !== typeof schema.maxLength) {
					err = checkInteger(fullpath + "--maxLength", schema.maxLength, false);
				}

			break;

			default:
				// nothing to do here
			break;

		}

	return err;

};
