export default function extractMime(contentType: string, code: number, responses: {
    [key: string]: {
        "description": string;
        "content"?: {
            [key: string]: any;
        };
    };
}): string;
