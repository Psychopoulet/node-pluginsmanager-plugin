/*
	eslint max-params: [ "error", 5 ]
*/

"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const checkNumber = require(join(__dirname, "..", "TypeError", "checkNumber.js"));
	const checkNonEmptyNumber = require(join(__dirname, "checkNonEmptyNumber.js"));

// private

	// methods

		/**
		* Execute an asynchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @param {number} min: min to check
		* @param {number} max: max to check
		* @returns {Promise} check result
		*/
		function _async (dataName, data, min, max) {

			return checkNumber(dataName, data, true).then(() => {
				return checkNonEmptyNumber(dataName + "/min", min, true);
			}).then(() => {
				return checkNonEmptyNumber(dataName + "/max", max, true);
			}).then(() => {

				return min > data ? Promise.reject(new RangeError(
					"\"" + dataName + "\" must be higher than " + min
				)) : Promise.resolve();

			}).then(() => {

				return max < data ? Promise.reject(new RangeError(
					"\"" + dataName + "\" must be lower than " + max
				)) : Promise.resolve();

			});

		}

		/**
		* Execute a synchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @param {number} min: min to check
		* @param {number} max: max to check
		* @returns {ReferenceError|TypeError|RangeError|null} check result
		*/
		function _sync (dataName, data, min, max) {

			let err = checkNumber(dataName, data, false);

				if (!err) {
					err = checkNonEmptyNumber(dataName + "/min", min, false);
				}

				if (!err) {
					err = checkNonEmptyNumber(dataName + "/max", max, false);
				}

				if (!err && min > data) {

					err = new RangeError(
						"\"" + dataName + "\" must be higher than " + min
					);

				}

				if (!err && max < data) {

					err = new RangeError(
						"\"" + dataName + "\" must be lower than " + max
					);

				}

			return err;

		}

// module

module.exports = function checkNumberBetween (dataName, data, min, max, async = true) {

	return async ? _async(dataName, data, min, max) : _sync(dataName, data, min, max);

};
