"use strict";

//  deps

	// locals
	import checkExists from "../ReferenceError/checkExists";

// private

	// methods

		/**
		* Execute a synchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @returns {ReferenceError|TypeError|null} check result
		*/
		function _checkSync (dataName: string, data: any): ReferenceError | TypeError | null {

			let err: ReferenceError | null = checkExists(dataName, data, false) as ReferenceError | null;

				if (!err && "string" !== typeof data) {

					err = new TypeError(
						"\"" + dataName + "\" is not a string"
					);

				}

			return err;

		}

// module

export default function checkString (dataName: string, data: any, async: boolean = true): ReferenceError | TypeError | null | Promise<void> {

	const err: ReferenceError | TypeError | null = _checkSync(dataName, data);

	if (async) {
		return err ? Promise.reject(err) : Promise.resolve();
	}
	else {
		return err;
	}

};
