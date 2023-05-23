import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./HomeFiles/Home";
import Signup from "./SignupFiles/Signup";
import Upload from "./UploadFiles/Upload"
import ImageUpload from "./imageUploadFiles/ImageUpload";
import { createTheme, ThemeProvider } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

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

function App() {
    return (
        <ThemeProvider theme={theme}>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Routes>
                <Route path="/signup" element={<Signup />} />
            </Routes>
            <Routes>
                <Route path="/upload" element={<Upload />} />
            </Routes>
            <Routes>
                <Route path="/imageUpload" element={<ImageUpload />} />
            </Routes>
        </Router>
        </ThemeProvider>
    );
}

export default App;
