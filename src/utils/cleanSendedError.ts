// module

export default function cleanSendedError (data: Error | Record<string, any> | string | null): Record<string, any> | string | null {

    if ("object" === typeof data) {

        if (null === data) {
            return data;
        }
        else if (data instanceof Error) {
            return data.message;
        }
        else {

            Object.keys(data as Record<string, any>).forEach((key: string): void => {
                data[key] = cleanSendedError(data[key]);
            });

            return data;

        }

    }
    else {
        return data;
    }

}
