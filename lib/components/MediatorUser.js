"use strict";

//  deps

	// natives
	const { join } = require("path");

	// locals
	const DescriptorUser = require(join(__dirname, "DescriptorUser.js"));
	const Mediator = require(join(__dirname, "Mediator.js"));

// module

module.exports = class MediatorUser extends DescriptorUser {

	constructor (options) {

		super(options);

		this._Mediator = options && "undefined" !== typeof options.mediator ?
			options.mediator : null;

	}

	// protected

		_initWorkSpace () {

			return Promise.resolve();

		}

		_releaseWorkSpace () {

			return Promise.resolve();

		}

	// public

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

};
