"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const checkNonEmptyString = require(join(__dirname, "checkNonEmptyString.js"));
	const checkNonEmptyInteger = require(join(__dirname, "checkNonEmptyInteger.js"));

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

			return checkNonEmptyString(dataName, data, true).then(() => {
				return checkNonEmptyInteger(dataName + "/length", length, true);
			}).then(() => {

				return length !== data.length ? Promise.reject(new RangeError(
					"\"" + dataName + "\" must be higher than " + length
				)) : Promise.resolve();

			});

		}

		/**
		* Execute a synchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @param {number} length: length to check
		* @returns {TypeError|null} check result
		*/
		function _sync (dataName, data, length) {

			let err = checkNonEmptyString(dataName, data, false);

				if (!err) {
					err = checkNonEmptyInteger(dataName + "/length", length, false);
				}

				if (!err && length !== data.length) {

					err = new RangeError(
						"\"" + dataName + "\" must be higher than " + length
					);

				}

			return err;

		}

// module

module.exports = function checkStringLength (dataName, data, length, async = true) {

	return async ? _async(dataName, data, length) : _sync(dataName, data, length);

};
