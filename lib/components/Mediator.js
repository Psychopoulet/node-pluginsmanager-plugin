"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const DescriptorUser = require(join(__dirname, "DescriptorUser.js"));
	const findPathMethodByOperationId = require(join(__dirname, "..", "utils", "extractFromDescriptor", "findPathMethodByOperationId.js"));
	const extractUrlParams = require(join(__dirname, "..", "utils", "extractFromDescriptor", "extractUrlParams.js"));
	const extractBodyParams = require(join(__dirname, "..", "utils", "extractFromDescriptor", "extractBodyParams.js"));

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

				// compare url params length to doc
				return Promise.resolve().then(() => {

					// extract & formate url parameters from doc
					const urlParamsDoc = extractUrlParams(foundPathMethod.parameters);
					// console.log("urlParamsDoc", urlParamsDoc);

					const paramsKeys = Object.keys(urlParams || {});
					const paramsDocKeys = urlParamsDoc.map((p) => {
						return p.name;
					});

					// console.log("paramsKeys", paramsKeys);
					// console.log("paramsDocKeys", paramsDocKeys);

					const missingParams = paramsDocKeys.filter((p) => {
						return !paramsKeys.includes(p);
					});

					if (missingParams.length) {

						// console.log("missingParams", missingParams);

						return Promise.reject(new ReferenceError(
							"Missing url parameters (path or query) :" +
							" [ \"" + missingParams.join("\", \"") + "\" ]"
						));

					}
					else {

						const notWantedParams = paramsKeys.filter((p) => {
							return !paramsDocKeys.includes(p);
						});

						if (notWantedParams.length) {

							return Promise.reject(new ReferenceError(
								"Not wanted url parameters (path or query) :" +
								" [ \"" + notWantedParams.join("\", \"") + "\" ]"
							));

						}
						else {
							return Promise.resolve();
						}

					}

				// compare body params length to doc
				}).then(() => {

					// extract & formate body parameters from doc
					const bodyParamsDoc = extractBodyParams(foundPathMethod.requestBody, contentType);
					// console.log("bodyParamsDoc", bodyParamsDoc);

					const paramsKeys = Object.keys(bodyParams || {});
					const paramsDocKeys = bodyParamsDoc.map((p) => {
						return p.name;
					});

					const missingParams = paramsDocKeys.filter((p) => {
						return !paramsKeys.includes(p);
					});

					if (missingParams.length) {

						// console.log("missingParams", missingParams);

						return Promise.reject(new ReferenceError(
							"Missing body parameters :" +
							" [ \"" + missingParams.join("\", \"") + "\" ]"
						));

					}
					else {

						const notWantedParams = paramsKeys.filter((p) => {
							return !paramsDocKeys.includes(p);
						});

						if (notWantedParams.length) {

							return Promise.reject(new ReferenceError(
								"Not wanted body parameters :" +
								" [ \"" + notWantedParams.join("\", \"") + "\" ]"
							));

						}
						else {
							return Promise.resolve();
						}

					}

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
