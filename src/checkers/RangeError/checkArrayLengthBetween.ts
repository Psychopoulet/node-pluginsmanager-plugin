//  deps

    // locals
    import { checkArraySync } from "./../TypeError/checkArray";
    import { checkIntegerSync } from "./../TypeError/checkInteger";
    import { checkNonEmptyIntegerSync } from "./checkNonEmptyInteger";

// module

export function checkArrayLengthBetweenSync (dataName: string, data: any, min: number, max: number): ReferenceError | TypeError | RangeError | null {

    let err: ReferenceError | TypeError | RangeError | null = checkArraySync(dataName, data);

        if (!err) {
            err = checkIntegerSync(dataName + "/min", min);
        }

        if (!err) {
            err = checkNonEmptyIntegerSync(dataName + "/max", max);
        }

        if (!err && min > (data as any[]).length) {

            err = new RangeError(
                "\"" + dataName + "\" length must be higher than " + min
            );

        }

        if (!err && max < (data as any[]).length) {

            err = new RangeError(
                "\"" + dataName + "\" length must be lower than " + max
            );

        }

    return err;

}

export function checkArrayLengthBetween (dataName: string, data: any, min: number, max: number): Promise<void> {

    const err: ReferenceError | TypeError | RangeError | null = checkArrayLengthBetweenSync(dataName, data, min, max);

    return err ? Promise.reject(err) : Promise.resolve();

}
