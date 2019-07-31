"use strict";

// deps

	// natives
	const { join } = require("path");

	// locals
	const MediatorUser = require(join(__dirname, "MediatorUser.js"));

// module

module.exports = class Server extends MediatorUser {

	constructor (options) {

		super(options);

		if (options && "undefined" !== typeof options.mediator) {
			this._Mediator = options.mediator;
		}

	}

	appMiddleware (req, res, next) { // req, res, next : void
		return next();
	}

	httpMiddleware () { // req, res : boolean
		return false;
	}

	socketMiddleware () { // socket : WebSocket | SocketIO
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
