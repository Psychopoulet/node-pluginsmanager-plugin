"use strict";

// module

module.exports = function multiplesParameters (path, method, parameters) {

	let err = null;

		const datas = [];
		const multiplesDatas = [];

		parameters.map((parameter) => {
			return parameter.name;
		}).forEach((parameter) => {

			if (!datas.includes(parameter)) {
				datas.push(parameter);
			}
			else if (!multiplesDatas.includes(parameter)) {
				multiplesDatas.push(parameter);
			}

		});

		if (multiplesDatas.length) {

			err = new Error(
				"There is more than one use of following parameters" +
				" [ \"" + multiplesDatas.join("\", \"") + "\" ]" +
				" in the request path \"[" + path + "]" + method + "\""
			);

		}

	return err;

};
