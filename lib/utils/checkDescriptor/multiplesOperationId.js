"use strict";

// module

module.exports = function multiplesOperationId (descriptor) {

	const datas = [];
	const multiplesDatas = [];

		Object.keys(descriptor.paths).forEach((path) => {

			Object.keys(descriptor.paths[path]).filter((method) => {
				return descriptor.paths[path][method].operationId;
			}).map((method) => {
				return descriptor.paths[path][method].operationId;
			}).forEach((operationId) => {

				if (!datas.includes(operationId)) {
					datas.push(operationId);
				}
				else if (!multiplesDatas.includes(operationId)) {
					multiplesDatas.push(operationId);
				}

			});

		});

	return multiplesDatas.length ? Promise.reject(new Error(
		"There is more than one use of following operationId in Descriptor : " +
		"[ " + multiplesDatas.join(", ") + " ]"
	)) : Promise.resolve();

};
