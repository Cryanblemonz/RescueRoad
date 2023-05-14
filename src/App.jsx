import React from 'react'
import './App.css'
import ButtonAppBar from './components/ResponsiveAppBar'
import { createTheme, ThemeProvider } from '@mui/material';

import Card from './Card'

const theme = createTheme({
  palette: {
    primary: {
      main: "#fd8989"
    }
  }
})


function App() {
  

  return (
    <div>
      <ThemeProvider theme={theme}>
        <ButtonAppBar />
          <Card />

      </ThemeProvider>
    </div>
  );
}

export default App;