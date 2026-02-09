//  deps

    // locals
    import { checkExistsSync } from "../ReferenceError/checkExists";

// module

export function checkObjectSync (dataName: string, data: unknown): ReferenceError | TypeError | null {

    let err: ReferenceError | null = checkExistsSync(dataName, data);

        if (!err && ("object" !== typeof data || null === data)) {

            err = new TypeError(
                "\"" + dataName + "\" is not an object"
            );

        }

    return err;

}

export function checkObject (dataName: string, data: unknown): Promise<void> {

    const err: ReferenceError | TypeError | null = checkObjectSync(dataName, data);

    return err ? Promise.reject(err) : Promise.resolve();

}
