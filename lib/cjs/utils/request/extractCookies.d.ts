import type { iIncomingMessage } from "../../components/Server";
export default function extractCookies(req: iIncomingMessage): Record<string, string>;
