"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const checkExists = require(join(__dirname, "..", "ReferenceError", "checkExists.js"));

// private

	// methods

		/**
		* Execute an asynchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @returns {Promise} check result
		*/
		function _async (dataName, data) {

			return checkExists(dataName, data, true).then(() => {

				return "string" !== typeof data ? Promise.reject(new TypeError(
					"\"" + dataName + "\" is not a string"
				)) : Promise.resolve();

			});

		}

		/**
		* Execute a synchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @returns {ReferenceError|TypeError|null} check result
		*/
		function _sync (dataName, data) {

			let err = checkExists(dataName, data, false);

				if (!err && "string" !== typeof data) {

					err = new TypeError(
						"\"" + dataName + "\" is not a string"
					);

				}

			return err;

		}

// module

module.exports = function checkString (dataName, data, async = true) {

	return async ? _async(dataName, data) : _sync(dataName, data);

};
