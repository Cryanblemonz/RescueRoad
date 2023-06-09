import ResponsiveAppBar from "../components/ResponsiveAppBar";
import React, { useState, useEffect } from "react";
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
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [file, setFile] = useState(null);
    const [src, setSrc] = useState(null);
    const [uploadError, setUploadError] = useState("");

    useEffect(() => {
        axios
            .get("/api/checkLogin", { withCredentials: true })
            .then((res) => {
                setIsLoggedIn(res.data.isLoggedIn);
                console.log(res.data.isLoggedIn);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const onFileChange = (event) => {
        setFile(event.target.files[0]);

        const reader = new FileReader();
        reader.onloadend = () => {
            setSrc(reader.result);
        };
        reader.readAsDataURL(event.target.files[0]);
    };
    const submitForm = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        try {
            await axios.post(
                "/api/imageUpload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
                { withCredentials: true }
            );
            console.log("File uploaded successfully");
            window.location.href = "/";
        } catch (error) {
            if (error.response && error.response.status === 406) {
                console.log(error.response.data.error);
                setUploadError(error.response.data.error);
            } else {
                console.error('Error uploading', error);
            }
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
                    {uploadError && <p className="error">{uploadError}</p>}
                </FormControl>
            </form>
        </div>
    );
}

export default ImageUpload;
