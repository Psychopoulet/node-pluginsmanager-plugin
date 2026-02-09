export declare function checkArrayLengthBetweenSync(dataName: string, data: unknown, min: number, max: number): ReferenceError | TypeError | RangeError | null;
export declare function checkArrayLengthBetween(dataName: string, data: unknown, min: number, max: number): Promise<void>;
