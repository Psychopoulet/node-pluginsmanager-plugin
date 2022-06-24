"use strict";

//  deps

	// locals
	import checkArray from "./../TypeError/checkArray";
	import checkInteger from "./../TypeError/checkInteger";

// private

	// methods

		/**
		* Execute a synchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @param {number} length: length to check
		* @returns {ReferenceError|TypeError|RangeError|null} check result
		*/
		function _checkSync (dataName: string, data: any, length: number): ReferenceError | TypeError | RangeError | null {

			let err: ReferenceError | TypeError | RangeError | null = checkArray(dataName, data, false) as ReferenceError | TypeError | null;

				if (!err) {
					err = checkInteger(dataName + "/length", length, false) as ReferenceError | TypeError | null;
				}

				if (!err && length !== (data as Array<any>).length) {

					err = new RangeError(
						"\"" + dataName + "\" length must be equal to " + length
					);

				}

			return err;

		}

// module

export default function checkArrayLength (dataName: string, data: any, length: number, async: boolean = true): ReferenceError | TypeError | RangeError | null | Promise<void> {

	const err: ReferenceError | TypeError | RangeError | null = _checkSync(dataName, data, length);

	if (async) {
		return err ? Promise.reject(err) : Promise.resolve();
	}
	else {
		return err;
	}

};
