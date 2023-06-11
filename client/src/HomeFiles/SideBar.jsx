import axios from "axios";
import {useState, useEffect} from 'react';
import { gsap } from "gsap";
import Input from '../components/Input'


function SideBar() {
        return(
                <div className="side-bar">
                        <Input 
                        variant="filled"
                        label="Zip Code to see pets in" 
                        style={{background: '#d4bdd4', marginLeft: "25px"}}
                        />
                </div>
        )
}

export default SideBar;
