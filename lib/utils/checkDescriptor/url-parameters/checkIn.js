"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const { checkNonEmptyString } = require(join(__dirname, "..", "..", "..", "checkers", "main.js"));

// consts

	const ALLOWED = [ "query", "header", "path", "cookie" ];

// private

	// methods

		/**
		* Execute an asynchronous check on data
		* @param {string} fullpath: data identifier
		* @param {string} data: data to check
		* @returns {Promise} check result
		*/
		function _async (fullpath, data) {

			return checkNonEmptyString(fullpath + "--in", data, true).then(() => {

				return !ALLOWED.includes(data) ? Promise.reject(new RangeError(
					"\"in\" property of \"" + fullpath + "\" must be in :" +
					" [ \"" + ALLOWED.join("\", \"") + "\" ]"
				)) : Promise.resolve();

			});

		}

		/**
		* Execute a synchronous check on data
		* @param {string} fullpath: data identifier
		* @param {string} data: data to check
		* @returns {ReferenceError|TypeError|RangeError|null} check result
		*/
		function _sync (fullpath, data) {

			let err = checkNonEmptyString(fullpath + "--in", data, false);

				if (!err && !ALLOWED.includes(data)) {

					err = new RangeError(
						"\"in\" property of \"" + fullpath + "\" must be in :" +
						" [ \"" + ALLOWED.join("\", \"") + "\" ]"
					);

				}

			return err;

		}

// module

module.exports = function checkIn (fullpath, data, async = true) {

	return async ? _async(fullpath, data) : _sync(fullpath, data);

};
