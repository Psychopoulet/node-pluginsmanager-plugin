"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const { checkNonEmptyString } = require(join(__dirname, "..", "..", "..", "checkers", "main.js"));

// consts

	const ALLOWED = [ "schemas", "parameters" ];

// private

	// methods

		/**
		* Check formate of verified data
		* @param {string} data: data to check
		* @returns {boolean} check result
		*/
		function _checkFormate (data) {

			const splittedRef = data.split("/");

			return 4 === splittedRef.length &&
					"#" === splittedRef[0] &&
					"components" === splittedRef[1] &&
					ALLOWED.includes(splittedRef[2]);

		}

		/**
		* Execute an asynchronous check on data
		* @param {string} fullpath: data identifier
		* @param {string} data: data to check
		* @returns {Promise} check result
		*/
		function _async (fullpath, data) {

			return checkNonEmptyString(fullpath + "--$ref", data, true).then(() => {

				return !_checkFormate(data) ? Promise.reject(new Error(
					"\"$ref\" property of \"" + fullpath + "\" must follow this pattern :" +
					" \"#/components/[" + ALLOWED.join("|") + "]/{$ref}\""
				)) : Promise.resolve();

			});

		}

		/**
		* Execute a synchronous check on data
		* @param {string} fullpath: data identifier
		* @param {string} data: data to check
		* @returns {ReferenceError|TypeError|RangeError|null} check result
		*/
		function _sync (fullpath, data) {

			let err = checkNonEmptyString(fullpath + "--$ref", data, false);

				if (!err && !_checkFormate(data)) {

					err = new Error(
						"\"$ref\" property of \"" + fullpath + "\" must follow this pattern :" +
						" \"#/components/[" + ALLOWED.join("|") + "]/{$ref}\""
					);

				}

			return err;

		}

// module

module.exports = function checkRef (fullpath, data, async = true) {

	return async ? _async(fullpath, data) : _sync(fullpath, data);

};
