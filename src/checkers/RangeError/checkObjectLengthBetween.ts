//  deps

    // locals
    import { checkObjectSync } from "./../TypeError/checkObject";
    import { checkIntegerSync } from "./../TypeError/checkInteger";
    import { checkNonEmptyIntegerSync } from ".//checkNonEmptyInteger";

// module

export function checkObjectLengthBetweenSync (dataName: string, data: any, min: number, max: number): ReferenceError | TypeError | RangeError | null {

    let err: ReferenceError | TypeError | RangeError | null = checkObjectSync(dataName, data) as ReferenceError | TypeError | null;

        if (!err) {
            err = checkIntegerSync(dataName + "/min", min) as ReferenceError | TypeError | null;
        }

        if (!err) {
            err = checkNonEmptyIntegerSync(dataName + "/max", max) as ReferenceError | TypeError | RangeError | null;
        }

        if (!err) {

            const { length }: { "length": number; } = Object.keys(data);

            if (min > length) {

                err = new RangeError(
                    "\"" + dataName + "\" length must be higher than " + min
                );

            }

            if (!err && max < length) {

                err = new RangeError(
                    "\"" + dataName + "\" length must be lower than " + max
                );

            }

        }

    return err;

};

export function checkObjectLengthBetween (dataName: string, data: any, min: number, max: number): Promise<void> {

    const err: ReferenceError | TypeError | RangeError | null = checkObjectLengthBetweenSync(dataName, data, min, max);

    return err ? Promise.reject(err) : Promise.resolve();

}
