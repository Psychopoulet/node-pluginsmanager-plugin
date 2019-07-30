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

	socketServer () { // socket : WebSocket | SocketIO
		// nothing to do here
	}

	// public

		// init / release

			init (...data) {

				return this.checkMediator().then(() => {
					return this._initWorkSpace(...data);
				});

			}

};
