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

		if (!this._Mediator) {
			return Promise.reject(new ReferenceError("Mediator not registered"));
		}
		else if ("object" !== typeof this._Mediator || !(this._Mediator instanceof Mediator)) {
			return Promise.reject(new TypeError("Registered Mediator is not an instance of Mediator"));
		}
		else if (!this._Mediator.initialized) {
			return Promise.reject(new Error("Registered Mediator is not initialized"));
		}
		else {
			return Promise.resolve();
		}

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
