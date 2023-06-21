import Button from "@mui/material/Button";
import Input from "../components/Input";
import { useState } from "react";
import axios from "axios";

const styleforButton1 = {
    margin: "15px auto 10px auto",
    width: "60%",
    display: "block",
};

const styleforButton2 = {
    margin: "5px auto",
    width: "60%",
    display: "block",
    background: "#e093ff",
};

function SigninForm(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (username) {
            try {
                const response = await axios.post("/api/signin", {
                    username,
                    password
                }, { withCredentials: true })
                .then(() => {
                    if (response.data.message === "success") {
                        window.location.href = "/";
                   } else {
                       console.error("Login failed");
                   }
                })
            } catch (error) {
                if(error.response && error.response.status === 401) {
                    setErrors({form: error.response.data.error}) 
                } else {
                console.error("Error Signing In", error);
            }
        }
    };
    }
    return (
        <div className="signup-form">
            <form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    size="small"
                    label="Username"
                    margin="normal"
                    fullWidth
                    inputFunction={(event) => setUsername(event.target.value)}
                />
                <Input
                    type="password"
                    size="small"
                    label="Password"
                    fullWidth
                    inputFunction={(event) => setPassword(event.target.value)}
                />
                {errors.form && <p className="error">{errors.form}</p>}
                <Button
                    style={styleforButton1}
                    type="submit"
                    variant="contained">
                    Login
                </Button>
                <Button
                    style={styleforButton2}
                    onClick={props.buttonFunction}
                    variant="contained">
                    Create Account
                </Button>
            </form>
        </div>
    );
}

export default SigninForm;
