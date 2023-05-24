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



  return (
    <div>
      <ThemeProvider theme={theme}>
        <ResponsiveAppBar />
          <Card />
      </ThemeProvider>
      <form method="post" action="/api/test">
      <button type="submit">Test</button>
      </form>
    </div>
  );
}

export default Home;

