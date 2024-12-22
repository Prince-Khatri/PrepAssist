// actions/login.ts

"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import * as z from "zod";

const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

export const login = async (values: z.infer<typeof LoginSchema>) => {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password } = validatedFields.data;

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/dashboard",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            console.log(error.type)
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" };
                default:
                    return { error: "Something went wrong!" };
            }
        }
        
        throw error;
    }
};