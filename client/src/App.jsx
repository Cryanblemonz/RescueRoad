import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./HomeFiles/Home";
import Signup from "./SignupFiles/Signup";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
            <Routes>
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
}

export default App;
