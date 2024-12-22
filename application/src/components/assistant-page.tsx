"use client";

import "./components.css"
import Link from "next/link";
import { AiFillRightCircle } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";
import { generatePrompt } from "@/helpers/ai";
import Header from "./header";
import RenderMarkdown from "./render-markdown";
import { mem0Client } from "@/mem0";

type IMessage = { role: string; content: any; };

function AssistantPage() {
    const [input, setInput] = useState('');
    const [chat, setChat] = useState<IMessage[]>([
        { role: 'assistant', content: "How can I help you?" },
    ]);
    const [loading, setLoading] = useState(false);
    const [one, setOne] = useState(false);
    const [two, setTwo] = useState(true);

    useEffect(() => {
        mem0Client.getAll({ user_id: "fake-id" })
            .then(memories => console.log(memories))
            .catch((error) => console.log(error));
    }, [])

    useEffect(() => {
        mem0Client.add(chat, { user_id: "fake-id" })
            .then((response) => console.log(response))
            .catch((error) => console.log(error));
    }, [])

    const handleSubmit = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setChat((prevChat) => [...prevChat, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post('/api/ai', {
                prompt: generatePrompt(input),
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
                <Header />

                <div id="page3-box">
                    <section id="page3-s1" className="page2-box">
                        <div style={{ fontWeight: "600", fontSize: "1.5rem" }}>Step 2:</div>

                        <div style={{ margin: "25px 0 15px 0" }}>
                            <button onClick={() => { setOne(true); setTwo(false); }}>
                                <Link href="/dashboard">
                                    Upload files<FaAngleDoubleDown style={{ alignSelf: "center", marginLeft: "5px" }} />
                                </Link>
                            </button>
                            <div>
                                <p style={{ fontSize: "0.8rem", marginTop: "5px", display: one ? 'block' : 'none' }}>Please upload all your notes and PDFs to this page, ensuring they are compressed to a minimal file size for efficiency</p>
                            </div>
                        </div>

                        <div>
                            <button onClick={() => { setOne(false); setTwo(true); }}>
                                <Link href="/assistant">
                                    Search your query<FaAngleDoubleDown style={{ alignSelf: "center", marginLeft: "5px" }} />
                                </Link>
                            </button>
                            <div>
                                <p style={{ fontSize: "0.8rem", marginTop: "5px", display: two ? 'block' : 'none' }}>Quickly find important and summarized explanations from uploaded files</p>
                            </div>
                        </div>
                    </section>
                    <section id="page3-s2">
                        <div className="s2-box">
                            {chat.map((message, index) => (
                                <div
                                    key={index}
                                    className={`p-2 rounded-md ${message.role === 'user'
                                        ? 'bg-blue-100 text-blue-900 self-end ml-auto'
                                        : 'bg-green-100 text-green-900 self-start mr-auto'
                                        } max-w-[80%] mt-2`}
                                >
                                    <strong>{message.role === 'user' ? 'You: ' : 'Assistant: '}</strong>
                                    <RenderMarkdown themeContent={message.content} />
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