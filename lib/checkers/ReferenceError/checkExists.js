"use strict";

// private

	// methods

		/**
		* Execute an asynchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @returns {Promise} check result
		*/
		function _async (dataName, data) {

			return "undefined" === typeof data ? Promise.reject(new ReferenceError(
				"\"" + dataName + "\" parameter does not exist"
			)) : Promise.resolve();

		}

		/**
		* Execute a synchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @returns {ReferenceError|null} check result
		*/
		function _sync (dataName, data) {

			let err = null;

				if ("undefined" === typeof data) {

					err = new ReferenceError(
						"\"" + dataName + "\" parameter does not exist"
					);

				}

			return err;

		}

// module

module.exports = function checkExists (dataName, data, async = true) {

	return async ? _async(dataName, data) : _sync(dataName, data);

};
