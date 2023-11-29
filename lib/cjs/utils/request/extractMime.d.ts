import { iIncomingMessage } from "../../components/Server";
export default function send(req: iIncomingMessage, code: number, responses: {
    [key: string]: {
        "description": string;
        "content"?: {
            [key: string]: any;
        };
    };
}): string;
