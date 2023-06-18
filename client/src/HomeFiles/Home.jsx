import React, { useState, useEffect } from "react";
import "./home.css";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { createTheme, ThemeProvider } from "@mui/material";
import Card from "./Card";
import SideBar from "./SideBar";
import Footer from "../components/footer";

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
                <Footer />
            </ThemeProvider>
        </div>
    );
}

export default Home;
