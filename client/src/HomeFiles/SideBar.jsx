import axios from "axios";
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import Input from "../components/Input";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import SendSharpIcon from '@mui/icons-material/SendSharp';

function SideBar() {
    const [zipCodeFilter, setZipCodeFilter] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [speciesFilter, setSpeciesFilter] = useState("");
    const [sexFilter, setSexFilter] = useState("");
    const [ageFilter, setAgeFilter] = useState([]);
    const [goodWithFilter, setGoodWithFilter] = useState([]);


    function slide() {
        if (!sidebarOpen) {
            gsap.to("#sidebar", {
                width: "320px",
                opacity: 1,
                duration: 0.7,
                ease: "back",
            });
        } else {
            gsap.to("#sidebar", {
                opacity: 0,
                duration: 1,
                ease: "back",
            });
            gsap.to("#sidebar", {
                width: 0,
                duration: 1,
                delay: 0.1,
            });
        }
        setSidebarOpen(!sidebarOpen);
    }

    async function changeZipCode(event){
        event.preventDefault();
        try{
            const response = await axios.put("/api/changeZipCode",{
                zipCodeFilter
            })
        } catch{
            console.error(error);
        }
    }

    return (
        <div id="sidebar-wrapper">
            <Fab variant="extended" onClick={slide} className="filter-button">
                <FilterAltIcon sx={{ mr: 1 }} />
                {sidebarOpen ? <span>Hide</span> : <span>Filter</span>}
            </Fab>/
            <div id="sidebar">
                <h1 className="sidebar-heading">Filters</h1>

                <form className="sidebar-form">
                    <Input
                        variant="outlined"
                        label="Zip Code to see pets in"
                        style={{ background: "#d4bdd4", width: "75%" }}
                        inputFunction={(event) => {
                            setZipCodeFilter(event.target.value);
                            console.log(zipCodeFilter);
                        }}
                    />
                    <Fab size="small" style={{position: "relative", top: "20px", left: "15px"}} onClick={changeZipCode}>
                        <SendSharpIcon />
                    </Fab>
                    <FormControl fullWidth>
                        <FormLabel>
                            <strong>Species</strong>
                        </FormLabel>
                        <RadioGroup
                            class="radio-group"
                            onChange={(event) => {
                                setSpeciesFilter(event.target.value);
                            }}
                            row>
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
                    </FormControl>
                    <hr style={{ margin: "5px" }}></hr>
                    <FormControl fullWidth>
                        <FormLabel>
                            <strong>Sex</strong>
                        </FormLabel>
                        <RadioGroup
                            class="radio-group"
                            onChange={(event) => {
                                setSexFilter(event.target.value);
                                console.log(sexFilter);
                            }}
                            row>
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
                        <hr style={{ margin: "5px" }}></hr>
                    </FormControl>
                    <Grid container columns={2}>
                        <Grid item xs={1}>
                            <FormGroup>
                                <FormLabel>
                                    <strong>Age</strong>
                                </FormLabel>
                                {[
                                    "Puppy/Kitten",
                                    "Young",
                                    "Adult",
                                    "Senior",
                                ].map((label) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={ageFilter.includes(
                                                    label
                                                )}
                                                onChange={(event) => {
                                                    if (event.target.checked) {
                                                        setAgeFilter((prev) => [
                                                            ...prev,
                                                            label,
                                                        ]);
                                                    } else {
                                                        setAgeFilter((prev) =>
                                                            prev.filter(
                                                                (age) =>
                                                                    age !==
                                                                    label
                                                            )
                                                        );
                                                    }
                                                    console.log(ageFilter);
                                                }}
                                            />
                                        }
                                        label={label}
                                        key={label}
                                    />
                                ))}
                            </FormGroup>
                        </Grid>
                        <Grid item xs={1}>
                            <FormGroup
                                style={{ display: "block", margin: "0 auto" }}>
                                <FormLabel>
                                    <strong>Good With</strong>
                                </FormLabel>
                                {["Cats", "Kids", "Dogs"].map((label) => (
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={goodWithFilter.includes(
                                                    label
                                                )}
                                                onChange={(event) => {
                                                    if (event.target.checked) {
                                                        setGoodWithFilter(
                                                            (prev) => [
                                                                ...prev,
                                                                label,
                                                            ]
                                                        );
                                                    } else {
                                                        setGoodWithFilter(
                                                            (prev) =>
                                                                prev.filter(
                                                                    (age) =>
                                                                        age !==
                                                                        label
                                                                )
                                                        );
                                                    }
                                                    console.log(goodWithFilter);
                                                }}
                                            />
                                        }
                                        label={label}
                                        key={label}
                                    />
                                ))}
                            </FormGroup>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    );
}

export default SideBar;
