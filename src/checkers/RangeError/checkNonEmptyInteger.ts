//  deps

    // locals
    import { checkIntegerSync } from "./../TypeError/checkInteger";

// module

export function checkNonEmptyIntegerSync (dataName: string, data: any): ReferenceError | TypeError | RangeError | null {

    let err: ReferenceError | TypeError | RangeError | null = checkIntegerSync(dataName, data) as ReferenceError | TypeError | null;

        if (!err && 0 >= (data as number)) {

            err = new RangeError(
                "\"" + dataName + "\" must be higher than 0"
            );

        }

    return err;

};

export function checkNonEmptyInteger (dataName: string, data: any): Promise<void> {

    const err: ReferenceError | TypeError | RangeError | null = checkNonEmptyIntegerSync(dataName, data);

    return err ? Promise.reject(err) : Promise.resolve();

}
