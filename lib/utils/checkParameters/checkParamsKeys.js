"use strict";

// module

module.exports = function checkParamsKeys (parameters, paramsDoc, type) {

	let err = null;

		const paramsKeys = Object.keys(parameters);

		// check missing params

		const missingParams = paramsDoc.filter((p) => {
			return p.required && !paramsKeys.includes(p.name);
		}).map((p) => {
			return p.name;
		});

		if (missingParams.length) {

			err = new ReferenceError(
				"Missing " + type + " parameters :" +
				" [ \"" + missingParams.join("\", \"") + "\" ]"
			);

		}

		// check unexpected params
		if (!err) {

			const paramsDocKeys = paramsDoc.map((p) => {
				return p.name;
			});

			const notWantedParams = paramsKeys.filter((p) => {
				return !paramsDocKeys.includes(p);
			});

			if (notWantedParams.length) {

				err = new ReferenceError(
					"Not wanted body parameters :" +
					" [ \"" + notWantedParams.join("\", \"") + "\" ]"
				);

			}

		}

	return err;

};
