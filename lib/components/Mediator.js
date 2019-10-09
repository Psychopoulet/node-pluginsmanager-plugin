"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals

	const {
		checkNonEmptyString,
		checkObject
	} = require(join(__dirname, "..", "checkers", "main.js"));

	const DescriptorUser = require(join(__dirname, "DescriptorUser.js"));

	const UTILS_DIRECTORY = join(__dirname, "..", "utils");

		const CHECK_PARAMETERS = join(UTILS_DIRECTORY, "checkParameters");

			const checkUrlParameters = require(join(CHECK_PARAMETERS, "checkUrlParameters.js"));
			const checkBodyParameters = require(join(CHECK_PARAMETERS, "checkBodyParameters.js"));

		const findPathMethodByOperationId = require(join(
			UTILS_DIRECTORY, "findPathMethodByOperationId.js"
		));

	// module

module.exports = class Mediator extends DescriptorUser {

	constructor (options) {

		super(options);

		this.initialized = false;

	}

	// public

		checkParameters (operationId, urlParams, bodyParams, contentType) {

			// parameters validation
			return this.checkDescriptor().then(() => {
				return checkNonEmptyString("operationId", operationId);
			}).then(() => {
				return checkObject("urlParams", urlParams);
			}).then(() => {
				return checkObject("bodyParams", bodyParams);
			}).then(() => {
				return checkNonEmptyString("contentType", contentType);
			}).then(() => {

				// search wanted operation
				const foundPathMethod = findPathMethodByOperationId(operationId, this._Descriptor.paths);

				if (!foundPathMethod) {
					return Promise.reject(new ReferenceError("Unknown operationId \"" + operationId + "\""));
				}

				const result = {
					"url": {},
					"body": {}
				};

				// compare url params to doc
				return Promise.resolve().then(() => {

					return checkUrlParameters(
						urlParams,
						foundPathMethod.parameters,
						this._Descriptor.components || {}
					).then((parsed) => {
						result.url = parsed;
					});

				// compare body params to doc
				}).then(() => {

					return checkBodyParameters(
						bodyParams,
						foundPathMethod.requestBody,
						contentType, this._Descriptor.components || {}
					).then((parsed) => {
						result.body = parsed;
					});

				}).then(() => {
					return Promise.resolve(result);
				});

			});

		}

		// init / release

		init (...data) {

			return this._initWorkSpace(...data).then(() => {

				this.initialized = true;
				this.emit("initialized", ...data);

			});

		}

		release (...data) {

			return this._releaseWorkSpace(...data).then(() => {

				// can only be released by Orchestrator
				if (this._Descriptor) {
					this._Descriptor = null;
				}

				this.initialized = false;
				this.emit("released", ...data);

				this._externalRessourcesDirectory = "";

			}).then(() => {

				this.removeAllListeners();

			});

		}

};
