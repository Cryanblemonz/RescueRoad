import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";
import "./NoMatch.css";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import HomeIcon from '@mui/icons-material/Home';
import Fab from "@mui/material/Fab";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const styleForIcon={
        height: "200px",
        width: "200px",
        transform: "rotate(150deg)"
}

function NoMatch() {
    return (
        <div>
                <ResponsiveAppBar />
            <div className="no-match-div">
                <h1>404 - Page not found</h1>
                <img className="no-match-img"src="https://storage.googleapis.com/rescue-road/Site%20photos/pxfuel.com.jpg"></img>
                <div className="no-match-buttons">
                <Fab variant="extended" style={{margin: "10px"}} href="/">
                        <HomeIcon /> &nbsp;Return Home 
                </Fab>
                <Fab variant="extended" style={{margin: "10px"}} href="/signup">
                        <PersonAddIcon /> &nbsp;Sign up / Sign in
                </Fab>
                </div>

            </div>
        </div>
    );
}

export default NoMatch;
