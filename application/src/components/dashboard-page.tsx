"use client";

import Link from "next/link";
import { FaCirclePlus } from "react-icons/fa6";
import "./components.css"
import { UploadComponent } from "./upload-component";
import { convertPdfToText } from "@/actions/convert-pdf-to-text";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Files } from "./files";
import { getAllFiles } from "@/actions/get-all-files"
import { FaAngleDoubleDown } from "react-icons/fa";
import Header from "./header";

async function DashboardPage() {
    const [fileUrl, setFileUrl] = useState("");
    const [one, setOne] = useState(true);
    const [two, setTwo] = useState(false);
    const router = useRouter();

    const filesData = [
        { id: 1, name: "Data Structures and Algo", key: "fasdfasdf" }
    ];

    async function handleProceed() {
        console.log(fileUrl);
        router.push("/assistant");
    }

    return (
        <>
            <Header />

            <div id="container2">
                <div className="page2-box">
                    <div style={{ fontWeight: "600", fontSize: "1.5rem" }}>Step 1:</div>

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
                </div>

                {/* <section className="page2-s1">
                    <FaCirclePlus />
                    <p>Drag & drop file here</p>
                </section>


                <section className="page2-s2 button-class">
                    Upload
                </section> */}

                <UploadComponent type="dropzone" setFileUrl={setFileUrl} />


                <section className="page2-s3">
                    <Files data={filesData} />
                </section>


                <section className="page2-s4 button-class">
                    <div onClick={handleProceed} style={{ color: "#FFD56C", textDecoration: "none", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>Proceed</div>
                </section>

            </div>
        </>
    )
}

export default DashboardPage;