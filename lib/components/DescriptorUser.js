"use strict";

//  deps

	// natives
	const Events = require("events");
	const { join } = require("path");

	// locals
	const {
		checkDescriptorInfos,
		checkDescriptorPathsStart,
		checkDescriptorPathsSpaces,
		checkDescriptorMultiplesOperationId,
		checkDescriptorPathsParameters,
		checkDescriptorMultiplesParameters
	} = require(join(__dirname, "..", "utils", "checkDescriptor", "main.js"));

// module

module.exports = class DescriptorUser extends Events {

	constructor (options) {

		super(options);

		this._descriptorValidated = false;

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

			// check Descriptor object
			return this._descriptorValidated ? Promise.resolve() : Promise.resolve().then(() => {

				if ("undefined" === typeof this._Descriptor || null === this._Descriptor) {

					return Promise.reject(new ReferenceError("Descriptor not registered"));

				}
					else if ("object" !== typeof this._Descriptor) {

						return Promise.reject(new TypeError(
							"The plugin has an invalid Descriptor which is not an object"
						));

					}
				else {

					return Promise.resolve();

				}

			// check infos
			}).then(() => {

				return checkDescriptorInfos(this._Descriptor);

			// check paths
			}).then(() => {

				if (!this._Descriptor.paths) {
					return Promise.resolve();
				}
				else {

					return checkDescriptorPathsStart(this._Descriptor).then(() => {
						return checkDescriptorPathsSpaces(this._Descriptor);
					}).then(() => {
						return checkDescriptorMultiplesOperationId(this._Descriptor);
					}).then(() => {
						return checkDescriptorMultiplesParameters(this._Descriptor);
					}).then(() => {
						return checkDescriptorPathsParameters(this._Descriptor);
					});

				}

			}).then(() => {

				this._descriptorValidated = true;

			});

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
