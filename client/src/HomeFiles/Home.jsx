import React, { useState } from "react";
import "./home.css";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { createTheme, ThemeProvider } from "@mui/material";
import Card from "./Card";
import Cardback from "./Cardback";
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

    return (
        <div>
            <ThemeProvider theme={theme}>
                <ResponsiveAppBar />
                <Card />

                <form>
                    <button type="submit">Random</button>
                </form>
                <Cardback />
            </ThemeProvider>
        </div>
    );
}

export default Home;
