import axios from "axios";
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import Input from "../components/Input";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";

function SideBar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
                style={{ position: "absolute", left: "40%", bottom: "100px", zIndex: "2" }}
                onClick={slide}>
                Slide
            </button>
            <div id="sidebar">
                <h1 className="sidebar-heading">Filters</h1>

                <form className="sidebar-form">
                    <FormLabel
                        class="radios-2"
                        id="demo-radio-buttons-group-label">
                        Species
                    </FormLabel>
                    <RadioGroup class="radio-group" row>
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
                    <Input
                        variant="outlined"
                        label="Zip Code to see pets in"
                        style={{ background: "#d4bdd4", width: "90%" }}
                    />
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
                    </FormControl>
                </form>
            </div>
        </div>
    );
}

export default SideBar;
