import User from "@/models/User";
import { ConnectToDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signIn } from "@/auth";

ConnectToDB();

export async function POST(request: NextRequest) {
    try {
        const { username, email, password }: { username: string; email: string; password: string } = await request.json();
        if (!username || !email || !password) {
            return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
            );
        }
        // check if user exists or not
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({
            username: username,
            email: email,
            hashedPassword: hashedPassword,
        });

        // create new user
        await newUser.save();

        try {
            await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
        } catch (error) {
            throw error;
        }

        return NextResponse.json({
            message: "User created successfully",
            success: true,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}