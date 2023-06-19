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
    const [sex, setSex] = useState("");
    const [age, setAge] = useState("");
    const [goodWithKids, setGoodWithKids] = useState(false);
    const [goodWithCats, setGoodWithCats] = useState(false);
    const [goodWithDogs, setGoodWithDogs] = useState(false);
    const [description, setDescription] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [contactPhone, setcontactPhone] = useState("");
    const [contactName, setContactName] = useState("");
    const [contactEmail, setcontactEmail] = useState("");

    function assignSpecies(event) {
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
        try {
            const response = await axios.post("https://rescue-road-be.vercel.app/api/upload", {
                species,
                name,
                breed,
                age,
                goodWithKids,
                goodWithCats,
                goodWithDogs,
                description,
                zipCode,
                contactName,
                contactPhone,
                contactEmail,
                sex,
            });
            window.location.href = "/imageupload";
        } catch (error) {
            console.error("Error uploading pet", error);
        }
    };

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
                        label={
                            species === "Pet"
                                ? "Pet's Name"
                                : species === "Cat"
                                ? "Cat's Name"
                                : species === "Dog"
                                ? "Dog's Name"
                                : null
                        }
                        fullWidth
                        inputFunction={(event) => {
                            setName(event.target.value);
                        }}
                        value={name}
                    />

                    <Input
                        variant="standard"
                        type="text"
                        size="medium"
                        label="Breed"
                        fullWidth
                        inputFunction={(event) => {
                            setBreed(event.target.value);
                        }}
                        name="petBreed"
                    />
                </FormControl>
                <FormControl fullWidth>
                    <FormLabel
                        class="radios-2"
                        id="demo-radio-buttons-group-label">
                        Sex
                    </FormLabel>

                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        row
                        class="radio-group"
                        onChange={(event) => {
                            setSex(event.target.value);
                        }}>
                        <FormControlLabel
                            value="Male"
                            control={<Radio />}
                            label="Male"
                        />
                        <FormControlLabel
                            value="Female"
                            control={<Radio />}
                            label="Female"
                        />
                    </RadioGroup>
                    <hr></hr>
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
                        onChange={(event) => {
                            setAge(event.target.value);
                        }}>
                        <FormControlLabel
                            value={species === "Cat" ? "Kitten" : "Puppy"}
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
                        onChange={async (event) => {
                            setGoodWithKids(event.target.value === "true" ? true : false);
                        }}>
                        <FormControlLabel
                            value={true}
                            control={<Radio />}
                            label="Good with children"
                        />
                        <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label="Not good with children"
                        />
                    </RadioGroup>
                    <hr></hr>
                </FormControl>
                <FormControl fullWidth>
                    <FormLabel
                        class="radios-2"
                        id="demo-radio-buttons-group-label">
                        How would this pet do with{" "}
                        {species === "Cat" && "other "}cats?
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        row
                        class="radio-group"
                        onChange={(event) => {
                            setGoodWithCats(event.target.value === "true" ? true : false);
                        }}>
                        <FormControlLabel
                            value={true}
                            control={<Radio />}
                            label="Good with cats"
                        />
                        <FormControlLabel
                            value={false}
                            control={<Radio />}
                            label="Not good with cats"
                        />
                    </RadioGroup>
                    <hr></hr>
                </FormControl>
                <FormControl fullWidth>
                    <FormLabel
                        class="radios-2"
                        id="demo-radio-buttons-group-label">
                        How would this pet do with{" "}
                        {species === "Dog" && "other "}dogs?
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        row
                        class="radio-group"
                        onChange={(event) => {
                            setGoodWithDogs(event.target.value === "true" ? true : false) ;
                        }}>
                        <FormControlLabel
                            value="false"
                            control={<Radio />}
                            label="Good with dogs"
                        />
                        <FormControlLabel
                            value="true"
                            control={<Radio />}
                            label="Not good with dogs"
                        />
                    </RadioGroup>
                    <Input
                        variant="standard"
                        type="text"
                        size="medium"
                        label="Provide a brief description of this pet"
                        fullWidth
                        name="petBreed"
                        multiline
                        inputFunction={(event) => {
                            setDescription(event.target.value);
                        }}
                    />
                    <Input
                        variant="standard"
                        type="text"
                        size="medium"
                        label="Zip code this pet is located in"
                        fullWidth
                        inputFunction={(event) => {
                            setZipCode(event.target.value);
                        }}
                        name="zipCode"
                    />
                    <Input
                        variant="standard"
                        type="text"
                        size="medium"
                        label="Name of person or organization to be contacted"
                        fullWidth
                        inputFunction={(event) => {
                            setContactName(event.target.value);
                        }}
                        name="contactName"
                    />
                    <Input
                        variant="standard"
                        type="text"
                        size="medium"
                        label="Contact phone number for adoption of this pet"
                        fullWidth
                        inputFunction={(event) => {
                            setcontactPhone(event.target.value);
                        }}
                        name="contactPhone"
                    />
                    <Input
                        variant="standard"
                        type="text"
                        size="medium"
                        label="Contact email for adoption of this pet"
                        fullWidth
                        inputFunction={(event) => {
                            setcontactEmail(event.target.value);
                        }}
                        name="contactEmail"
                    />
                </FormControl>
                <Button
                    style={styleforButton}
                    variant="contained"
                    onClick={handleSubmit}>
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default UploadForm;
