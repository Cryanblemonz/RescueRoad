import axios from "axios";
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import Input from "../components/Input";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";

function SideBar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [species, setSpecies] = useState("");
    const [age, setAge] = useState("");

    function fade() {
        if (!sidebarOpen) {
            gsap.to("#sidebar", {
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
            });
        } else {
            gsap.to("#sidebar", {
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
            });
        }
        setSidebarOpen(!sidebarOpen);
    }

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

    return (
        <div id="sidebar-wrapper">
            <button
                style={{ position: "absolute", left: "400px", zIndex: "2" }}
                onClick={slide}>
                Slide
            </button>
            <div id="sidebar">
                <h1 className="sidebar-heading">Filters</h1>

                <form className="sidebar-form">
                    <Input
                        variant="outlined"
                        label="Zip Code to see pets in"
                        style={{ background: "#d4bdd4", width: "100%" }}
                    />
                    <FormControl fullWidth>
                        <FormLabel>
                            <strong>Species</strong>
                        </FormLabel>
                        <FormGroup style={{display: "block", margin: "0 auto"}}>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Cat"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Dog"
                            />
                        </FormGroup>
                    </FormControl>
                    <FormControl fullWidth>
                        <FormLabel>
                            <strong>Age</strong>
                        </FormLabel>
                        <FormGroup style={{display: "block", margin: "0 auto"}}>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Male"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Female"
                            />
                        </FormGroup>
                    </FormControl>

                    <FormControl fullWidth>
                        <FormLabel>
                            <strong>Age</strong>
                        </FormLabel>
                        <FormGroup style={{display: "block", margin: "0 auto"}}>
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Puppy/Kitten"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Young"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Adult"
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Senior"
                            />
                        </FormGroup>
                    </FormControl>
                </form>
            </div>
        </div>
    );
}

export default SideBar;
