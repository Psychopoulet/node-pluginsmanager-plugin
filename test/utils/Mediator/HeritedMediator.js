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

	urlParamString (urlParams, bodyParams, contentType) {

		return this.checkParameters("urlParamString", urlParams, bodyParams, contentType).then((parsedUrlParams) => {

			if ("" === parsedUrlParams["path-param-string"].trim()) {
				return Promise.reject(new RangeError("\"path-param-string\" url path parameter is empty"));
			}

			else {

				return Promise.resolve({
					"path-param-string": parsedUrlParams["path-param-string"]
				});

			}

		});

	}

	urlParamNumber (urlParams, bodyParams, contentType) {

		return this.checkParameters("urlParamNumber", urlParams, bodyParams, contentType).then((parsedUrlParams) => {

			return Promise.resolve({
				"path-param-number": parsedUrlParams["path-param-number"]
			});

		});

	}

	urlParamBoolean (urlParams, bodyParams, contentType) {

		return this.checkParameters("urlParamBoolean", urlParams, bodyParams, contentType).then((parsedUrlParams) => {

			return Promise.resolve({
				"path-param-boolean": parsedUrlParams["path-param-boolean"]
			});

		});

	}

	urlParamFacultative (urlParams, bodyParams, contentType) {

		return this.checkParameters("urlParamFacultative", urlParams, bodyParams, contentType);

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
