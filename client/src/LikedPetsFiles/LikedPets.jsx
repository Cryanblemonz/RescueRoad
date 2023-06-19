import { useState, useEffect } from "react";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import PetDisplay from "./PetDisplay";
import "./LikedPets.css";
import axios from "axios";
import MobilePetDisplay from "./MobilePetDisplay";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#fd8989",
        },
        secondary: { main: "#fff" },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
});

function LikedPets() {
    const [list, setList] = useState([]);
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

    const getLikedPets = () => {
        axios.get("https://rescue-road-backend.onrender.com/api/getLikedPets",  {withCredentials: true}).then((response) => {
            setList(response.data);
        });
    };

    useEffect(() => {
        getLikedPets();
    }, []);

    function test2() {
        console.log(list);
    }

    return (
        <div>
            <ResponsiveAppBar />

            {list.map((pet, index) => (
                <div>
                    {isSmallScreen ? (
                        <MobilePetDisplay
                            key={index}
                            name={pet.name}
                            image={pet.img}
                            breed={pet.breed}
                            age={pet.age}
                            sex={pet.sex}
                            goodWithKids={
                                pet.goodWithKids
                                    ? "Good with Kids!"
                                    : "Not good with kids"
                            }
                            goodWithCats={
                                pet.goodWithCats
                                    ? "Good with Cats!"
                                    : "Not good with cats"
                            }
                            goodWithDogs={
                                pet.goodWithDogs
                                    ? "Good with Dogs!"
                                    : "Not good with dogs"
                            }
                            description={pet.description}
                            zipCode={pet.zipCode}
                            contactName={pet.contactName}
                            contactPhone={pet.contactPhone}
                            contactEmail={pet.contactEmail}
                        />
                    ) : (
                        <PetDisplay
                            key={index}
                            name={pet.name}
                            image={pet.img}
                            breed={pet.breed}
                            age={pet.age}
                            sex={pet.sex}
                            goodWithKids={
                                pet.goodWithKids
                                    ? "Good with Kids!"
                                    : "Not good with kids"
                            }
                            goodWithCats={
                                pet.goodWithCats
                                    ? "Good with Cats!"
                                    : "Not good with cats"
                            }
                            goodWithDogs={
                                pet.goodWithDogs
                                    ? "Good with Dogs!"
                                    : "Not good with dogs"
                            }
                            description={pet.description}
                            zipCode={pet.zipCode}
                            contactName={pet.contactName}
                            contactPhone={pet.contactPhone}
                            contactEmail={pet.contactEmail}
                        />
                    )}
                    <hr
                        style={{
                            color: "gray",
                            borderWidth: "15px",
                            width: "10%",
                            borderStyle: "dotted none none none",
                            margin: "30px auto 20px auto",
                        }}></hr>
                </div>
            ))}
        </div>
    );
}

export default LikedPets;
