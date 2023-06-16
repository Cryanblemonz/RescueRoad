import { FaDog } from "react-icons/fa";
import { FaCat } from "react-icons/fa";
import ChildFriendlyIcon from "@mui/icons-material/ChildFriendly";
import Grid from "@mui/material/Grid";

const styleForIcon = { width: "50px", height: "50px" };

function MobilePetDisplay(props) {
    return (
        <div className="mobile-display-wrapper">
            <h1 className="mobile-heading">{props.name}</h1>
            <div>
                <div className="mobile-image">
                    <img src={props.image}></img>
                </div>
                <h2 className="mobile-good-with-heading">Good with:</h2>
                <div className="mobile-good-with-icons">
                    <Grid container spacing={0.2} columns={3}>
                        <Grid item xs={1}>
                            {props.goodWithCats  == "Good with Cats!" && (
                                <FaCat style={styleForIcon} />
                            )}
                        </Grid>
                        <Grid item xs={1}>
                            {props.goodWithKids === "Good with Kids!" && (
                                <ChildFriendlyIcon
                                    className="mobile-good-with-icon"
                                    style={styleForIcon}
                                />
                            )}
                        </Grid>
                        <Grid item xs={1}>
                            {props.goodWithDogs  === "Good with Dogs!" && (
                                <FaDog
                                    className="mobile-good-with-icon"
                                    style={styleForIcon}
                                />
                            )}
                        </Grid>
                    </Grid>
                </div>
                <div className="mobile-info">
                <Grid container spacing={0.2} columns={2}>
                    <Grid item xs={1}>



                            <h3>Info</h3>
                            <p>
                                <strong>Breed:</strong> {props.breed}
                            </p>
                            <p>
                                <strong>Age:</strong> {props.age}
                            </p>
                            <p>
                                <strong>Sex:</strong> {props.sex}
                            </p>
                    </Grid>
                    <Grid item xs={1}>
                                <h3 className="mobile-description-heading">Description</h3>
                            <p>{props.description}</p>
                    </Grid>
                </Grid>
                </div>

                <div className="mobile-contact">
                    <h2>Contact</h2>
                    <p>{props.zipCode}</p>
                    <p>{props.contactName}</p>
                    <p>{props.contactPhone}</p>
                    <p>{props.contactEmail}</p>
                </div>
            </div>
        </div>
    );
}

export default MobilePetDisplay;
