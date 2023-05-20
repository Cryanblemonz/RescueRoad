import React, { useState } from "react";
import ButtonAppBar from "../HomeFiles/components/ResponsiveAppBar";
import { createTheme, ThemeProvider } from "@mui/material";
import SignupForm from "./SignupForm";
import "./Signup.css";
import SigninForm from "./SigninForm";
import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";

import axios from "axios";

const theme = createTheme({
    palette: {
        primary: {
            main: "#fd8989",
        },
        secondary: { main: "#fff" },
    },
});

const styleForIcon = {
    height: "120px",
    width: "200px",
    margin: "0 auto",
    display: "block",
    transform: "Rotate(-10deg)",
};

function Signup() {
    const [hasAccount, setHasAccount] = useState(true);

    function switchForm() {
        setTimeout(() => {
            if (hasAccount) {
                setHasAccount(false);
            } else {
                setHasAccount(true);
            }
        }, 400);
    }
    return hasAccount ? (
        <div>
            <ThemeProvider theme={theme}>
                <ButtonAppBar />
                <h1 id="signup-heading">Lets get started</h1>
                <PetsOutlinedIcon style={styleForIcon} />
                <SignupForm buttonFunction={switchForm} />
            </ThemeProvider>
        </div>
    ) : (
        <div>
            <ThemeProvider theme={theme}>
                <ButtonAppBar />
                <h1 id="signup-heading">Login</h1>
                <PetsOutlinedIcon style={styleForIcon} />
                <SigninForm buttonFunction={switchForm} />
            </ThemeProvider>
        </div>
    );
}

export default Signup;
