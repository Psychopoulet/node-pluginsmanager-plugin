/*
	eslint callback-return: 0
*/

"use strict";

// deps

	// natives
	const { join } = require("path");
	const { parse } = require("url");

	// locals
	const MediatorUser = require(join(__dirname, "MediatorUser.js"));

// private

	// methods

		/**
		* Send data to client
		* @param {Request} req: request object
		* @param {Response} res: response object
		* @param {object} content: content to send
		* @param {number} code: HTTP code to send
		* @returns {void}
		*/
		function _send (req, res, content, code) {

			res.writeHead(code, {
				"Content-Type": "application/json; charset=utf-8"
			});

			res.end(JSON.stringify(content), "utf-8");

		}

// module

module.exports = class Server extends MediatorUser {

	// public

		appMiddleware (req, res, next) { // req, res, next : void

			this.checkDescriptor().then(() => {

				const { pathname } = parse(req.url);
				const method = req.method.toLowerCase();

				if (!this._Descriptor.paths[pathname] ||
					!this._Descriptor.paths[pathname][method]) {
					next();
				}
				else {

					const { operationId } = this._Descriptor.paths[pathname][method];

					if ("/" + this._Descriptor.info.title + "/descriptor" === pathname && "get" === method) {
						_send(req, res, this._Descriptor, 200);
					}

					// unknows
					else if (!operationId) {

						_send(req, res, {
							"code": "NOT_IMPLEMENTED",
							"message": "Missing \"operationId\" in the Descriptor for this request"
						}, 501);

					}

					// not implemented
					else if ("function" !== typeof this._Mediator[operationId]) {

						_send(req, res, {
							"code": "NOT_IMPLEMENTED",
							"message": "Unknown Mediator's \"operationId\" method for this request"
						}, 501);

					}

					else {

						new Promise((resolve) => {

							let queryData = "";
							req.on("data", (data) => {
								queryData += data.toString("utf8");
							}).on("end", () => {

								if ("" !== queryData) {
									resolve(JSON.parse(queryData));
								}
								else {
									resolve();
								}

							});

						}).then((data) => {

							if ("undefined" !== typeof data) {
								return this._Mediator[operationId](data);
							}
							else {
								return this._Mediator[operationId]();
							}

						}).then((content) => {

							// created
							if ("put" === method) {
								_send(req, res, content, 201);
							}

							// no content
							else if ("undefined" === typeof content) {
								_send(req, res, content, 204);
							}

							else {
								_send(req, res, content, 200);
							}

						}).catch((err) => {

							if (err instanceof ReferenceError) {

								_send(req, res, {
									"code": "MISSING_PARAMETER",
									"message": err.message ? err.message : err
								}, 400);

							}
							else if (err instanceof TypeError) {

								_send(req, res, {
									"code": "WRONG_TYPE_PARAMETER",
									"message": err.message ? err.message : err
								}, 400);

							}
							else if (err instanceof RangeError) {

								_send(req, res, {
									"code": "RANGE_OR_EMPTY_PARAMETER",
									"message": err.message ? err.message : err
								}, 400);

							}
							else {

								_send(req, res, {
									"code": "INTERNAL_SERVER_ERROR",
									"message": err.message ? err.message : err
								}, 500);

							}

						});

					}

				}

			}).catch((err) => {

				_send(req, res, {
					"code": "INTERNAL_SERVER_ERROR",
					"message": err.message ? err.message : err
				}, 500);

			});

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

			release (...data) {

				return this._releaseWorkSpace(...data).then((...result) => {

					// can only be released by Orchestrator
					if (this._Descriptor) {
						this._Descriptor = null;
					}

					// can only be released by Orchestrator
					if (this._Mediator) {
						this._Mediator = null;
					}

					this._externalRessourcesDirectory = "";

					return Promise.resolve(...result);

				}).then((...result) => {

					this.removeAllListeners();

					return Promise.resolve(...result);

				});

			}

};
