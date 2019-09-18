"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const DescriptorUser = require(join(__dirname, "DescriptorUser.js"));

	const UTILS_DIRECTORY = join(__dirname, "..", "utils");

		const CHECK_PARAMETERS = join(UTILS_DIRECTORY, "checkParameters");

			const checkUrlParameters = require(join(CHECK_PARAMETERS, "checkUrlParameters.js"));
			const checkBodyParameters = require(join(CHECK_PARAMETERS, "checkBodyParameters.js"));

		const findPathMethodByOperationId = require(join(
			UTILS_DIRECTORY, "extractFromDescriptor", "findPathMethodByOperationId.js"
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

				if ("undefined" === typeof operationId) {
					return Promise.reject(new ReferenceError("Missing \"operationId\" parameter"));
				}
					else if ("string" !== typeof operationId) {
						return Promise.reject(new TypeError("\"operationId\" parameter is not a string"));
					}
					else if ("" === operationId.trim()) {
						return Promise.reject(new RangeError("\"operationId\" parameter is empty"));
					}

				else if ("undefined" === typeof urlParams) {
					return Promise.reject(new ReferenceError("Missing \"urlParams\" parameter"));
				}
					else if ("object" !== typeof urlParams || null === urlParams) {
						return Promise.reject(new TypeError("\"urlParams\" parameter is not an object"));
					}

				else if ("undefined" === typeof bodyParams) {
					return Promise.reject(new ReferenceError("Missing \"bodyParams\" parameter"));
				}
					else if ("object" !== typeof bodyParams || null === bodyParams) {
						return Promise.reject(new TypeError("\"bodyParams\" parameter is not an object"));
					}

				else if ("undefined" === typeof contentType) {
					return Promise.reject(new ReferenceError("Missing \"contentType\" parameter"));
				}
					else if ("string" !== typeof contentType) {
						return Promise.reject(new TypeError("\"contentType\" parameter is not a string"));
					}
					else if ("" === contentType.trim()) {
						return Promise.reject(new RangeError("\"contentType\" parameter is empty"));
					}

				else {
					return Promise.resolve();
				}

			}).then(() => {

				// console.log("operationId", operationId);
				// console.log("contentType", contentType);

				// search wanted operation
				const foundPathMethod = findPathMethodByOperationId(operationId, this._Descriptor.paths);
				// console.log("foundPathMethod", foundPathMethod);

				if (!foundPathMethod) {
					return Promise.reject(new ReferenceError("Unknown operationId \"" + operationId + "\""));
				}

				let parsedUrlParams = {};

				// compare url params to doc
				return Promise.resolve().then(() => {

					return checkUrlParameters(
						urlParams || {},
						foundPathMethod.parameters,
						this._Descriptor.components && this._Descriptor.components.parameters ?
							this._Descriptor.components.parameters : null
					).then((parsed) => {
						parsedUrlParams = parsed;
					});

				// compare body params to doc
				}).then(() => {

					return checkBodyParameters(
						bodyParams || {},
						foundPathMethod.requestBody,
						contentType
					);

				}).then(() => {
					return Promise.resolve(parsedUrlParams);
				});

			});

		}

		// init / release

		init (...data) {

			return this._initWorkSpace(...data).then((...result) => {

				this.initialized = true;
				this.emit("initialized", ...data);

				return Promise.resolve(...result);

			});

		}

		release (...data) {

			return this._releaseWorkSpace(...data).then((...result) => {

				// can only be released by Orchestrator
				if (this._Descriptor) {
					this._Descriptor = null;
				}

				this.initialized = false;
				this.emit("released", ...data);

				this._externalRessourcesDirectory = "";

				return Promise.resolve(...result);

			}).then((...result) => {

				this.removeAllListeners();

				return Promise.resolve(...result);

			});

		}

};
