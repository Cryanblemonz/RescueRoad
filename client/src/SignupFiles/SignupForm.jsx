import Button from "@mui/material/Button";
import Input from "../components/Input";
import axios from 'axios';
import {useState} from 'react';
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { gsap } from 'gsap';
import * as yup from 'yup';

function fade(){
    gsap.to("#success-heading", {opacity: 1, duration: 1.5})
    gsap.from("#success-heading", {rotate:"-170_short", duration: .7})
    console.log("ran");
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

        const signupSchema = yup.object().shape({
            email: yup.string().email().required(),
            username: yup.string().min(6).max(18).required(),
            password1: yup.string().min(6).max(18).required(),
            password2: yup.string().min(6).max(18).required(),
            zipCode: yup.string().min(5).max(5).required()
        })

        const handleSubmit = async (event) => {
            event.preventDefault();
            // Creating user data
            const userData = {username, password1, password2, email, zipCode};
        
            // Checking if password1 and password2 are the same
            if(password1 !== password2){
                console.error("Passwords do not match");
                return;
            }
        
            // Running Yup validation
            try {
                // This will throw an error if validation fails
                await signupSchema.validate(userData);
            } catch (error) {
                console.error("Validation Error:", error);
                return;
            }
        
            // Sending POST request
            try {
                // As we have already checked for password match, we do not need to send password2 to server
                const response = await axios.post('/api/signup', {
                    username, password1, email, zipCode
                })
            } catch (error) {
                console.error('Error signing up', error);
                return;
            }
        
            console.log("Before fade");
            fade();
            console.log("After fade");
            
            console.log("Before setTimeout");
            setTimeout(() => {
                console.log("Inside setTimeout");
                window.location.href = "/signup";
            }, 2000);
            console.log("After setTimeout");
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
