"use strict";

//  deps

	// locals
	import checkNumber from "./../TypeError/checkNumber";
	import checkNonEmptyNumber from "./checkNonEmptyNumber";

// private

	// methods

		/**
		* Execute a synchronous check on data
		* @param {string} dataName: data identifier
		* @param {any} data: data to check
		* @param {number} min: min to check
		* @param {number} max: max to check
		* @returns {ReferenceError|TypeError|RangeError|null} check result
		*/
		function _checkSync (dataName: string, data: any, min: number, max: number): ReferenceError | TypeError | RangeError | null {

			let err: ReferenceError | TypeError | RangeError | null = checkNumber(dataName, data, false) as ReferenceError | TypeError | null;

				if (!err) {
					err = checkNumber(dataName + "/min", min, false) as ReferenceError | TypeError | null;
				}

				if (!err) {
					err = checkNonEmptyNumber(dataName + "/max", max, false) as ReferenceError | TypeError | RangeError | null;
				}

				if (!err && min >  (data as number)) {

					err = new RangeError(
						"\"" + dataName + "\" must be higher than " + min
					);

				}

				if (!err && max <  (data as number)) {

					err = new RangeError(
						"\"" + dataName + "\" must be lower than " + max
					);

				}

			return err;

		}

// module

export default function checkNumberBetween (dataName: string, data: any, min: number, max: number, async: boolean = true): ReferenceError | TypeError | RangeError | null | Promise<void> {

	const err: ReferenceError | TypeError | RangeError | null = _checkSync(dataName, data, min, max);

	if (async) {
		return err ? Promise.reject(err) : Promise.resolve();
	}
	else {
		return err;
	}

};