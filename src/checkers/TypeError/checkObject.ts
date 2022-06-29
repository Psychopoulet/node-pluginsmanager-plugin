"use strict";

//  deps

	// locals
	import { checkExistsSync } from "../ReferenceError/checkExists";

// module

export function checkObjectSync (dataName: string, data: any): ReferenceError | TypeError | null {

	let err: ReferenceError | null = checkExistsSync(dataName, data) as ReferenceError | null;

		if (!err && ("object" !== typeof data || null === data)) {

			err = new TypeError(
				"\"" + dataName + "\" is not an object"
			);

		}

	return err;

};

export default function checkObject (dataName: string, data: any): Promise<void> {

	const err: ReferenceError | TypeError | null = checkObjectSync(dataName, data);

	return err ? Promise.reject(err) : Promise.resolve();

};
