"use strict";

// module

module.exports = function infos (descriptor) {

	if ("undefined" === typeof descriptor.info) {

		return Promise.reject(new ReferenceError(
			"Missing \"info\" content in the plugin's Descriptor"
		));

	}
		else if ("object" !== typeof descriptor.info) {

			return Promise.reject(new TypeError(
				"\"info\" content in the plugin's Descriptor is not an object"
			));

		}
			else if ("undefined" === typeof descriptor.info.title) {

				return Promise.reject(new ReferenceError(
					"Missing \"info.title\" data in the plugin's Descriptor"
				));

			}
				else if ("string" !== typeof descriptor.info.title) {

					return Promise.reject(new TypeError(
						"\"info.title\" data in the plugin's Descriptor is not a string"
					));

				}
				else if ("" === descriptor.info.title.trim()) {

					return Promise.reject(new RangeError(
						"\"info.title\" data in the plugin's Descriptor is empty"
					));

				}

			else if ("undefined" === typeof descriptor.info.version) {

				return Promise.reject(new ReferenceError(
					"Missing \"info.version\" data in the plugin's Descriptor"
				));

			}

				else if ("string" !== typeof descriptor.info.version) {

					return Promise.reject(new TypeError(
						"\"info.version\" data in the plugin's Descriptor is not a string"
					));

				}

				else if ("" === descriptor.info.version.trim()) {

					return Promise.reject(new RangeError(
						"\"info.version\" data in the plugin's Descriptor is empty"
					));

				}
	else {

		return Promise.resolve();

	}

};
