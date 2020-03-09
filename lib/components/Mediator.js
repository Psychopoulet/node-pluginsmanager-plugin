"use strict";

// deps

	// natives
	const { join } = require("path");

	// externals
	const { OpenApiValidator, ValidationError } = require("express-openapi-validate");

	// locals
	const {
		checkNonEmptyString,
		checkObject,
		checkNonEmptyObject
	} = require(join(__dirname, "..", "checkers", "main.js"));
	const { extractPathMethodByOperationId } = require(join(__dirname, "..", "utils", "descriptor", "main.js"));
	const DescriptorUser = require(join(__dirname, "DescriptorUser.js"));

// module

module.exports = class Mediator extends DescriptorUser {

	constructor (options) {

		super(options);

		this._validator = null;

	}

	// public

		checkParameters (operationId, urlParams, bodyParams) {

			// parameters validation
			return this.checkDescriptor().then(() => {
				return checkNonEmptyString("operationId", operationId);
			}).then(() => {

				return checkNonEmptyObject("urlParams", urlParams).then(() => {
					return checkObject("urlParams.path", urlParams.path);
				}).then(() => {
					return checkObject("urlParams.query", urlParams.query);
				}).then(() => {
					return checkObject("urlParams.headers", urlParams.headers);
				}).then(() => {
					return checkObject("urlParams.cookies", urlParams.cookies);
				});

			}).then(() => {
				return checkObject("bodyParams", bodyParams);
			}).then(() => {

				// search wanted operation
				const foundPathMethod = extractPathMethodByOperationId(this._Descriptor.paths, operationId);

				if (!foundPathMethod) {
					return Promise.reject(new ReferenceError("Unknown operationId \"" + operationId + "\""));
				}

				return new Promise((resolve, reject) => {

					const req = {
						"path": foundPathMethod.path,
						"method": foundPathMethod.method,
						"params": urlParams.path,
						"query": urlParams.query,
						"headers": urlParams.headers,
						"cookies": urlParams.cookies,
						"body": bodyParams
					};

					const validateRequest = this._validator.validate(req.method, req.path);

					validateRequest(req, null, (err) => {
						return err ? reject(err) : resolve();
					});

				}).catch((err) => {

					return err instanceof ValidationError ? Promise.resolve().then(() => {

						switch (err.data[0].keyword) { // extract first Error

							case "required":
								return Promise.reject(new ReferenceError(err.message));

							case "type":
								return Promise.reject(new TypeError(err.message));

							case "minimum":
							case "maximum":
							case "minLength":
							case "maxLength":
							case "minItems":
							case "maxItems":
							case "enum":
								return Promise.reject(new RangeError(err.message));

							default:
								return Promise.reject(new Error(err.message));

						}

					}) : Promise.reject(err);

				});

			});

		}

		// init / release

		init (...data) {

			return this._initWorkSpace(...data).then(() => {

				this._validator = new OpenApiValidator(this._Descriptor);

				this.initialized = true;
				this.emit("initialized", ...data);

			});

		}

		release (...data) {

			return this._releaseWorkSpace(...data).then(() => {

				// can only be released by Orchestrator
				this._Descriptor = null;
				this._validator = null;

				this.initialized = false;
				this.emit("released", ...data);

			}).then(() => {

				this.removeAllListeners();

			});

		}

};
