import React, { useState, useEffect } from "react";
import "./Home.css";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { createTheme, ThemeProvider } from "@mui/material";
import Card from "./Card";
import SideBar from "./SideBar";
import Footer from "../components/footer";
import axios from "axios";

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
                <SideBar />
                <Card />
            </ThemeProvider>
        </div>
    );
}

export default Home;
