"use strict";

//  deps

	// natives
	const Events = require("events");

// module

module.exports = class Bootable extends Events {

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

		// init / release

		init (...data) {

			return this._initWorkSpace(...data);

		}

		release (...data) {

			return this._releaseWorkSpace(...data);

		}

};
