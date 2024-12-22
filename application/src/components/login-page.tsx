"use client";

import Image from "next/image";
import "./components.css"
import Link from "next/link";
import { useState } from "react";
import { signInAction } from "@/actions/sign-in";
import { useRouter } from "next/navigation";

function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    async function handleSubmit() {
        if (!email || email === "" || !password || password === "") return;
        // await signInAction({ email, password });
        router.push("/dashboard");
    }
    return(
        <>
            <div id="container4">
                <div className="container4-box1">
                    <Image src={'/ill1.png'} alt="random"/>
                </div>

                <div className="container4-box2">
                    <section id="page4-s1">
                        <div className="s1">
                            Login
                        </div>
                    </section>

                    <section id="page4-s2">
                        <div className="s2">
                            <div className="s2-label">
                                Email
                            </div>
                            <div className="s2-input">
                                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>
                        <div className="s2">
                            <div className="s2-label">
                                Password
                            </div>
                            <div className="s2-input">
                                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                    </section>
                    
                    <section id="page4-s3">
                        <div className="s3-1" onClick={handleSubmit}>
                            Log In
                        </div>
                        <div className="s3-2">
                            Don't have an account?<Link href='/register'>Sign Up here</Link>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default LoginPage;