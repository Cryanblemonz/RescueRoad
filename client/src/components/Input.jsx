import TextField from "@mui/material/TextField";

function Input(props) {
    return (
        <TextField
            variant={props.variant}
            type={props.type}
            size={props.size}
            label={props.label}
            margin="normal"
            fullWidth={props.fullWidth}
            onChange={props.inputFunction}
            rows={props.rows}
        />
    );
}

export default Input;
