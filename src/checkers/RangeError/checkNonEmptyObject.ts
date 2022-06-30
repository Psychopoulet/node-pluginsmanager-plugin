"use strict";

//  deps

	// locals
	import { checkObjectSync } from "./../TypeError/checkObject";

// module

export function checkNonEmptyObjectSync (dataName: string, data: any): ReferenceError | TypeError | RangeError | null {

	let err: ReferenceError | TypeError | RangeError | null = checkObjectSync(dataName, data) as ReferenceError | TypeError | null;

		if (!err && 1 > Object.keys(data).length) {

			err = new RangeError(
				"\"" + dataName + "\" must have keys"
			);

		}

	return err;

};

export function checkNonEmptyObject (dataName: string, data: any): Promise<void> {

	const err: ReferenceError | TypeError | RangeError | null = checkNonEmptyObjectSync(dataName, data);

	return err ? Promise.reject(err) : Promise.resolve();

};
