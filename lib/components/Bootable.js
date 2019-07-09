"use strict";

//  deps

	// natives
	const Events = require("events");

// module

module.exports = class Bootable extends Events {

	init () {
		return Promise.resolve();
	}

	release () {

		return Promise.resolve().then(() => {

			this.removeAllListeners();

			return Promise.resolve();

		});

	}

};
