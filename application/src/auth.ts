// import NextAuth from "next-auth"
 
// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [],
// })

import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/models/User";
import NextAuth from "next-auth";
import { ConnectToDB } from "./utils/db";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (creds: any) => {
                ConnectToDB();
                try {
                    const user = await User.findOne({ email: creds.email });
                    
                    if (user) {
                        // check if password is correct
                        const validPassword = await bcrypt.compare(creds.password, user.hashedPassword);
                        if (validPassword) {
                            return user;
                        } else {
                            throw new Error("Password not correct");
                        }
                    } else {
                        throw new Error("User not found");
                    }
                } catch (error: any) {
                    throw new Error(error.message);
                }
            },
        }),
    ],
})