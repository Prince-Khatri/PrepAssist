"use server";

import axios from "axios";
import { getRequestContext } from "@cloudflare/next-on-pages";

export async function convertPdfToText(url: string) {
    const userId = 1;
    try {
        const pdf2txt = await axios.get("http://127.0.0.1:8000/api/extract-text", { params: { url } });
        const extractedText = pdf2txt.data?.extracted_text;
        if (extractedText) {
            const res = await getRequestContext().env.DB.prepare(
                "INSERT INTO Documents (UserId, TextData) VALUES (?, ?);"
            )
            .bind(userId, extractedText)
            .run();
            console.log("Data inserted to db");
            console.log(res);
            return { success: true };
        }
        return { success: false };
    } catch (error) {
        console.log(error);
    }
}
