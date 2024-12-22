"use server";

import { signIn } from "@/auth";

export async function signInAction(data: { email: string, password: string }) {
    // await signIn("credentials", data);
    return { success: true };
}