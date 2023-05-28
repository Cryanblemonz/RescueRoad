import React, { useState } from "react";
import "./home.css";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { createTheme, ThemeProvider } from "@mui/material";
import axios from "axios";

import Card from "./Card";

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

function Home() {

  function handlesubmit(event){
    event.preventDefault();
    axios.post("/api/randomPet");
  }



    const test = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/api/test");
        } catch (err) {
            console.log("Error uploading", err);
        }
    };

    return (
        <div>
            <ThemeProvider theme={theme}>
                <ResponsiveAppBar />
                <Card />
                <form onSubmit={handlesubmit}>
                    <button type="submit">Random</button>
                </form>
            </ThemeProvider>
        </div>
    );
}

export default Home;
