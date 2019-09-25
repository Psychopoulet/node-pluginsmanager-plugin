"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const { checkNonEmptyString } = require(join(__dirname, "..", "..", "..", "checkers", "main.js"));

// consts

	const ALLOWED = [ "string", "number", "integer", "boolean", "object", "array" ];

// private

	// methods

		/**
		* Execute an asynchronous check on data
		* @param {string} fullpath: data identifier
		* @param {string} data: data to check
		* @returns {Promise} check result
		*/
		function _async (fullpath, data) {

			return checkNonEmptyString(fullpath + "--type", data, true).then(() => {

				return !ALLOWED.includes(data) ? Promise.reject(new RangeError("\"type\" property of \"" + fullpath + "\" is not" +
					" in [ \"" + ALLOWED.join("\", \"") + "\" ]"
				)) : Promise.resolve();

			});

		}

		/**
		* Execute a synchronous check on data
		* @param {string} fullpath: data identifier
		* @param {string} data: data to check
		* @returns {TypeError|null} check result
		*/
		function _sync (fullpath, data) {

			let err = checkNonEmptyString(fullpath + "--type", data, false);

				if (!err && !ALLOWED.includes(data)) {

					err = new RangeError("\"type\" property of \"" + fullpath + "\" is not" +
						" in [ \"" + ALLOWED.join("\", \"") + "\" ]"
					);

				}

			return err;

		}

// module

module.exports = function checkType (fullpath, data, async = true) {

	return async ? _async(fullpath, data) : _sync(fullpath, data);

};
