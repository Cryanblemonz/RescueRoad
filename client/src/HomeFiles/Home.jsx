import React, { useState } from "react";
import "./home.css";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { createTheme, ThemeProvider } from "@mui/material";
import Card from "./Card";
import axios from 'axios';
import SideBar from './SideBar';
import Input from "../components/Input";

const theme = createTheme({
    palette: {
        primary: {
            main: "#fd8989",
        },
        secondary: {
            main: "rgb(255, 255, 255)",
        },
    },
});

function testSession(){
    axios.get("/api/testSession");
}


function Home() {



    return (
        <div>
            <ThemeProvider theme={theme}>
                <ResponsiveAppBar />
                <SideBar />
                <Card />
                <button style={{position: "absolute", right: "200px"}}onClick={testSession}>Test</button>

                </ThemeProvider>
        </div>
    );
}

export default Home;
