"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const { checkNonEmptyString } = require(join(__dirname, "..", "..", "..", "checkers", "main.js"));

// consts

	const ALLOWED = [ "string", "number", "integer", "boolean", "object", "array" ];

// private

	// methods

		/**
		* Execute an asynchronous check on data
		* @param {string} fullpath: data identifier
		* @param {string} data: data to check
		* @param {Array} forbidenTypes: optionnal limitations
		* @returns {Promise} check result
		*/
		function _async (fullpath, data, forbidenTypes) {

			return checkNonEmptyString(fullpath + "--type", data, true).then(() => {

				const allowedTypes = ALLOWED.filter((type) => {
					return !forbidenTypes.includes(type);
				});

				return !allowedTypes.includes(data) ? Promise.reject(new TypeError("\"type\" property of \"" + fullpath + "\" is not" +
					" in [ \"" + allowedTypes.join("\", \"") + "\" ]"
				)) : Promise.resolve();

			});

		}

		/**
		* Execute a synchronous check on data
		* @param {string} fullpath: data identifier
		* @param {string} data: data to check
		* @param {Array} forbidenTypes: optionnal limitations
		* @returns {ReferenceError|TypeError|TypeError|null} check result
		*/
		function _sync (fullpath, data, forbidenTypes) {

			let err = checkNonEmptyString(fullpath + "--type", data, false);

				if (!err) {

					const allowedTypes = ALLOWED.filter((type) => {
						return !forbidenTypes.includes(type);
					});

					if (!allowedTypes.includes(data)) {

						err = new TypeError("\"type\" property of \"" + fullpath + "\" is not" +
							" in [ \"" + allowedTypes.join("\", \"") + "\" ]"
						);

					}

				}

			return err;

		}

// module

module.exports = function checkType (fullpath, data, forbidenTypes = [], async = true) {

	return async ? _async(fullpath, data, forbidenTypes) : _sync(fullpath, data, forbidenTypes);

};
