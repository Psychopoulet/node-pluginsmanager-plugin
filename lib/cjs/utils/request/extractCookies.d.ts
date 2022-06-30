import { iIncomingMessage } from "../../components/Server";
export default function extractCookies(req: iIncomingMessage): {
    [key: string]: string;
};
