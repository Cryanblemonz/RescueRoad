import ResponsiveAppBar from "../components/ResponsiveAppBar";
import { createTheme, ThemeProvider } from "@mui/material";
import './Upload.css';
import UploadForm from "./UploadForm";
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
                <UploadForm />
                </ThemeProvider>
        </div>
}

export default Upload;