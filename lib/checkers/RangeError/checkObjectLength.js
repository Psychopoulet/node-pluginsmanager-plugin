/*
	eslint max-params: [ "error", 5 ]
*/

"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const checkObject = require(join(__dirname, "..", "TypeError", "checkObject.js"));
	const checkInteger = require(join(__dirname, "..", "TypeError", "checkInteger.js"));

// private

	// methods

		/**
		* Execute an asynchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @param {number} _length: length to check
		* @returns {Promise} check result
		*/
		function _async (dataName, data, _length) {

			return checkObject(dataName, data, true).then(() => {
				return checkInteger(dataName + "/length", _length, true);
			}).then(() => {

				const { length } = Object.keys(data);

				return _length !== length ? Promise.reject(new RangeError(
					"\"" + dataName + "\" length must be equal to " + _length
				)) : Promise.resolve();

			});

		}

		/**
		* Execute a synchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @param {number} _length: length to check
		* @returns {ReferenceError|TypeError|RangeError|null} check result
		*/
		function _sync (dataName, data, _length) {

			let err = checkObject(dataName, data, false);

				if (!err) {
					err = checkInteger(dataName + "/length", _length, false);
				}

				const { length } = Object.keys(data);

				if (!err && _length !== length) {

					err = new RangeError(
						"\"" + dataName + "\" length must be equal to " + _length
					);

				}

			return err;

		}

// module

module.exports = function checkObjectLength (dataName, data, length, async = true) {

	return async ? _async(dataName, data, length) : _sync(dataName, data, length);

};
