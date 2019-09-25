"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const checkObject = require(join(__dirname, "checkObject.js"));

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

				return !(data instanceof Array) ? Promise.reject(new TypeError(
					"\"" + dataName + "\" parameter is not an Array"
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

				if (!err && !(data instanceof Array)) {

					err = new TypeError(
						"\"" + dataName + "\" parameter is not an Array"
					);

				}

			return err;

		}

// module

module.exports = function checkArray (dataName, data, async = true) {

	return async ? _async(dataName, data) : _sync(dataName, data);

};
