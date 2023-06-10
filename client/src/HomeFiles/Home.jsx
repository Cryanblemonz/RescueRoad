import React, { useState } from "react";
import "./home.css";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { createTheme, ThemeProvider } from "@mui/material";
import Card from "./Card";
import axios from 'axios';

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

async function test(){
    try{
        axios.get("/api/testLocation")
    }
    catch{
        console.error("error");
    }
}


function Home() {



    return (
        <div>
            <ThemeProvider theme={theme}>
                <ResponsiveAppBar />
                <Card />
                <button onClick ={test}>Test</button>
                </ThemeProvider>
        </div>
    );
}

export default Home;
