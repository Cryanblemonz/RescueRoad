import Button from "@mui/material/Button";
import Input from "../components/Input";
import axios from 'axios';
import {useState} from 'react';
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { gsap } from 'gsap';


function fade(){
    gsap.to("#success-heading", {opacity: 1, duration: 1.5})
    gsap.from("#success-heading", {rotate:"-170_short", duration: .7})
}

const styleforButton1 = {
    margin: "15px auto 10px auto",
    width: "80%",
    display: "block",
};

const styleforButton2 = {
    margin: "5px auto",
    width: "80%",
    display: "block",
    background: "#e093ff",
};



function SignupForm(props) {
        const [email, setEmail] = useState("");
        const [username, setUsername] = useState("");
        const [password1, setPassword1] = useState("");
        const [password2, setPassword2] = useState("");
        const [zipCode, setZipCode] = useState(null);

        const handleSubmit = async (event) => {
                event.preventDefault();
                if(password1 !== password2){
                        console.error("Passwords do not match");
                        return;
                }
                try {
                        const response = await axios.post('/api/signup', {
                                username, password1, password2, email, zipCode
                        })
                } catch (error){
                        console.error('Error signing up', error);
                }
                fade();
                setTimeout(() => {window.location.href="/signup"}, 2000)
        }

    return (
        <div className="signup-form">
            <form onSubmit={handleSubmit}>

                <h2 id="success-heading">Success</h2>

            <Input
                    type="email"
                    size="small"
                    label="Email Address"
                    margin="normal"
                    fullWidth
                    name="email"
                    inputFunction={event => setEmail(event.target.value)}
                />
                    <Input
                    type="text"
                    size="small"
                    label="Zip Code"
                    margin="normal"
                    fullWidth
                    name="zipCode"
                    inputFunction={event => setZipCode(event.target.value)}
                />
                <Input
                    type="text"
                    size="small"
                    label="Choose a Username"
                    margin="normal"
                    fullWidth
                    name="username"
                    inputFunction={event => setUsername(event.target.value)}
                />
                <Input
                    type="password"
                    size="small"
                    label="Choose a Password"
                    fullWidth
                    name="password1"
                    inputFunction={event => setPassword1(event.target.value)}
                />
                <Input
                    type="password" 
                    size="small"
                    label="Confirm Password"
                    fullWidth
                    name="password2"
                    inputFunction={event => setPassword2(event.target.value)}
                />

                <Button
                    style={styleforButton1}
                    type="submit"
                    variant="contained">
                    Create Account
                </Button>
                <Button
                    style={styleforButton2}
                    onClick={props.buttonFunction}
                    variant="contained">
                    Login
                </Button>
            </form>
        </div>
    );
}

export default SignupForm;
