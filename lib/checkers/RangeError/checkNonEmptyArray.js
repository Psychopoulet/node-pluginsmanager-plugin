"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const checkArray = require(join(__dirname, "..", "TypeError", "checkArray.js"));

// private

	// methods

		/**
		* Execute an asynchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @returns {Promise} check result
		*/
		function _async (dataName, data) {

			return checkArray(dataName, data, true).then(() => {

				return 1 > data.length ? Promise.reject(new RangeError(
					"\"" + dataName + "\" length must be higher than 0"
				)) : Promise.resolve();

			});

		}

		/**
		* Execute a synchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @returns {ReferenceError|TypeError|RangeError|null} check result
		*/
		function _sync (dataName, data) {

			let err = checkArray(dataName, data, false);

				if (!err && 1 > data.length) {

					err = new RangeError(
						"\"" + dataName + "\" length must be higher than 0"
					);

				}

			return err;

		}

// module

module.exports = function checkNonEmptyArray (dataName, data, async = true) {

	return async ? _async(dataName, data) : _sync(dataName, data);

};
