import Button from "@mui/material/Button";
import Input from "../components/Input";
import axios from "axios";
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import * as yup from "yup";

function fade() {
    gsap.to("#success-heading", { opacity: 1, duration: 1.5 });
    gsap.from("#success-heading", { rotate: "-170_short", duration: 0.7 });
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
    const [errors, setErrors] = useState({})

    const signupSchema = yup.object().shape({
        email: yup.string().email().required(),
        username: yup.string().min(6).max(18).required(),
        password1: yup.string().min(6).max(18).required(),
        password2: yup.string().min(6).max(18).required(),
        zipCode: yup.string().min(5).max(5).required(),
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const userData = { username, password1, password2, email, zipCode };

        if (password1 !== password2) {
            setErrors(prevErrors => ({...prevErrors, password: 'Passwords do not match'}));
            return;
        }

        try {
            const validatedData = signupSchema.validateSync(userData, { abortEarly: false });
            setErrors({}); 
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                let errorMessages = {};
                error.inner.forEach((validationError) => {
                    errorMessages[validationError.path] = validationError.message;
                });
                setErrors(errorMessages);
            } else {
                console.error(error);
            }
            return;
        }

        try {
            const response = await axios.post("https://rescue-road-backend.onrender.com/api/signup",  {withCredentials: true}, { username, password1, email, zipCode });
            setErrors({});
            fade();

            setTimeout(() => {
                window.location.href = "/signup";
            }, 2000);
        } catch (error) {
            if (error.response && error.response.status === 409) {
                setErrors({ form: error.response.data.error });
            } else {
                console.error('Error signing up', error);
            }
        }
    };


    function test(){
        if(errors.form == "Username unavailable"){
            console.log("works")
        }
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
                    inputFunction={(event) => setEmail(event.target.value)}
                />
                {errors.email && <p className="error">Please enter a valid email</p>}
                {errors.form && errors.form != "Username unavailable" && <div className="error">{errors.form}</div>}

                <Input
                    type="text"
                    size="small"
                    label="Zip Code"
                    margin="normal"
                    fullWidth
                    name="zipCode"
                    inputFunction={(event) => setZipCode(event.target.value)}
                />
                {errors.zipCode && <p className="error">Please enter a valid zip code</p>}
                <Input
                    type="text"
                    size="small"
                    label="Choose a Username"
                    margin="normal"
                    fullWidth
                    name="username"
                    inputFunction={(event) => setUsername(event.target.value)}
                />
                {errors.username && <p className="error">Username must be between 6 and 18 characters.</p>}
                {errors.form && errors.form == "Username unavailable" && <div className="error">{errors.form}</div>}
                <Input
                    type="password"
                    size="small"
                    label="Choose a Password"
                    fullWidth
                    name="password1"
                    inputFunction={(event) => setPassword1(event.target.value)}
                />
                            {errors.password1 && <p className="error">Password must be between 6 and 18 characters</p>}

                            {errors.password && <p className="error">{errors.password}</p>}

                <Input
                    type="password"
                    size="small"
                    label="Confirm Password"
                    fullWidth
                    name="password2"
                    inputFunction={(event) => setPassword2(event.target.value)}
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
