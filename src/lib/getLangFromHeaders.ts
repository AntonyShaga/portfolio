import { headers } from "next/headers";
import { notFound } from "next/navigation";

export async function getLangFromHeaders(): Promise<string> {
    const headersList = await  headers();
    const langFromHeader = headersList.get("x-current-locale");
    const path =
        headersList.get("x-invoke-path") || headersList.get("x-matched-path") || "";
    const lang = langFromHeader || path.split("/")[1];

    if (!["en", "ru"].includes(lang || "")) {
        notFound();
    }

    return lang;
}
