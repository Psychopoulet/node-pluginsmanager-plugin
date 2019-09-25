"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const checkNumber = require(join(__dirname, "..", "TypeError", "checkNumber.js"));

// private

	// methods

		/**
		* Execute an asynchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @returns {Promise} check result
		*/
		function _async (dataName, data) {

			return checkNumber(dataName, data, true).then(() => {

				return 0 >= data ? Promise.reject(new RangeError(
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

			let err = checkNumber(dataName, data, false);

				if (!err && 0 >= data) {

					err = new RangeError(
						"\"" + dataName + "\" parameter must be higher than 0"
					);

				}

			return err;

		}

// module

module.exports = function checkNonEmptyNumber (dataName, data, async = true) {

	return async ? _async(dataName, data) : _sync(dataName, data);

};
