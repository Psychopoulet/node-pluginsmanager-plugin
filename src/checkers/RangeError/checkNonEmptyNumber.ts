//  deps

    // locals
    import { checkNumberSync } from "./../TypeError/checkNumber";

// module

export function checkNonEmptyNumberSync (dataName: string, data: any): ReferenceError | TypeError | RangeError | null {

    let err: ReferenceError | TypeError | RangeError | null = checkNumberSync(dataName, data) as ReferenceError | TypeError | null;

        if (!err && 0 >= (data as number)) {

            err = new RangeError(
                "\"" + dataName + "\" must be higher than 0"
            );

        }

    return err;

};

export function checkNonEmptyNumber (dataName: string, data: any): Promise<void> {

    const err: ReferenceError | TypeError | RangeError | null = checkNonEmptyNumberSync(dataName, data);

    return err ? Promise.reject(err) : Promise.resolve();

}
