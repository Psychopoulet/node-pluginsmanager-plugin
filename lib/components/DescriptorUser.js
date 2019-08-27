"use strict";

//  deps

	// natives
	const Events = require("events");

// module

module.exports = class DescriptorUser extends Events {

	constructor (options) {

		super(options);

		this._Descriptor = options && "undefined" !== typeof options.descriptor ?
			options.descriptor : null;

		this._externalRessourcesDirectory = options && "string" === typeof options.externalRessourcesDirectory ?
			options.externalRessourcesDirectory : "";

	}

	// protected

		// must be inherited
		_initWorkSpace () {

			return Promise.reject(new Error("\"_initWorkSpace\" method must be inherited"));

		}

		// must be inherited
		_releaseWorkSpace () {

			return Promise.reject(new Error("\"_releaseWorkSpace\" method must be inherited"));

		}

	// public

		checkDescriptor () {

			if ("undefined" === typeof this._Descriptor || null === this._Descriptor) {

				return Promise.reject(new ReferenceError("Descriptor not registered"));

			}
			else if ("object" !== typeof this._Descriptor) {

				return Promise.reject(new TypeError(
					"The plugin has an invalid Descriptor which is not an object"
				));

			}

				else if ("undefined" === typeof this._Descriptor.info) {

					return Promise.reject(new ReferenceError(
						"Missing \"info\" content in the plugin's Descriptor"
					));

				}

					else if ("object" !== typeof this._Descriptor.info) {

						return Promise.reject(new TypeError(
							"\"info\" content in the plugin's Descriptor is not an object"
						));

					}

						else if ("undefined" === typeof this._Descriptor.info.title) {

							return Promise.reject(new ReferenceError(
								"Missing \"info.title\" data in the plugin's Descriptor"
							));

						}

							else if ("string" !== typeof this._Descriptor.info.title) {

								return Promise.reject(new TypeError(
									"\"info.title\" data in the plugin's Descriptor is not a string"
								));

							}

						else if ("undefined" === typeof this._Descriptor.info.version) {

							return Promise.reject(new ReferenceError(
								"Missing \"info.version\" data in the plugin's Descriptor"
							));

						}

							else if ("string" !== typeof this._Descriptor.info.version) {

								return Promise.reject(new TypeError(
									"\"info.version\" data in the plugin's Descriptor is not a string"
								));

							}

			// check multiples operationId
			else {

				const operationIds = [];
				const multiplesOperationIds = [];

				if (this._Descriptor.paths) {

					Object.keys(this._Descriptor.paths).forEach((path) => {

						Object.keys(this._Descriptor.paths[path]).forEach((method) => {

							const { operationId } = this._Descriptor.paths[path][method];

							if (operationId) {

								if (!operationIds.includes(operationId)) {
									operationIds.push(operationId);
								}
								else if (!multiplesOperationIds.includes(operationId)) {
									multiplesOperationIds.push(operationId);
								}

							}

						});

					});

					return multiplesOperationIds.length ? Promise.reject(new Error(
						"There is more than one use of following operationId in Descriptor : " +
						"[ " + multiplesOperationIds.join(", ") + " ]"
					)) : Promise.resolve();

				}
				else {
					return Promise.resolve();
				}

			}

		}

		// must be inherited
		init () {

			return Promise.reject(new Error("\"init\" method must be inherited"));

		}

		// must be inherited
		release () {

			return Promise.reject(new Error("\"release\" method must be inherited"));

		}

};
