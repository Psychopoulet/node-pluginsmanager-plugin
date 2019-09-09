"use strict";

//  deps

	// natives
	const Events = require("events");

// module

module.exports = class DescriptorUser extends Events {

	constructor (options) {

		super(options);

		this._descriptorValidated = false;

		this._Descriptor = options && "undefined" !== typeof options.descriptor ?
			options.descriptor : null;

		this._externalRessourcesDirectory = options && "string" === typeof options.externalRessourcesDirectory ?
			options.externalRessourcesDirectory : "";

	}

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

		checkDescriptor () {

			// check Descriptor object
			return this._descriptorValidated ? Promise.resolve() : Promise.resolve().then(() => {

				if ("undefined" === typeof this._Descriptor || null === this._Descriptor) {

					return Promise.reject(new ReferenceError("Descriptor not registered"));

				}
					else if ("object" !== typeof this._Descriptor) {

						return Promise.reject(new TypeError(
							"The plugin has an invalid Descriptor which is not an object"
						));

					}
				else {

					return Promise.resolve();

				}

			// check Descriptor info object
			}).then(() => {

				if ("undefined" === typeof this._Descriptor.info) {

					return Promise.reject(new ReferenceError(
						"Missing \"info\" content in the plugin's Descriptor"
					));

				}
					else if ("object" !== typeof this._Descriptor.info) {

						return Promise.reject(new TypeError(
							"\"info\" content in the plugin's Descriptor is not an object"
						));

					}
						else if ("undefined" === typeof this._Descriptor.info.title) {

							return Promise.reject(new ReferenceError(
								"Missing \"info.title\" data in the plugin's Descriptor"
							));

						}
							else if ("string" !== typeof this._Descriptor.info.title) {

								return Promise.reject(new TypeError(
									"\"info.title\" data in the plugin's Descriptor is not a string"
								));

							}
							else if ("" === this._Descriptor.info.title.trim()) {

								return Promise.reject(new RangeError(
									"\"info.title\" data in the plugin's Descriptor is empty"
								));

							}

						else if ("undefined" === typeof this._Descriptor.info.version) {

							return Promise.reject(new ReferenceError(
								"Missing \"info.version\" data in the plugin's Descriptor"
							));

						}

							else if ("string" !== typeof this._Descriptor.info.version) {

								return Promise.reject(new TypeError(
									"\"info.version\" data in the plugin's Descriptor is not a string"
								));

							}

							else if ("" === this._Descriptor.info.version.trim()) {

								return Promise.reject(new RangeError(
									"\"info.version\" data in the plugin's Descriptor is empty"
								));

							}
				else {

					return Promise.resolve();

				}

			// check paths start
			}).then(() => {

				if (this._Descriptor.paths) {

					let err = "";

						Object.keys(this._Descriptor.paths).map((path) => {
							return "/" === path[0] ? path.substr(1, path.length) : path;
						}).map((path) => {
							return path.split("/")[0] || "";
						}).forEach((firstPath) => {

							if (!firstPath || firstPath !== this._Descriptor.info.title) {
								err = "All paths must start with descriptor title (\"/" + this._Descriptor.info.title + "\")";
							}

						});

					return err ? Promise.reject(new Error(err)) : Promise.resolve();

				}
				else {
					return Promise.resolve();
				}

			// check multiples operationId
			}).then(() => {

				if (this._Descriptor.paths) {

					const datas = [];
					const multiplesDatas = [];

						Object.keys(this._Descriptor.paths).forEach((path) => {

							Object.keys(this._Descriptor.paths[path]).forEach((method) => {

								const { operationId } = this._Descriptor.paths[path][method];

								if (operationId) {

									if (!datas.includes(operationId)) {
										datas.push(operationId);
									}
									else if (!multiplesDatas.includes(operationId)) {
										multiplesDatas.push(operationId);
									}

								}

							});

						});

					return multiplesDatas.length ? Promise.reject(new Error(
						"There is more than one use of following operationId in Descriptor : " +
						"[ " + multiplesDatas.join(", ") + " ]"
					)) : Promise.resolve();

				}
				else {
					return Promise.resolve();
				}

			// check multiples parameters
			}).then(() => {

				if (this._Descriptor.paths) {

					let err = null;

						Object.keys(this._Descriptor.paths).forEach((path) => {

							Object.keys(this._Descriptor.paths[path]).forEach((method) => {

								if (this._Descriptor.paths[path][method].parameters) {

									const datas = [];
									const multiplesDatas = [];

										this._Descriptor.paths[path][method].parameters.map((param) => {
											return param.name;
										}).forEach((parameter) => {

											if (!datas.includes(parameter)) {
												datas.push(parameter);
											}
											else if (!multiplesDatas.includes(parameter)) {
												multiplesDatas.push(parameter);
											}

										});

									if (multiplesDatas.length) {

										err = "There is more than one use of following parameters in Descriptor" +
											" for \"[" + method + "]" + path + "\" :" +
											" [ " + multiplesDatas.join(", ") + " ]";

									}

								}

							});

						});

					return err ? Promise.reject(new Error(err)) : Promise.resolve();

				}
				else {
					return Promise.resolve();
				}

			}).then(() => {

				this._descriptorValidated = true;

			});

		}

		// must be inherited
		init () {

			return Promise.reject(new Error("\"init\" method must be inherited"));

		}

		// must be inherited
		release () {

			return Promise.reject(new Error("\"release\" method must be inherited"));

		}

};
