import ResponsiveAppBar from "../components/ResponsiveAppBar";
import PetDisplay from "./PetDisplay";
import './LikedPets.css'

function LikedPets(){
        return(
                <div>
                                <ResponsiveAppBar />

                        <PetDisplay 
                        name="Gumdrop"
                        image="https://storage.googleapis.com/rescue-road/1685308126780.jpg"
                        breed="Siamese"
                        age="Young"
                        goodWithKids="Great with kids!"
                        goodWithCats="Great with cats!"
                        goodWithDogs="Okay with dogs"
                        description="Tons of energy. Can pull your sled, protect your home, and run a 4 minute mile. Known for his enormous 'awwwwooooooos'"
                        zipCode="65202"
                        contactName="Bryan"
                        contactPhone="573-555-5529"
                        contactEmail="fakecatguy@hotmeal.com"
                        />
                </div>
        )
}

export default LikedPets;