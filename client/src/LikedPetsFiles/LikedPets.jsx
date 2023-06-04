import ResponsiveAppBar from "../components/ResponsiveAppBar";
import PetDisplay from "./PetDisplay";
import './LikedPets.css';
import axios from "axios";

function LikedPets(){
        return(
                <div>
                                <ResponsiveAppBar />

                        <PetDisplay 
                        name="Gumdrop"
                        image="https://storage.googleapis.com/rescue-road/1685308126780.jpg"
                        breed="Siamese"
                        age="Young"
                        sex="Male"
                        goodWithKids="Great with kids!"
                        goodWithCats="Great with cats!"
                        goodWithDogs="Okay with dogs"
                        description="Best known for his ocean eyes and enormous 'moooowwww's "
                        zipCode="65202"
                        contactName="Bryan"
                        contactPhone="573-555-5529"
                        contactEmail="fakecatguy@hotmeal.com"
                        />
                </div>
        )
}

export default LikedPets;