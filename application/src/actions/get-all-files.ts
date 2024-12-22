"use server";

import { utapi } from "@/server/uploadthing";

export async function getAllFiles() {
    const res = await utapi.listFiles();
    return res;
}