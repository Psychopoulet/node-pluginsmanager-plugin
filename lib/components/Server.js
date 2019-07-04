"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const MediatorUser = require(join(__dirname, "MediatorUser.js"));

// module

module.exports = class Server extends MediatorUser {

	appMiddleware (req, res, next) { // req, res, next : void
		return next();
	}

	httpMiddleware () { // req, res : boolean
		return false;
	}

};
