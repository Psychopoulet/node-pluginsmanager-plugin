"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const { checkBoolean } = require(join(__dirname, "..", "..", "..", "checkers", "main.js"));

// private

	// methods

		/**
		* Execute an asynchronous check on data
		* @param {string} fullpath: data identifier
		* @param {boolean} data: data to check
		* @returns {Promise} check result
		*/
		function _async (fullpath, data) {

			return checkBoolean(fullpath + "--required", data, true).then(() => {

				return !data ? Promise.reject(new RangeError(
					"\"required\" property of \"" + fullpath + "\" must be setted to true" +
					" with \"in\" property setted to \"path\""
				)) : Promise.resolve();

			});

		}

		/**
		* Execute a synchronous check on data
		* @param {string} fullpath: data identifier
		* @param {boolean} data: data to check
		* @returns {TypeError|null} check result
		*/
		function _sync (fullpath, data) {

			let err = checkBoolean(fullpath + "--required", data, false);

				if (!err && !data) {

					err = new Error(
						"\"required\" property of \"" + fullpath + "\" must be setted to true" +
						" with \"in\" property setted to \"path\""
					);

				}

			return err;

		}

// module

module.exports = function checkRequired (fullpath, _in, required, async = true) {

	let err = null;

		if ("path" === _in) {
			err = async ? _async(fullpath, required) : _sync(fullpath, required);
		}

	return err;

};
