import ResponsiveAppBar from "../components/ResponsiveAppBar";
import {useState, useEffect} from 'react';
import { createTheme, ThemeProvider } from "@mui/material";
import "./Upload.css";
import UploadForm from "./UploadForm";
import Signup from "../SignupFiles/Signup";
import axios from "axios";

const theme = createTheme({
    palette: {
        primary: {
            main: "#fd8989",
        },
    },
});



function Upload() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        axios.get('https://rescue-road-be.vercel.app/api/checkLogin', {withCredentials: true})
        .then(res => {
          setIsLoggedIn(res.data.isLoggedIn);
          console.log(res.data.isLoggedIn);
        })
        .catch(err => {
          console.error(err);
        })
      }, []);



    return (
        isLoggedIn == true ? 
        <div>
            <ThemeProvider theme={theme}>
                <ResponsiveAppBar />
                <UploadForm />
            </ThemeProvider>
        </div> :
        <Signup />
    );
}

export default Upload;
