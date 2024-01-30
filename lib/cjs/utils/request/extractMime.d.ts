export default function extractMime(contentType: string, code: number, responses: Record<string, {
    "description": string;
    "content"?: Record<string, any>;
}>): string;
