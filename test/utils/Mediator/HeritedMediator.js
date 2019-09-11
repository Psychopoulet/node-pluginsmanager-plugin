"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const LocalMediator = require(join(__dirname, "LocalMediator.js"));

// module

module.exports = class HeritedMediator extends LocalMediator {

	emptyGet () {
		return Promise.resolve();
	}

	emptyPost () {
		return Promise.resolve();
	}

	valid () {
		return Promise.resolve([ "test" ]);
	}

	urlParam (urlParams) {

		if ("undefined" === typeof urlParams || null === urlParams) {
			return Promise.reject(new ReferenceError("Missing url params"));
		}
			else if ("object" !== typeof urlParams) {
				return Promise.reject(new TypeError("Url params is not an object"));
			}

				else if ("undefined" === typeof urlParams["path-param"]) {
					return Promise.reject(new ReferenceError("Missing path-param param"));
				}
					else if ("string" !== typeof urlParams["path-param"]) {
						return Promise.reject(new TypeError("path-param param is not a string"));
					}
					else if ("" === urlParams["path-param"].trim()) {
						return Promise.reject(new RangeError("path-param param is empty"));
					}

		else {

			return Promise.resolve({
				"path-param": urlParams["path-param"]
			});

		}

	}

	create (urlParams, bodyParams) {

		if ("undefined" === typeof urlParams || null === urlParams) {
			return Promise.reject(new ReferenceError("Missing url params"));
		}
			else if ("object" !== typeof urlParams) {
				return Promise.reject(new TypeError("Url params is not an object"));
			}

				else if ("undefined" === typeof urlParams["url-param"]) {
					return Promise.reject(new ReferenceError("Missing url-param param"));
				}
					else if ("string" !== typeof urlParams["url-param"]) {
						return Promise.reject(new TypeError("url-param param is not a string"));
					}
					else if ("" === urlParams["url-param"].trim()) {
						return Promise.reject(new RangeError("url-param param is empty"));
					}

		else if ("undefined" === typeof bodyParams || null === bodyParams) {
			return Promise.reject(new ReferenceError("Missing body params"));
		}
			else if ("object" !== typeof bodyParams) {
				return Promise.reject(new TypeError("Body params is not an object"));
			}

				else if ("undefined" === typeof bodyParams["body-param"]) {
					return Promise.reject(new ReferenceError("Missing body-param param"));
				}
					else if ("string" !== typeof bodyParams["body-param"]) {
						return Promise.reject(new TypeError("body-param param is not a string"));
					}
					else if ("" === bodyParams["body-param"].trim()) {
						return Promise.reject(new RangeError("body-param param is empty"));
					}

		else if ("generate-fail" === bodyParams["body-param"]) {
			return Promise.reject(new Error("Generate artificial error"));
		}

		else {
			return Promise.resolve();
		}

	}

};
