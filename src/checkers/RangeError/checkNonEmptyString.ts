//  deps

    // locals
    import { checkStringSync } from "./../TypeError/checkString";

// module

export function checkNonEmptyStringSync (dataName: string, data: any): ReferenceError | TypeError | RangeError | null {

    let err: ReferenceError | TypeError | RangeError | null = checkStringSync(dataName, data) as ReferenceError | TypeError | null;

        if (!err && "" === (data as string).trim()) {

            err = new RangeError(
                "\"" + dataName + "\" length must be higher than 0"
            );

        }

    return err;

};

export function checkNonEmptyString (dataName: string, data: any): Promise<void> {

    const err: ReferenceError | TypeError | RangeError | null = checkNonEmptyStringSync(dataName, data);

    return err ? Promise.reject(err) : Promise.resolve();

}
