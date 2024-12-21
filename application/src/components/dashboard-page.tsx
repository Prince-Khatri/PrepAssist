"use client";

import Link from "next/link";
import { FaCirclePlus } from "react-icons/fa6";
import "./components.css"
import { UploadComponent } from "./upload-component";
import { convertPdfToText } from "@/actions/convert-pdf-to-text";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function DashboardPage() {
    const [fileUrl, setFileUrl] = useState("");
    const router = useRouter();

    async function handleProceed() {
        console.log(fileUrl)
        // const pdf2txt = await axios.get("http://127.0.0.1:8000/api/extract-text", { params: { fileUrl } });
        // console.log(pdf2txt.data);
        // const res = await convertPdfToText(fileUrl);
        // if (res?.success) router.push("/assistant");
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar-links">
                    <Link href='/login'>Login</Link>
                    <Link href='/register'>SignUp</Link>
                </div>
            </nav>

            <div id="container2">
                <div className="page2-box">

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
                    <div>Box 1</div>
                    <div>Box 2</div>
                    <div>Box 3</div>
                    <div>Box 4</div>
                    <div>Box 5</div>
                    <div>Box 6</div>
                </section>


                <section className="page2-s4 button-class">
                    <div onClick={handleProceed} style={{ color: "#FFD56C", textDecoration: "none", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>Proceed</div>
                </section>

            </div>
        </>
    )
}

export default DashboardPage;