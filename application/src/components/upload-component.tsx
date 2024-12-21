"use client";

import { UploadButton } from "@/utils/uploadthing";

export function UploadComponent() {
    return (
        <UploadButton
            endpoint="pdfUploader"
            onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                alert("Upload Completed");
            }}
            onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
            }}
        />
    );
};
