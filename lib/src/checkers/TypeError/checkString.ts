//  deps

    // locals
    import { checkExistsSync } from "../ReferenceError/checkExists";

// module

export function checkStringSync (dataName: string, data: unknown): ReferenceError | TypeError | null {

    let err: ReferenceError | null = checkExistsSync(dataName, data);

        if (!err && "string" !== typeof data) {

            err = new TypeError(
                "\"" + dataName + "\" is not a string"
            );

        }

    return err;

}

export function checkString (dataName: string, data: unknown): Promise<void> {

    const err: ReferenceError | TypeError | null = checkStringSync(dataName, data);

    return err ? Promise.reject(err) : Promise.resolve();

}
