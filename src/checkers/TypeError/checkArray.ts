"use strict";

//  deps

	// locals
	import checkObject from "./checkObject";

// private

	// methods

		/**
		* Execute a synchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @returns {ReferenceError|TypeError|null} check result
		*/
		function _checkSync (dataName: string, data: any): ReferenceError | TypeError | null {

			let err: ReferenceError | TypeError | null = checkObject(dataName, data, false) as ReferenceError | TypeError | null;

				if (!err && !(data instanceof Array)) {

					err = new TypeError(
						"\"" + dataName + "\" is not an Array"
					);

				}

			return err;

		}

// module

export default function checkArray (dataName: string, data: any, async: boolean = true): ReferenceError | TypeError | null | Promise<void> {

	const err: ReferenceError | TypeError | null = _checkSync(dataName, data);

	if (async) {
		return err ? Promise.reject(err) : Promise.resolve();
	}
	else {
		return err;
	}

};
