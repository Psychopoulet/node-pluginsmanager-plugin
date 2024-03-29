//  deps

    // locals
    import { checkStringSync } from "./../TypeError/checkString";
    import { checkIntegerSync } from "./../TypeError/checkInteger";

// module

export function checkStringLengthSync (dataName: string, data: any, length: number): ReferenceError | TypeError | RangeError | null {

    let err: ReferenceError | TypeError | RangeError | null = checkStringSync(dataName, data);

        if (!err) {
            err = checkIntegerSync(dataName + "/length", length);
        }

        if (!err && length !== (data as string).length) {

            err = new RangeError(
                "\"" + dataName + "\" length must be equal to " + length
            );

        }

    return err;

}

export function checkStringLength (dataName: string, data: any, length: number): Promise<void> {

    const err: ReferenceError | TypeError | RangeError | null = checkStringLengthSync(dataName, data, length);

    return err ? Promise.reject(err) : Promise.resolve();

}
