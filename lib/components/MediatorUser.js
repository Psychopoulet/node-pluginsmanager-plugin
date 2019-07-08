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
		this._Mediator = options && "undefined" !== typeof options.mediator ? options.mediator : null;

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
		else if (!this._Mediator.initialized) {
			return Promise.reject(new Error("Registered Mediator is not initialized"));
		}
		else {
			return Promise.resolve();
		}

	}

	checkMediatorSync () {

		return "object" === typeof this._Mediator && this._Mediator instanceof Mediator &&
			this._Mediator.initialized;

	}

	release () {

		return Promise.resolve().then(() => {

			if (this._Mediator) {
				this._Mediator = null;
			}

			return Promise.resolve();

		}).then(() => {

			return super.release();

		});

	}

};
