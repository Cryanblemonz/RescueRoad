import React, {useState} from 'react'
import ResponsiveAppBar from '../components/ResponsiveAppBar'
import { createTheme, ThemeProvider } from '@mui/material';
import SignupForm from './SignupForm';
import './Signup.css';
import SigninForm from './SigninForm';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';


import axios from 'axios';


const theme = createTheme({
  palette: {
    primary: {
      main: "#fd8989",
    },
    secondary: { main: "#fff" },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});




function Signup() {
        const [hasAccount, setHasAccount] = useState(false);
        const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

        const styleForIcon = {
            height: "10%",
            width: isSmallScreen ? "20%" : "10%",
            margin: "0 auto",
            display: "block",
            transform: "Rotate(-10deg)"
    }

        function switchForm(){
                setTimeout(() => {
                        if (hasAccount) {
                                setHasAccount(false);
                        } else {
                                setHasAccount(true);
                        }
                }, 400)

        }
        return (
hasAccount ? 
    <div>
      <ThemeProvider theme={theme}>
        <ResponsiveAppBar />
        <h1 id="signup-heading">Lets get started</h1>
        <PetsOutlinedIcon style={styleForIcon}/>
                <SignupForm buttonFunction={switchForm} />
      </ThemeProvider>
    </div>
    :     <div>
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar />
      <h1 id="signup-heading">Login</h1>
      <PetsOutlinedIcon style={styleForIcon}/>
              <SigninForm buttonFunction={switchForm} />
    </ThemeProvider>
  </div>
  );
}

export default Signup;
