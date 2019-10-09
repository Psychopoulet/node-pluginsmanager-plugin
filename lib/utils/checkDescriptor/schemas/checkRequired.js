"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const {
		checkNonEmptyArray,
		checkNonEmptyString
	} = require(join(__dirname, "..", "..", "..", "checkers", "main.js"));

// module

module.exports = function checkRequired (fullpath, propertiesKeys, required) {

	let err = null;

		if ("undefined" !== typeof required) {

			err = checkNonEmptyArray(fullpath + "--required", required, false);

			if (!err) {

				for (let i = 0; i < required.length; ++i) {

					err = checkNonEmptyString(fullpath + "--required", required[i], false);

					if (err) {
						break;
					}

				}

			}

			if (!err) {

				const unknownData = required.filter((data) => {
					return !propertiesKeys.includes(data);
				});

				if (unknownData.length) {

					err = new RangeError(
						"Unknown \"required\" properties [" +
							" \"" + unknownData.join("\", \"") + "\"" +
						" ] in the request path \"" + fullpath + "\""
					);

				}

			}

		}

	return err;

};
