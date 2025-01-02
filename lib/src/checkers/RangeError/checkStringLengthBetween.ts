//  deps

    // locals
    import { checkStringSync } from "./../TypeError/checkString";
    import { checkIntegerSync } from "./../TypeError/checkInteger";
    import { checkNonEmptyIntegerSync } from "./checkNonEmptyInteger";

// module

export function checkStringLengthBetweenSync (dataName: string, data: any, min: number, max: number): ReferenceError | TypeError | RangeError | null {

    let err: ReferenceError | TypeError | RangeError | null = checkStringSync(dataName, data);

        if (!err) {
            err = checkIntegerSync(dataName + "/min", min);
        }

        if (!err) {
            err = checkNonEmptyIntegerSync(dataName + "/max", max);
        }

        if (!err && min > (data as string).length) {

            err = new RangeError(
                "\"" + dataName + "\" length must be higher than " + min
            );

        }

        if (!err && max < (data as string).length) {

            err = new RangeError(
                "\"" + dataName + "\" length must be lower than " + max
            );

        }

    return err;

}

export function checkStringLengthBetween (dataName: string, data: any, min: number, max: number): Promise<void> {

    const err: ReferenceError | TypeError | RangeError | null = checkStringLengthBetweenSync(dataName, data, min, max);

    return err ? Promise.reject(err) : Promise.resolve();

}
