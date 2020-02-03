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

	urlParamBoolean (urlParams, bodyParams) {

		return this.checkParameters("urlParamBoolean", urlParams, bodyParams);

	}

	urlParamInteger (urlParams, bodyParams) {

		return this.checkParameters("urlParamInteger", urlParams, bodyParams);

	}

	urlParamNumber (urlParams, bodyParams) {

		return this.checkParameters("urlParamNumber", urlParams, bodyParams);

	}

	urlParamString (urlParams, bodyParams) {

		return this.checkParameters("urlParamString", urlParams, bodyParams);

	}

	urlParamFacultative (urlParams, bodyParams) {

		return this.checkParameters("urlParamFacultative", urlParams, bodyParams);

	}

	bodyParamBoolean (urlParams, bodyParams) {

		return this.checkParameters("bodyParamBoolean", urlParams, bodyParams);

	}

	bodyParamInteger (urlParams, bodyParams) {

		return this.checkParameters("bodyParamInteger", urlParams, bodyParams);

	}

	bodyParamNumber (urlParams, bodyParams) {

		return this.checkParameters("bodyParamNumber", urlParams, bodyParams);

	}

	bodyParamString (urlParams, bodyParams) {

		return this.checkParameters("bodyParamString", urlParams, bodyParams);

	}

	bodyParamObject (urlParams, bodyParams) {

		return this.checkParameters("bodyParamObject", urlParams, bodyParams);

	}

	bodyParamArray (urlParams, bodyParams) {

		return this.checkParameters("bodyParamArray", urlParams, bodyParams);

	}

	create (urlParams, bodyParams) {

		return this.checkParameters("create", urlParams, bodyParams).then(() => {

			if ("generate-fail" === bodyParams["body-param"]) {
				return Promise.reject(new Error("Generate artificial error"));
			}

			else if ("string" !== typeof urlParams.query["url-param"]) {
				return Promise.reject(new TypeError("\"query.url-param\" url path parameter is not a string"));
			}
				else if ("" === urlParams.query["url-param"].trim()) {
					return Promise.reject(new RangeError("\"query.url-param\" url path parameter is empty"));
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
