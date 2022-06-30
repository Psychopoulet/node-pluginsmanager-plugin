"use strict";

//  deps

	// locals
	import { checkExistsSync } from "../ReferenceError/checkExists";

// module

export function checkStringSync (dataName: string, data: any): ReferenceError | TypeError | null {

	let err: ReferenceError | null = checkExistsSync(dataName, data) as ReferenceError | null;

		if (!err && "string" !== typeof data) {

			err = new TypeError(
				"\"" + dataName + "\" is not a string"
			);

		}

	return err;

};

export function checkString (dataName: string, data: any): Promise<void> {

	const err: ReferenceError | TypeError | null = checkStringSync(dataName, data);

	return err ? Promise.reject(err) : Promise.resolve();

};
