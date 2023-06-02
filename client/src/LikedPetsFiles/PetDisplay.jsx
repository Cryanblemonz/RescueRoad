function PetDisplay(props){
        return(
                <div className="pet-display">
                        <h1>{props.name}</h1>
                        <img src={props.image}></img>
                        <p>{props.breed}</p>
                        <p>{props.age}</p>
                        <p>{props.goodWithKids}</p>
                        <p>{props.goodWithCats}</p>
                        <p>{props.goodWithDogs}</p>
                        <p>{props.description}</p>
                        <h2>Contact</h2>
                        <p>{props.zipCode}</p>
                        <p>{props.contactName}</p>
                        <p>{props.contactPhone}</p>
                        <p>{props.contactEmail}</p>
                </div>
        )
}

export default PetDisplay;