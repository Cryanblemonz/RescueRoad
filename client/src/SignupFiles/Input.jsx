import TextField from "@mui/material/TextField";

function Input(props) {
    return (
        <TextField
            variant="outlined"
            type={props.type}
            size={props.size}
            label={props.label}
            margin="normal"
            fullWidth={props.fullWidth}
            onChange={props.inputFunction}
        />
    );
}

export default Input;
