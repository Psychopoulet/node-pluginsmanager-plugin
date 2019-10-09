"use strict";

// module

module.exports = function checkNumber (key, val, docParam, type) {

	let err = null;
	let result = null;

		if ("number" === typeof val) {
			result = val;
		}
		else if ("string" === typeof val) {

			const parsed = parseFloat(val);

			if (!Number.isNaN(parsed)) {
				result = parsed;
			}
			else {
				err = new TypeError("\"" + key + "\" " + type + " parameter is not a number");
			}

		}
		else {
			err = new TypeError("\"" + key + "\" " + type + " parameter is not a number");
		}

		if (!err && "number" === typeof docParam.min && result < docParam.min) {

			err = new RangeError(
				"\"" + key + "\" " + type + " parameter must be" +
				" higher or equals to " + docParam.min
			);

		}

		if (!err && "number" === typeof docParam.max && result > docParam.max) {

			err = new RangeError(
				"\"" + key + "\" " + type + " parameter must be" +
				" lower or equals to " + docParam.max
			);

		}

	return err instanceof Error ? err : result;

};
