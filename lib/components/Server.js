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

		if (options && "undefined" !== typeof options.descriptor) {
			this._Descriptor = options.descriptor;
		}

	}

	// public

		appMiddleware (req, res, next) { // req, res, next : void
			return next();
		}

		httpMiddleware () { // req, res : boolean
			return false;
		}

		socketMiddleware () { // socket : WebSocket | SocketIO
			// nothing to do here
		}

		// init / release

			init (...data) {

				return this.checkDescriptor().then(() => {
					return this.checkMediator();
				}).then(() => {
					return this._initWorkSpace(...data);
				});

			}

};
