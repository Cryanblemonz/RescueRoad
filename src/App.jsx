import React,{ useState, useEffect } from 'react'
import './App.css'
import ButtonAppBar from './components/ResponsiveAppBar'
import { createTheme, ThemeProvider } from '@mui/material';
import cats from './components/names';

const theme = createTheme({
  palette: {
    primary: {
      main: "#fd8989"
    }
  }
})


function App() {
  const [imageUrl, setImageUrl] = useState(null);
  const [name, setName] = useState("");
  let randomNumber = Math.floor(Math.random() * cats.length) 
  
  function loadImg(){
    setImageUrl("")
    fetch('https://api.thecatapi.com/v1/images/search')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setImageUrl(data[0].url);
      })
      .catch(error => console.error('Error:', error));
      setName(cats[randomNumber])
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <ButtonAppBar />
        <div>
          <button onClick={loadImg}>Cat</button>
        </div>
        <h1 className="petName">{name ? name : " "}</h1>
        <div className="card">
          {imageUrl && <img src={imageUrl} alt="Random Cat"></img>}
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;