"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const checkString = require(join(__dirname, "..", "TypeError", "checkString.js"));

// private

	// methods

		/**
		* Execute an asynchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @returns {Promise} check result
		*/
		function _async (dataName, data) {

			return checkString(dataName, data, true).then(() => {

				return "" === data.trim() ? Promise.reject(new RangeError(
					"\"" + dataName + "\" parameter must be higher than 0"
				)) : Promise.resolve();

			});

		}

		/**
		* Execute a synchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @returns {TypeError|null} check result
		*/
		function _sync (dataName, data) {

			let err = checkString(dataName, data, false);

				if (!err && "" === data.trim()) {

					err = new RangeError(
						"\"" + dataName + "\" parameter must be higher than 0"
					);

				}

			return err;

		}

// module

module.exports = function checkNonEmptyString (dataName, data, async = true) {

	return async ? _async(dataName, data) : _sync(dataName, data);

};
