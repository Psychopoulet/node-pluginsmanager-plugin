"use strict";

//  deps

	// locals
	import checkString from "../TypeError/checkString";

// private

	// methods

		/**
		* Execute a synchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @returns {ReferenceError|TypeError|RangeError|null} check result
		*/
		function _checkSync (dataName: string, data: any): ReferenceError | TypeError | RangeError | null {

			let err: ReferenceError | TypeError | null = checkString(dataName, data, false) as ReferenceError | TypeError | null;

				if (!err && "" === data.trim()) {

					err = new RangeError(
						"\"" + dataName + "\" must be higher than 0"
					);

				}

			return err;

		}

// module

export default function checkNonEmptyString (dataName: string, data: any, async: boolean = true): ReferenceError | TypeError | RangeError | null | Promise<void> {

	const err: ReferenceError | TypeError | RangeError | null = _checkSync(dataName, data);

	if (async) {
		return err ? Promise.reject(err) : Promise.resolve();
	}
	else {
		return err;
	}

};
