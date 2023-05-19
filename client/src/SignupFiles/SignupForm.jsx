import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Input from './Input'

const styleforButton1 = {
        margin: "5px auto",
        width: "60%",
        display: "block"
}

const styleforButton2 = {
        margin: "5px auto",
        width: "60%",
        display: "block",
        background: "#e093ff"
}

function SignupForm(props){

        return <div className="signup-form">
                <Input type="text" size="small" label="Choose a Username" margin="normal" fullWidth />
                <Input type="password" size="small" label="Choose a Password" fullWidth />  
                <Input type="password" size="small" label="Confirm Password" fullWidth />  
                <Button style={styleforButton1} variant="contained">Create Account</Button>
                <Button style={styleforButton2} variant="contained">Login</Button>
        </div>
}

export default SignupForm;