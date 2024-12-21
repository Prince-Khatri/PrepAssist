"use client";

import "./components.css"
import Link from "next/link";
import { AiFillRightCircle } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";

type IMessage = { role: string; content: any; };

function AssistantPage() {
    const [input, setInput] = useState('');
    const [chat, setChat] = useState<IMessage[]>([
        { role: 'assistant', content: "How can I help you?" },
    ]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setChat((prevChat) => [...prevChat, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post('/api/ai', {
                prompt: input,
            });

            if (response.data?.response) {
                const assistantMessage = {
                    role: 'assistant',
                    content: response.data.response,
                };
                setChat((prevChat) => [...prevChat, assistantMessage]);
            } else {
                setChat((prevChat) => [
                    ...prevChat,
                    { role: 'assistant', content: 'Oops! Something went wrong.' },
                ]);
            }
        } catch (error) {
            console.error('Error:', error);
            setChat((prevChat) => [
                ...prevChat,
                { role: 'assistant', content: 'An error occurred while fetching the response.' },
            ]);
        } finally {
            setInput("");
            setLoading(false);
        }
    };


    return (
        <>
            <div id="container3">
                <nav className="navbar">
                    <div className="navbar-links">
                        <Link href='/login' className="logIn">Login</Link>
                        <Link href='/register' className="signUp">SignUp</Link>
                    </div>
                </nav>

                <div id="page3-box">
                    <section id="page3-s1">

                    </section>
                    <section id="page3-s2">
                        <div className="s2-box">
                            {chat.map((message, index) => (
                                <div
                                    key={index}
                                    className={`p-2 rounded-md ${message.role === 'user'
                                        ? 'bg-blue-100 text-blue-900 self-end ml-auto'
                                        : 'bg-green-100 text-green-900 self-start mr-auto'
                                        } max-w-[80%]`}
                                >
                                    <strong>{message.role === 'user' ? 'You: ' : 'Assistant: '}</strong>
                                    {message.content}
                                </div>
                            ))}
                            {loading && (
                                <div className="text-sm text-gray-500 italic">Assistant is typing...</div>
                            )}
                        </div>
                        <div className="div">
                            <input value={input || ""} onChange={(e) => setInput(e.target.value)} spellCheck="false" placeholder="Ask prepAssist" />
                            <button onClick={handleSubmit}>
                                <AiFillRightCircle style={{ fontSize: "2.5rem", color: "#1ba057" }} />
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default AssistantPage;