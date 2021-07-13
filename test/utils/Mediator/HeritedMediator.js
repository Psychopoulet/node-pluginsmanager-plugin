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

		return this.checkParameters("urlParamBoolean", urlParams, bodyParams).then(() => {
			return Promise.resolve(urlParams.path["path-param-boolean"]);
		});

	}

	urlParamInteger (urlParams, bodyParams) {

		return this.checkParameters("urlParamInteger", urlParams, bodyParams).then(() => {
			return Promise.resolve(urlParams.path["path-param-integer"]);
		});

	}

	urlParamNumber (urlParams, bodyParams) {

		return this.checkParameters("urlParamNumber", urlParams, bodyParams).then(() => {
			return Promise.resolve(urlParams.path["path-param-number"]);
		});

	}

	urlParamString (urlParams, bodyParams) {

		return this.checkParameters("urlParamString", urlParams, bodyParams).then(() => {
			return Promise.resolve(urlParams.path["path-param-string"]);
		});

	}

	urlParamFacultative (urlParams, bodyParams) {

		return this.checkParameters("urlParamFacultative", urlParams, bodyParams).then(() => {
			return Promise.resolve(urlParams.query["path-param-facultative"] ? urlParams.query["path-param-facultative"] : "ok");
		});

	}

	bodyParamBoolean (urlParams, bodyParams) {

		return this.checkParameters("bodyParamBoolean", urlParams, bodyParams).then(() => {
			return Promise.resolve(bodyParams["body-param-boolean"]);
		});

	}

	bodyParamInteger (urlParams, bodyParams) {

		return this.checkParameters("bodyParamInteger", urlParams, bodyParams).then(() => {
			return Promise.resolve(bodyParams["body-param-integer"]);
		});

	}

	bodyParamNumber (urlParams, bodyParams) {

		return this.checkParameters("bodyParamNumber", urlParams, bodyParams).then(() => {
			return Promise.resolve(bodyParams["body-param-number"]);
		});

	}

	bodyParamString (urlParams, bodyParams) {

		return this.checkParameters("bodyParamString", urlParams, bodyParams).then(() => {
			return Promise.resolve(bodyParams["body-param-string"]);
		});

	}

	bodyParamObject (urlParams, bodyParams) {

		return this.checkParameters("bodyParamObject", urlParams, bodyParams).then(() => {
			return Promise.resolve(bodyParams["body-param-object"]);
		});

	}

	bodyParamArray (urlParams, bodyParams) {

		return this.checkParameters("bodyParamArray", urlParams, bodyParams).then(() => {
			return Promise.resolve(bodyParams["body-param-array"]);
		});

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

	pathPath (urlParams) {

		return this.checkParameters("pathPath", urlParams, {}).then(() => {

			return Promise.resolve(urlParams.path["path-param"]);

		});

	}

	pathQuery (urlParams) {

		return this.checkParameters("pathQuery", urlParams, {}).then(() => {

			return Promise.resolve(urlParams.query["query-param"]);

		});

	}

	pathCookie (urlParams) {

		return this.checkParameters("pathCookie", urlParams, {}).then(() => {

			return Promise.resolve(urlParams.cookies["cookie-param"]);

		});

	}

	pathHeader (urlParams) {

		return this.checkParameters("pathHeader", urlParams, {}).then(() => {

			return Promise.resolve(urlParams.headers["header-param"]);

		});

	}

	wrongResult (urlParams) {

		return this.checkParameters("wrongResult", urlParams, {}).then(() => {

			return Promise.resolve("test");

		});

	}

};
