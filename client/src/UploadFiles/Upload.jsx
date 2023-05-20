import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { createTheme, ThemeProvider } from "@mui/material";
import './Upload.css';
const theme = createTheme({
        palette: {
            primary: {
                main: "#fd8989",
            }
        }
    });

function Upload(){
        return <div>
                <ThemeProvider theme={theme}>
                <ResponsiveAppBar />
                <h1 className="upload-heading">Upload a New Pet</h1>
                </ThemeProvider>
        </div>
}

export default Upload;