"use client";

import Link from "next/link";
import { useState } from "react";

const Header = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle("dark-mode", !isDarkMode);
    };

    return (
        <nav className="navbar">
            <button className="dark-mode-toggle" onClick={toggleDarkMode}>
                {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <div className="navbar-links">
                <Link href='/login' className="logIn">Login</Link>
                <Link href='/register' className="signUp">SignUp</Link>
            </div>
        </nav>
    )
}

export default Header