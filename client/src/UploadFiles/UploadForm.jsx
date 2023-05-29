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

const styleforButton = {
        margin: "15px auto 10px auto",
        width: "60%",
        display: "block",
    };


function UploadForm(props) {
    const [icon, setIcon] = useState(
        <FaPaw style={{ transform: "rotate(-10deg)" }} />
    );
    const [species, setSpecies] = useState("Pet");
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");
    const [goodWithKids, setGoodWithKids] = useState("");
    const [goodWithCats, setGoodWithCats] = useState("");
    const [goodWithDogs, setGoodWithDogs] = useState("");
    const [description, setDescription] = useState("");

    function assignSpecies(event){
        setSpecies(event.target.value);
        console.log(species);
    }

    function changeSpecies() {
        setSpecies(event.target.value);
        if (species !== "Cat") {
            setIcon(<FaCat />);
        } else {
            setIcon(<FaDog />);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
                const response = await axios.post("/api/upload", {
                        species, name, breed, age, goodWithKids, goodWithCats, goodWithDogs, description
                })
                window.location.href="/imageupload"
        } catch (error){
                console.error("Error uploading pet", error);
        }
    }
    
    function consoleCheck(e){
        e.preventDefault();
        console.log(species, name, breed, age, goodWithKids, goodWithCats, goodWithDogs, description)
    }

    return (
        <div>
            <h1 className="upload-heading">Upload a New {species} </h1>
            <h1 className="upload-heading">{icon}</h1>

            <form class="upload-form">
                <RadioGroup class="radio-group" onChange={changeSpecies} row>
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
                        label={species === "Pet" ? "Pet's Name" : species === "Cat" ? "Cat's Name" : species === "Dog" ? "Dog's Name" : null}
                        fullWidth
                        inputFunction={() => {setName(event.target.value)}}
                        value={name}
                    />

                    <Input
                        variant="standard"
                        type="text"
                        size="medium"
                        label="Breed"
                        fullWidth
                        inputFunction={() => {setBreed(event.target.value)}}

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
                        class="radio-group"
                        onChange={() => {setAge(event.target.value)}}>
                        <FormControlLabel
                            value={species === "Cat" ? "kitten" : "puppy"}
                            control={<Radio />}
                            label={species === "Cat" ? "Kitten" : "Puppy"}
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
                        class="radio-group"
                        onChange={() => {setGoodWithKids(event.target.value)}}>
                        <FormControlLabel
                            value="Not good with children"
                            control={<Radio />}
                            label="Not good with children"
                        />
                        <FormControlLabel
                            value="Prefer no children"
                            control={<Radio />}
                            label="Prefer no children"
                        />
                        <FormControlLabel
                            value="Okay with children"
                            control={<Radio />}
                            label="Okay with children"
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
                        How would this pet do with {species === "Cat" && "other "}cats?
                    </FormLabel>
                <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        row
                        class="radio-group"
                        onChange={() => {setGoodWithCats(event.target.value)}}>
                        <FormControlLabel
                            value="Not good with cats"
                            control={<Radio />}
                            label="Not good with cats"
                        />
                        <FormControlLabel
                            value="Prefer no cats"
                            control={<Radio />}
                            label="Prefer no cats"
                        />
                        <FormControlLabel
                            value="Okay with cats"
                            control={<Radio />}
                            label="Okay with cats"
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
                        How would this pet do with {species === "Dog" && "other "}dogs?
                    </FormLabel>
                <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        row
                        class="radio-group"
                        onChange={() => {setGoodWithDogs(event.target.value)}}>
                        <FormControlLabel
                            value="Not good with dogs"
                            control={<Radio />}
                            label="Not good with dogs"
                        />
                        <FormControlLabel
                            value="Prefer no dogs"
                            control={<Radio />}
                            label="Prefer no dogs"
                        />
                        <FormControlLabel
                            value="Okay with dogs"
                            control={<Radio />}
                            label="Okay with dogs"
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
                        inputFunction={() => {setDescription(event.target.value)}}
                    />
                </FormControl>
                <Button style={styleforButton} variant="contained" onClick={handleSubmit}>Submit</Button>
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
