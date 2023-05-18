import React, {useState} from 'react'
import './App.css'
import ButtonAppBar from './components/ResponsiveAppBar'
import { createTheme, ThemeProvider } from '@mui/material';

import Card from './Card'
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: "#fd8989"
    }
  }
})


function App() {
  const [data, setData] = React.useState(null);
  const dataUrl = "/api"

  function getData(){
    axios
    .get(dataUrl)
    .then((res) => setData(res.data))
    .catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <ButtonAppBar />
          <Card />
          <button onClick={getData}>test</button>
          <p>{data}</p>
      </ThemeProvider>
    </div>
  );
}

export default App;