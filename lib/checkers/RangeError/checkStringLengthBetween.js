/*
	eslint max-params: [ "error", 5 ]
*/

"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const checkString = require(join(__dirname, "..", "TypeError", "checkString.js"));
	const checkInteger = require(join(__dirname, "..", "TypeError", "checkInteger.js"));
	const checkNonEmptyInteger = require(join(__dirname, "checkNonEmptyInteger.js"));

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

			return checkString(dataName, data, true).then(() => {
				return checkInteger(dataName + "/min", min, true);
			}).then(() => {
				return checkNonEmptyInteger(dataName + "/max", max, true);
			}).then(() => {

				return min > data.length ? Promise.reject(new RangeError(
					"\"" + dataName + "\" length must be higher than " + min
				)) : Promise.resolve();

			}).then(() => {

				return max < data.length ? Promise.reject(new RangeError(
					"\"" + dataName + "\" length must be lower than " + max
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

			let err = checkString(dataName, data, false);

				if (!err) {
					err = checkInteger(dataName + "/min", min, false);
				}

				if (!err) {
					err = checkNonEmptyInteger(dataName + "/max", max, false);
				}

				if (!err && min > data.length) {

					err = new RangeError(
						"\"" + dataName + "\" length must be higher than " + min
					);

				}

				if (!err && max < data.length) {

					err = new RangeError(
						"\"" + dataName + "\" length must be lower than " + max
					);

				}

			return err;

		}

// module

module.exports = function checkStringLengthBetween (dataName, data, min, max, async = true) {

	return async ? _async(dataName, data, min, max) : _sync(dataName, data, min, max);

};
