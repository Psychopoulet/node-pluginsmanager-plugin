"use strict";

// module

module.exports = function findPathMethodByOperationId (operationId, desciptorPaths) {

	// no operationId given
	if ("string" !== typeof operationId || "" === operationId.trim()) {
		return null;
	}

	// no desciptorPaths in this Descriptor
	else if ("object" !== typeof desciptorPaths || null === desciptorPaths) {
		return null;
	}

	else {

		let result = null;

			for (let i = 0, paths = Object.keys(desciptorPaths); i < paths.length; ++i) {

				const path = paths[i];

				const method = Object.keys(desciptorPaths[path]).find((m) => {
					return desciptorPaths[path][m].operationId === operationId;
				});

				if ("undefined" !== typeof method) {
					result = desciptorPaths[path][method]; break;
				}

			}

		return result;

	}

};
