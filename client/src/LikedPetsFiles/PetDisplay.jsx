function PetDisplay(props) {
    return (
        <div className="display-wrapper">
            <h1>{props.name}</h1>
            <div className="pet-display">
                <div className="pet-display-image grid-item">
                    <img src={props.image}></img>
                </div>
                <div className="pet-display-breed grid-item">
                    <p> {props.breed}</p>
                </div>
                <div className="pet-display-age grid-item">
                        <p>{props.age}</p>
                    </div>
                <div className="pet-display-goodwith grid-item">
                    <p>{props.goodWithKids}</p>
                    <p>{props.goodWithCats}</p>
                    <p>{props.goodWithDogs}</p>
                </div>
                <div className="pet-display-description grid-item">
                    <p>{props.description}</p>
                </div>
                <div className="pet-display-contact grid-item">
                    <h2>Contact</h2>
                    <p>Located in: {props.zipCode}</p>
                    <hr></hr>
                    <p>Contact Name: {props.contactName}</p>
                    <hr></hr>
                    <p>Phone: {props.contactPhone}</p>
                    <hr></hr>
                    <p>Email: {props.contactEmail}</p>
                </div>
            </div>
        </div>
    );
}

export default PetDisplay;
