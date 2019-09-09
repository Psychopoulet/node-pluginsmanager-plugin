"use strict";

// module

module.exports = function multiplesParameters (descriptor) {

	let err = null;

		Object.keys(descriptor.paths).forEach((path) => {

			Object.keys(descriptor.paths[path]).forEach((method) => {

				if (descriptor.paths[path][method].parameters) {

					const datas = [];
					const multiplesDatas = [];

						descriptor.paths[path][method].parameters.map((param) => {
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

};
