"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const checkObject = require(join(__dirname, "..", "TypeError", "checkObject.js"));

// private

	// methods

		/**
		* Execute an asynchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @returns {Promise} check result
		*/
		function _async (dataName, data) {

			return checkObject(dataName, data, true).then(() => {

				return 1 > Object.keys(data).length ? Promise.reject(new RangeError(
					"\"" + dataName + "\" parameter must have keys"
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

			let err = checkObject(dataName, data, false);

				if (!err && 1 > Object.keys(data).length) {

					err = new RangeError(
						"\"" + dataName + "\" parameter must have keys"
					);

				}

			return err;

		}

// module

module.exports = function checkNonEmptyObject (dataName, data, async = true) {

	return async ? _async(dataName, data) : _sync(dataName, data);

};
