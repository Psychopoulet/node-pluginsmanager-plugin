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

	urlParamBoolean (urlParams, bodyParams, contentType) {

		return this.checkParameters("urlParamBoolean", urlParams, bodyParams, contentType).then((parsed) => {

			return Promise.resolve(parsed.url);

		});

	}

	urlParamInteger (urlParams, bodyParams, contentType) {

		return this.checkParameters("urlParamInteger", urlParams, bodyParams, contentType).then((parsed) => {

			return Promise.resolve(parsed.url);

		});

	}

	urlParamNumber (urlParams, bodyParams, contentType) {

		return this.checkParameters("urlParamNumber", urlParams, bodyParams, contentType).then((parsed) => {

			return Promise.resolve(parsed.url);

		});

	}

	urlParamString (urlParams, bodyParams, contentType) {

		return this.checkParameters("urlParamString", urlParams, bodyParams, contentType).then((parsed) => {

			if ("" === parsed.url["path-param-string"].trim()) {
				return Promise.reject(new RangeError("\"parameters[path-param-string]\" url path parameter is empty"));
			}

			else {
				return Promise.resolve(parsed.url);
			}

		});

	}

	urlParamFacultative (urlParams, bodyParams, contentType) {

		return this.checkParameters("urlParamFacultative", urlParams, bodyParams, contentType);

	}

	bodyParamBoolean (urlParams, bodyParams, contentType) {

		return this.checkParameters("bodyParamBoolean", urlParams, bodyParams, contentType).then((parsed) => {

			return Promise.resolve(parsed.body);

		});

	}

	bodyParamInteger (urlParams, bodyParams, contentType) {

		return this.checkParameters("bodyParamInteger", urlParams, bodyParams, contentType).then((parsed) => {

			return Promise.resolve(parsed.body);

		});

	}

	bodyParamNumber (urlParams, bodyParams, contentType) {

		return this.checkParameters("bodyParamNumber", urlParams, bodyParams, contentType).then((parsed) => {

			return Promise.resolve(parsed.body);

		});

	}

	bodyParamString (urlParams, bodyParams, contentType) {

		return this.checkParameters("bodyParamString", urlParams, bodyParams, contentType).then((parsed) => {

			if ("" === parsed.body["body-param-string"].trim()) {
				return Promise.reject(new RangeError("\"requestBody[body-param-string]\" body parameter is empty"));
			}

			else {
				return Promise.resolve(parsed.body);
			}

		});

	}

	bodyParamObject (urlParams, bodyParams, contentType) {

		return this.checkParameters("bodyParamObject", urlParams, bodyParams, contentType).then((parsed) => {
			return Promise.resolve(parsed.body);
		});

	}

	bodyParamArray (urlParams, bodyParams, contentType) {

		return this.checkParameters("bodyParamArray", urlParams, bodyParams, contentType).then((parsed) => {
			return Promise.resolve(parsed.body);
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
