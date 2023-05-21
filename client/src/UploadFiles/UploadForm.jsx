import Button from "@mui/material/Button";
import Input from "../components/Input";
import axios from "axios";
import { useState } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FaDog } from "react-icons/fa";
import { FaCat } from "react-icons/fa";
import { FaPaw } from "react-icons/fa";

function UploadForm(props) {
    const [heading, setHeading] = useState("Pet");
    const [icon, setIcon] = useState(
        <FaPaw style={{ transform: "rotate(-10deg)" }} />
    );

    function changeHeading() {
        setHeading(event.target.value);
        if (heading !== "Cat") {
            setIcon(<FaCat />);
        } else {
            setIcon(<FaDog />);
        }
    }

    return (
        <div>
            <h1 className="upload-heading">Upload a New {heading} </h1>
            <h1 className="upload-heading">{icon}</h1>

            <form class="upload-form">
                <RadioGroup class="radio-group" onChange={changeHeading} row>
                    <FormControlLabel
                        value="Cat"
                        control={<Radio />}
                        label="Cat"
                    />
                    <FormControlLabel
                        value="Dog"
                        control={<Radio />}
                        label="Dog"
                    />
                </RadioGroup>

                <FormControl fullWidth>
                    <Input
                        variant="standard"
                        type="text"
                        size="medium"
                        label={heading === "Pet" ? "Cat's Name" : "Dog's Name"}
                        fullWidth
                        name="petName"
                    />

                    <Input
                        variant="standard"
                        type="text"
                        size="medium"
                        label="Breed"
                        fullWidth
                        name="petBreed"
                    />
                </FormControl>

                <FormControl fullWidth>
                    <FormLabel
                        class="radios-2"
                        id="demo-radio-buttons-group-label">
                        Age
                    </FormLabel>

                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        row
                        class="radio-group">
                        <FormControlLabel
                            value={heading === "cat" ? "kitten" : "puppy"}
                            control={<Radio />}
                            label={heading === "cat" ? "Kitten" : "Puppy"}
                        />
                        <FormControlLabel
                            value="Young"
                            control={<Radio />}
                            label="Young"
                        />
                        <FormControlLabel
                            value="Adult"
                            control={<Radio />}
                            label="Adult"
                        />
                        <FormControlLabel
                            value="Senior"
                            control={<Radio />}
                            label="Senior"
                        />
                    </RadioGroup>
                    <hr></hr>
                </FormControl>
                <FormControl fullWidth>
                    <FormLabel
                        class="radios-2"
                        id="demo-radio-buttons-group-label">
                        How would this pet do with children?
                    </FormLabel>

                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        row
                        class="radio-group">
                        <FormControlLabel
                            value="No children"
                            control={<Radio />}
                            label="No children"
                        />
                        <FormControlLabel
                            value="Prefer no children"
                            control={<Radio />}
                            label="Prefer no children"
                        />
                        <FormControlLabel
                            value="Neutral"
                            control={<Radio />}
                            label="Neutral"
                        />
                        <FormControlLabel
                            value="Good with children"
                            control={<Radio />}
                            label="Good with children"
                        />
                        <FormControlLabel
                            value="Great with children!"
                            control={<Radio />}
                            label="Great with children!"
                        />
                    </RadioGroup>
                    <hr></hr>
                </FormControl>
                <FormControl fullWidth>
                    <FormLabel
                        class="radios-2"
                        id="demo-radio-buttons-group-label">
                        How would this pet do with {heading === "Cat" && "other "}cats?
                    </FormLabel>
                <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        row
                        class="radio-group">
                        <FormControlLabel
                            value="No cats"
                            control={<Radio />}
                            label="No cats"
                        />
                        <FormControlLabel
                            value="Prefer no cats"
                            control={<Radio />}
                            label="Prefer no cats"
                        />
                        <FormControlLabel
                            value="Neutral"
                            control={<Radio />}
                            label="Neutral     "
                        /><br></br>
                        <FormControlLabel
                            value="Good with cats"
                            control={<Radio />}
                            label="Good with cats"
                        />
                        <FormControlLabel
                            value="Great with cats!"
                            control={<Radio />}
                            label="Great with cats!"
                        />
                    </RadioGroup>
                    <hr></hr>
                </FormControl>
                <FormControl fullWidth>
                    <FormLabel
                        class="radios-2"
                        id="demo-radio-buttons-group-label">
                        How would this pet do with {heading === "Dog" && "other "}dogs?
                    </FormLabel>
                <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        row
                        class="radio-group">
                        <FormControlLabel
                            value="No dogs"
                            control={<Radio />}
                            label="No dogs"
                        />
                        <FormControlLabel
                            value="Prefer no dogs"
                            control={<Radio />}
                            label="Prefer no dogs"
                        />
                        <FormControlLabel
                            value="Neutral"
                            control={<Radio />}
                            label="Neutral     "
                        /><br></br>
                        <FormControlLabel
                            value="Good with dogs"
                            control={<Radio />}
                            label="Good with dogs"
                        />
                        <FormControlLabel
                            value="Great with dogs!"
                            control={<Radio />}
                            label="Great with dogs!"
                        />
                    </RadioGroup>
                    <hr></hr>
                    <Input
                        variant="standard"
                        type="text"
                        size="medium"
                        label="Provide a brief description of this pet"
                        fullWidth
                        name="petBreed"
                        multiline
                    />
                </FormControl>
                <input type="file"></input>
            </form>
        </div>
    );
}

// const dogSchema = mongoose.Schema({
//     name: String,
//     breed: String,
//     age: String,
//     kids: String,
//     cats: String,
//     dogs: String,
//     description: String,
//     img: [imageSchema],
// });

export default UploadForm;
