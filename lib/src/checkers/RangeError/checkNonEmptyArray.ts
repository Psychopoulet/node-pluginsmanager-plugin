//  deps

    // locals
    import { checkArraySync } from "./../TypeError/checkArray";

// module

export function checkNonEmptyArraySync (dataName: string, data: any): ReferenceError | TypeError | RangeError | null {

    let err: ReferenceError | TypeError | RangeError | null = checkArraySync(dataName, data);

        if (!err && 1 > (data as any[]).length) {

            err = new RangeError(
                "\"" + dataName + "\" length must be higher than 0"
            );

        }

    return err;

}

export function checkNonEmptyArray (dataName: string, data: any): Promise<void> {

    const err: ReferenceError | TypeError | RangeError | null = checkNonEmptyArraySync(dataName, data);

    return err ? Promise.reject(err) : Promise.resolve();

}
