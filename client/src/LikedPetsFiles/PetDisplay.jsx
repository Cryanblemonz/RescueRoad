function PetDisplay(props) {
    return (
        <div className="display-wrapper">
            <h1>{props.name}</h1>
            <div className="pet-display">
                <div className="pet-display-image grid-item">
                    <img src={props.image}></img>
                </div>
                <div className="pet-display-info grid-item">
                    <p>{props.breed}</p>
                    <p>{props.age}</p>
                    <p>{props.goodWithKids}</p>
                    <p>{props.goodWithCats}</p>
                    <p>{props.goodWithDogs}</p>
                </div>
                <div className="pet-display-description grid-item">
                    <p>{props.description}</p>
                </div>
                <div className="pet-display-contact grid-item">
                    <h2>Contact</h2>
                    <p>{props.zipCode}</p>
                    <hr></hr>
                    <p>{props.contactName}</p>
                    <hr></hr>
                    <p>{props.contactPhone}</p>
                    <hr></hr>
                    <p>{props.contactEmail}</p>
                </div>
            </div>
        </div>
    );
}

export default PetDisplay;
