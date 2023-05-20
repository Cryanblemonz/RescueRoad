import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Input from "./Input";

const styleforButton1 = {
    margin: "15px auto 10px auto",
    width: "60%",
    display: "block",
};

const styleforButton2 = {
    margin: "5px auto",
    width: "60%",
    display: "block",
    background: "#e093ff",
};

function SigninForm(props) {
        const [username, setUsername] = useState("")
    return (
        <div className="signup-form">
            <form action="/signin" method="post">
                <Input
                    type="text"
                    size="small"
                    label="Username"
                    margin="normal"
                    fullWidth
                />
                <Input
                    type="password"
                    size="small"
                    label="Password"
                    fullWidth
                />
                <Button
                    style={styleforButton1}
                    type="submit"
                    variant="contained">
                    Login
                </Button>
                <Button
                    style={styleforButton2}
                    onClick={props.buttonFunction}
                    variant="contained">
                    Create Account
                </Button>
            </form>
        </div>
    );
}

export default SigninForm;
