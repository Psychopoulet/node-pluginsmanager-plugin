//  deps

    // locals
    import { checkIntegerSync } from "./../TypeError/checkInteger";
    import { checkNonEmptyIntegerSync } from "./checkNonEmptyInteger";

// module

export function checkIntegerBetweenSync (dataName: string, data: any, min: number, max: number): ReferenceError | TypeError | RangeError | null {

    let err: ReferenceError | TypeError | RangeError | null = checkIntegerSync(dataName, data);

        if (!err) {
            err = checkIntegerSync(dataName + "/min", min);
        }

        if (!err) {
            err = checkNonEmptyIntegerSync(dataName + "/max", max);
        }

        if (!err && min > (data as number)) {

            err = new RangeError(
                "\"" + dataName + "\" must be higher than " + min
            );

        }

        if (!err && max < (data as number)) {

            err = new RangeError(
                "\"" + dataName + "\" must be lower than " + max
            );

        }

    return err;

}

export function checkIntegerBetween (dataName: string, data: any, min: number, max: number): Promise<void> {

    const err: ReferenceError | TypeError | RangeError | null = checkIntegerBetweenSync(dataName, data, min, max);

    return err ? Promise.reject(err) : Promise.resolve();

}
