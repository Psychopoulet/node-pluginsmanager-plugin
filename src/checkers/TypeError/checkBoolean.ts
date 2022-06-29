"use strict";

//  deps

	// locals
	import { checkExistsSync } from "../ReferenceError/checkExists";

// module

export function checkBooleanSync (dataName: string, data: any): ReferenceError | TypeError | null {

	let err: ReferenceError | null = checkExistsSync(dataName, data) as ReferenceError | null;

		if (!err && "boolean" !== typeof data) {

			err = new TypeError(
				"\"" + dataName + "\" is not a boolean"
			);

		}

	return err;

};

export function checkBoolean (dataName: string, data: any): Promise<void> {

	const err: ReferenceError | TypeError | null = checkBooleanSync(dataName, data);

	return err ? Promise.reject(err) : Promise.resolve();

};
