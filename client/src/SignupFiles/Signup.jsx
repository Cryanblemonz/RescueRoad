import React, {useState} from 'react'
import ButtonAppBar from '../HomeFiles/components/ResponsiveAppBar'
import { createTheme, ThemeProvider } from '@mui/material';
import SignupForm from './SignupForm';
import './Signup.css'
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';


import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: "#fd8989"
    },
    secondary: {main: "#fff"}
  }
})

const styleForIcon = {
        height: "120px",
        width: "200px",
        margin: "0 auto",
        display: "block",
        transform: "Rotate(-10deg)"
}


function Signup() {
        const [hasAccount, setHasAccount] = useState(false);
        return (
!hasAccount ? 
    <div>
      <ThemeProvider theme={theme}>
        <ButtonAppBar />
        <h1 id="signup-heading">Lets get started</h1>
        <PetsOutlinedIcon style={styleForIcon}/>
                <SignupForm />
      </ThemeProvider>
    </div>
    : null
  );
}

export default Signup;
