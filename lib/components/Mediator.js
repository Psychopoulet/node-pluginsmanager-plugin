"use strict";

// deps

	// natives
	const { join } = require("path");

	// externals
	const { OpenApiValidator } = require("express-openapi-validate");

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

		this.initialized = false;
		this._validator = null;

	}

	// public

		checkParameters (operationId, urlParams, bodyParams, contentType) {

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
					return checkObject("urlParams.cookie", urlParams.cookie);
				});

			}).then(() => {
				return checkObject("bodyParams", bodyParams);
			}).then(() => {
				return checkNonEmptyString("contentType", contentType);
			}).then(() => {

				// search wanted operation
				const foundPathMethod = extractPathMethodByOperationId(this._Descriptor.paths, operationId);

				if (!foundPathMethod) {
					return Promise.reject(new ReferenceError("Unknown operationId \"" + operationId + "\""));
				}

				return new Promise((resolve, reject) => {

					const req = {
						// "pathname": ??,
						"path": foundPathMethod.path,
						"method": foundPathMethod.method,
						"params": urlParams.path,
						"query": urlParams.query,
						"headers": urlParams.headers,
						"cookie": urlParams.cookie,
						"body": bodyParams
					};

					const validateRequest = this._validator.validate(req.method, req.path);

					validateRequest(req, null, (err) => {
						return err ? reject(err) : resolve();
					});

				});

			});

		}

		// init / release

		init (...data) {

			return this._initWorkSpace(...data).then(() => {

				this.initialized = true;
				this._validator = new OpenApiValidator(this._Descriptor);

				this.emit("initialized", ...data);

			});

		}

		release (...data) {

			return this._releaseWorkSpace(...data).then(() => {

				// can only be released by Orchestrator
				if (this._Descriptor) {
					this._Descriptor = null;
				}

				if (this._validator) {
					this._validator = null;
				}

				this.initialized = false;
				this.emit("released", ...data);

			}).then(() => {

				this.removeAllListeners();

			});

		}

};
