//  deps

    // locals
    import { checkNumberSync } from "./../TypeError/checkNumber";
    import { checkNonEmptyNumberSync } from "./checkNonEmptyNumber";

// module

export function checkNumberBetweenSync (dataName: string, data: any, min: number, max: number): ReferenceError | TypeError | RangeError | null {

    let err: ReferenceError | TypeError | RangeError | null = checkNumberSync(dataName, data);

        if (!err) {
            err = checkNumberSync(dataName + "/min", min);
        }

        if (!err) {
            err = checkNonEmptyNumberSync(dataName + "/max", max);
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

export function checkNumberBetween (dataName: string, data: any, min: number, max: number): Promise<void> {

    const err: ReferenceError | TypeError | RangeError | null = checkNumberBetweenSync(dataName, data, min, max);

    return err ? Promise.reject(err) : Promise.resolve();

}
