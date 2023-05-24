import ResponsiveAppBar from "../components/ResponsiveAppBar";
import React, { useState } from "react";
import "./ImageUpload.css";
import { FormControl, Input } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";

const styleforButton = {
    margin: "15px auto 10px auto",
    width: "60%",
    display: "block",
};

function ImageUpload() {
    const [file, setFile] = useState(null);
    const [src, setSrc] = useState(null);

    const onFileChange = (event) => {
        setFile(event.target.files[0]);

        const reader = new FileReader();
        reader.onloadend = () => {
            setSrc(reader.result);
        };
        reader.readAsDataURL(event.target.files[0]);
        console.log("file =" + file, "src =" + src);
    };
    const submitForm = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post("/api/imageUpload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("File uploaded successfully");
        } catch (err) {
            console.log("Error uploading", err);
        }
    };

    return (
        <div>
            <ResponsiveAppBar />
            <h1 className="image-upload-heading">Add a photo</h1>
            {src && <img src={src} alt="preview" className="preview-img" />}

            <form className="image-upload-form" onSubmit={submitForm}>
                <FormControl fullWidth>
                    <Input type="file" onChange={onFileChange}></Input>
                    <Button
                        type="submit"
                        variant="contained"
                        style={styleforButton}>
                        Upload
                    </Button>
                </FormControl>
            </form>
            <form method="post" action="/api/test">
                <button type="submit">Test</button>
            </form>
        </div>
    );
}

export default ImageUpload;
