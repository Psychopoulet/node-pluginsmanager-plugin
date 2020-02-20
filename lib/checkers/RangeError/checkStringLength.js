"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const checkString = require(join(__dirname, "..", "TypeError", "checkString.js"));
	const checkInteger = require(join(__dirname, "..", "TypeError", "checkInteger.js"));

// private

	// methods

		/**
		* Execute an asynchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @param {number} length: length to check
		* @returns {Promise} check result
		*/
		function _async (dataName, data, length) {

			return checkString(dataName, data, true).then(() => {
				return checkInteger(dataName + "/length", length, true);
			}).then(() => {

				return length !== data.length ? Promise.reject(new RangeError(
					"\"" + dataName + "\" length must be equal to " + length
				)) : Promise.resolve();

			});

		}

		/**
		* Execute a synchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @param {number} length: length to check
		* @returns {ReferenceError|TypeError|RangeError|null} check result
		*/
		function _sync (dataName, data, length) {

			let err = checkString(dataName, data, false);

				if (!err) {
					err = checkInteger(dataName + "/length", length, false);
				}

				if (!err && length !== data.length) {

					err = new RangeError(
						"\"" + dataName + "\" length must be equal to " + length
					);

				}

			return err;

		}

// module

module.exports = function checkStringLength (dataName, data, length, async = true) {

	return async ? _async(dataName, data, length) : _sync(dataName, data, length);

};
