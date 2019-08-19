/*
	eslint-disable no-sync
*/

"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const Bootable = require(join(__dirname, "Bootable.js"));
	const Mediator = require(join(__dirname, "Mediator.js"));

// module

module.exports = class MediatorUser extends Bootable {

	constructor (options) {

		super(options);

		// params
		this._Descriptor = null;
		this._Mediator = null;

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
			else {

				return Promise.resolve();

			}

		}

		checkMediator () {

			if ("undefined" === typeof this._Mediator || null === this._Mediator) {

				return Promise.reject(new ReferenceError("Mediator not registered"));

			}
			else if ("object" !== typeof this._Mediator || !(this._Mediator instanceof Mediator)) {

				return Promise.reject(new TypeError(
					"The plugin has an invalid Mediator which is not an instance (or a child) of the official Mediator class"
				));

			}
			else {

				return Promise.resolve();

			}

		}

		getPaths () {

			return this.checkDescriptor().then(() => {

				return Promise.resolve(
					"object" === typeof this._Descriptor.paths && null !== this._Descriptor.paths ?
						Object.keys(this._Descriptor.paths) : []
				);

			}).then((paths) => {

				return Promise.resolve(paths.length ? paths : []);

			}).then((paths) => {

				const result = [];

					paths.forEach((path) => {

						Object.keys(this._Descriptor.paths[path]).forEach((method) => {

							result.push({
								"path": path,
								"method": method
							});

						});

					});

				return Promise.resolve(result);

			});

		}

		// init / release

		release (...data) {

			return Promise.resolve().then(() => {

				// can only be released by Orchestrator
				if (this._Descriptor) {

					this._Descriptor = null;

				}

				// can only be released by Orchestrator
				if (this._Mediator) {

					this._Mediator = null;

				}

				return Promise.resolve();

			}).then(() => {

				return this._releaseWorkSpace(...data);

			}).then((...result) => {

				this.removeAllListeners();

				return Promise.resolve(...result);

			});

		}

};
