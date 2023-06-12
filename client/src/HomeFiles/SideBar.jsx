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
            gsap.to("#sidebar", { opacity: 1, duration: .6, ease: "power2.out" });
        } else {
            gsap.to("#sidebar", { opacity: 0, duration: .6, ease: "power2.out" });
        }
        setSidebarOpen(!sidebarOpen);
    }

    function slide() {
        if(!sidebarOpen){
                gsap.to("#sidebar", {
                        width: "300px",
                        opacity: 1,
                        duration: .7,
                        ease: "back", 
                    });
        } else {
                gsap.to("#sidebar", {
                        opacity: 0,
                        duration: 1, 
                        ease: "back", 
                })
                gsap.to("#sidebar", {
                        width: 0,
                        duration: 1,
                        delay: .1
                })
        }
        setSidebarOpen(!sidebarOpen);
    }
    
    return (
        <div id="sidebar-wrapper">
            <button
                style={{ position: "absolute", right: "100px" }}
                onClick={slide}>
                Slide
            </button>
            <div id="sidebar">
                <h1 className="sidebar-heading">Filters</h1>

                <form className="sidebar-form">
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
                        variant="filled"
                        label="Zip Code to see pets in"
                        style={{ background: "#d4bdd4", width: "90%" }}
                    />
                </form>
            </div>
        </div>
    );
}

export default SideBar;
