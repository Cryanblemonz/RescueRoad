import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./HomeFiles/Home";
import Signup from "./SignupFiles/Signup";
import Upload from "./UploadFiles/Upload"
import LikedPets from "./LikedPetsFiles/LikedPets";
import ImageUpload from './imageUploadFiles/ImageUpload';
import { createTheme, ThemeProvider } from '@mui/material';


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
                <Route path="/Signup" element={<Signup />} />
            </Routes>
            <Routes>
                <Route path="/Upload" element={<Upload />} />
            </Routes>
            <Routes>
                <Route path="/imageUpload" element={<ImageUpload />} />
            </Routes>
            <Routes>
                <Route path="/LikedPets" element={<LikedPets />} />
            </Routes>
        </Router>
        </ThemeProvider>
    );
}

export default App;
