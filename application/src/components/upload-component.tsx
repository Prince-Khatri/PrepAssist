"use client";

import { UploadButton, UploadDropzone } from "@/utils/uploadthing";

type Props = { 
    type: "button" | "dropzone",
    setFileUrl: React.Dispatch<React.SetStateAction<string>>
};

export function UploadComponent({ type, setFileUrl }: Props) {
    if (type === "button") return (
        <UploadButton
            endpoint="pdfUploader"
            onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                console.log(res[0].appUrl);
                setFileUrl(res[0].appUrl);
                alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
            }}
        />
    );
    return (
        <UploadDropzone
            endpoint={"pdfUploader"}
            onClientUploadComplete={async (res) => {
                // Do something with the response
                console.log("Files: ", res);
                alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
            }}
        />
    )
};
