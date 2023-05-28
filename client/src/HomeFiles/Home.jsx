import React, {useState} from 'react'
import './home.css'
import ResponsiveAppBar from '../components/ResponsiveAppBar'
import { createTheme, ThemeProvider } from '@mui/material';

import Card from './Card'

const theme = createTheme({
  palette: {
    primary: {
      main: "#fd8989"
    },
    secondary: {
      main: "rgb(255, 255, 255)"
    }
  }
});


  function Home() {

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
          <img src="https://storage.googleapis.com/rescue-road/1685237732192.png"></img>
      </ThemeProvider>
    </div>
  );
}

export default Home;

