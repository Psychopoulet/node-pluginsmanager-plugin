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

	urlParam (urlParams, bodyParams, contentType) {

		return this.checkParameters("urlParam", urlParams, bodyParams, contentType).then(() => {

			if ("string" !== typeof urlParams["path-param"]) {
				return Promise.reject(new TypeError("\"path-param\" url path parameter is not a string"));
			}
				else if ("" === urlParams["path-param"].trim()) {
					return Promise.reject(new RangeError("\"path-param\" url path parameter is empty"));
				}

			else {

				return Promise.resolve({
					"path-param": urlParams["path-param"]
				});

			}

		});

	}

	create (urlParams, bodyParams, contentType) {

		return this.checkParameters("create", urlParams, bodyParams, contentType).then(() => {

			if ("generate-fail" === bodyParams["body-param"]) {
				return Promise.reject(new Error("Generate artificial error"));
			}


			else if ("string" !== typeof urlParams["url-param"]) {
				return Promise.reject(new TypeError("\"url-param\" url path parameter is not a string"));
			}
				else if ("" === urlParams["url-param"].trim()) {
					return Promise.reject(new RangeError("\"url-param\" url path parameter is empty"));
				}

			else if ("string" !== typeof bodyParams["body-param"]) {
				return Promise.reject(new TypeError("\"body-param\" body parameter is not a string"));
			}
				else if ("" === bodyParams["body-param"].trim()) {
					return Promise.reject(new RangeError("\"body-param\" body parameter is empty"));
				}

			else {
				return Promise.resolve();
			}

		});

	}

};
