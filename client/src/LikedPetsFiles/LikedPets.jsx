import {useState, useEffect} from 'react';
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import PetDisplay from "./PetDisplay";
import './LikedPets.css';
import axios from "axios";

function LikedPets(){
        const [list, setList] = useState([]);
        
const getLikedPets = () => {
        axios.get("/api/getLikedPets")
        .then(response =>{
                setList(response.data)
                })
        }


useEffect(() => {
        getLikedPets();
}, [])

function test2 () {
        console.log(list);
}


        return(
                <div>
                                <ResponsiveAppBar />

                        {/* <PetDisplay 
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
                        /> */}

                        <button onClick={test2}>Test2</button>

                        {list.map((pet, index) => (
                                <div>
                                <PetDisplay 
                                key={index}
                                name={pet.name}
                                image={pet.img}
                                breed={pet.breed}
                                age={pet.age}
                                sex={pet.sex}
                                goodWithKids={pet.goodWithKids} 
                                goodWithCats={pet.goodWithCats} 
                                goodWithDogs={pet.goodWithDogs}
                                description={pet.description}
                                zipCode={pet.zipCode}
                                contactName={pet.contactName}
                                contactPhone={pet.contactPhone}
                                contactEmail={pet.contactEmail} />
                                <hr style={{color: "gray", borderWidth: "15px", width: "10%", borderStyle: "dotted none none none", margin: "30px auto 20px auto"}}></hr>
                                </div>
                        ))}

                </div>
        )
}

export default LikedPets;