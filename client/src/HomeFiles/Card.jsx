import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import SwipeButton from "../components/SwipeButton";
import axios from "axios";
import "./Home.css";
import ReactCardFlip from "react-card-flip";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
let i = 1;
import { FaPaw } from "react-icons/fa";

const styleForPaw = {
    height: "200px",
    width: "200px",
    transform: "rotate(-10deg)",
};

const styleForBackPaw = {
    height: "200px",
    width: "200px",
    transform: "rotate(10deg)",
};

function Card() {
    const [imageUrl, setImageUrl] = useState(null);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [sex, setSex] = useState("");
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(true);
    const [breed, setBreed] = useState("");
    const [goodWithCats, setGoodWithCats] = useState("");
    const [goodWithDogs, setGoodWithDogs] = useState("");
    const [goodWithKids, setGoodWithKids] = useState("");
    const [description, setDescription] = useState("");
    const [age, setAge] = useState("");
    const [isFlipped, setIsFlipped] = useState("");
    const [extendedDescription, setExtendedDescription] = useState(false);
    const [contactName, setContactName] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [props, api] = useSpring(() => ({ x: 0, opacity: 1 }));
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios
            .get("/api/checkLogin", { withCredentials: true })
            .then((res) => {
                setIsLoggedIn(res.data.isLoggedIn);
            })
            .catch((err) => {
                console.error(err);
                setIsLoggedIn(false);
            });
    }, []);

    useEffect(() => {
        fetchNewImage();
    }, []);

    function loadImgRight() {
        if (isFlipped) {
            setIsFlipped(false);
            setTimeout(() => {
                api.start({
                    to: { x: 100, opacity: 0 },
                    onRest: () => {
                        setLoading(true);
                        setImageLoading(true);
                        fetchNewImage();
                    },
                });
            }, 300);
        } else {
            api.start({
                to: { x: 100, opacity: 0 },
                onRest: () => {
                    setLoading(true);
                    setImageLoading(true);
                    fetchNewImage();
                },
            });
        }
    }

    function loadImgLeft() {
        if (isFlipped) {
            setIsFlipped(false);
            setTimeout(() => {
                api.start({
                    to: { x: -100, opacity: 0 },
                    onRest: () => {
                        setLoading(true);
                        setImageLoading(true);
                        fetchNewImage();
                    },
                });
            }, 300);
        } else {
            api.start({
                to: { x: -100, opacity: 0 },
                onRest: () => {
                    setLoading(true);
                    setImageLoading(true);
                    fetchNewImage();
                },
            });
        }
    }

    function fetchNewImage() {
            axios.get("/api/randomPet").then((response) => {
                api.start({ x: 0, opacity: 1 });
                setLoading(false);
                setImageLoading(false);
                if (response) {
                    setName(response.data.name);
                    setSex(response.data.sex);
                    setImageUrl(response.data.img);
                    setBreed(response.data.breed);
                    setGoodWithCats(
                        response.data.goodWithCats === true
                            ? "Good with cats"
                            : response.data.goodWithCats === undefined
                            ? null
                            : "Not good with cats"
                    );
                    setGoodWithKids(
                        response.data.goodWithKids === true
                            ? "Good with kids"
                            : response.data.goodWithCats === undefined
                            ? null
                            : "Not good with kids"
                    );
                    setGoodWithDogs(
                        response.data.goodWithDogs === true
                            ? "Good with dogs"
                            : response.data.goodWithCats === undefined
                            ? null
                            : "Not good with dogs"
                    );
                    setAge(response.data.age);
                    setDescription(response.data.description);
                    setZipCode(response.data.zipCode);
                    setContactName(response.data.contactName);
                    setContactEmail(response.data.contactEmail);
                    setContactPhone(response.data.contactPhone);
                    setId(response.data._id);
                }
            });
    }

    const like = async (event) => {
        try {
            const response = await axios.post("/api/like", {
                id,
            });
        } catch (error) {
            console.error("Error liking pet", error);
        }
    };

    const dislike = async (event) => {
        try {
            const response = await axios.post("/api/dislike", {
                id,
            });
        } catch (error) {
            console.error("Error disliking pet", error);
        }
    };

    const handleFlipClick = () => {
        setIsFlipped(!isFlipped);
    };

    const handleSeeMore = () => {
        setExtendedDescription(!extendedDescription);
    };

    return (
        <div className="card-div">
            <h1 className="petName-lg">{name ? name : "Lets do this!"}</h1>
            {!isLoggedIn && (
                <p className="not-logged-in-message">
                    Sign up / sign in to save your liked pets!
                </p>
            )}
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <animated.div style={props} ref={props}>
                    <div className="card" onClick={handleFlipClick}>
                        <h1 className="petName-sm">
                            {name ? name : "Lets do this!"}
                        </h1>
                        {imageUrl && <img src={imageUrl} alt="Random Cat" />}
                        {name !==
                        "You've seen all of our pets! Check back later" ? (
                            <hr
                                style={{
                                    width: "20%",
                                    borderWidth: "8px",
                                    borderStyle: "dotted none none none",
                                }}></hr>
                        ) : (
                            <FaPaw style={styleForPaw} />
                        )}
                        <div
                            className="good-with-info"
                            style={{
                                display: "block",
                                marginRight: "auto",
                                marginLeft: "auto",
                                lineHeight: "25px",
                            }}>
                            <strong>
                                {goodWithCats && <p>{goodWithCats}</p>}
                                {goodWithDogs && <p>{goodWithDogs}</p>}
                                {goodWithKids && <p>{goodWithKids}</p>}
                            </strong>
                        </div>
                        <ArrowForwardIcon
                            style={{
                                position: "absolute",
                                right: "10",
                                bottom: "5",
                            }}
                        />
                    </div>
                </animated.div>
                <div className="card">
                    <div className="back-info">
                        <div onClick={handleFlipClick}>
                            {!extendedDescription && breed && (
                                <p onClick={handleFlipClick}>
                                    <strong>Breed: </strong>
                                    {breed}
                                </p>
                            )}
                            {!extendedDescription && sex && (
                                <p onClick={handleFlipClick}>
                                    <strong>Sex: </strong>
                                    {sex}
                                </p>
                            )}
                            {!extendedDescription && age && (
                                <p onClick={handleFlipClick}>
                                    <strong>Age: </strong>
                                    {age}
                                </p>
                            )}
                        </div>
                        {description && (
                            <p>
                                <strong>Description: </strong>
                                {extendedDescription ? (
                                    description
                                ) : description.length >= 65 ? (
                                    <span>
                                        {description.substring(0, 65)}
                                        <span
                                            className="see-more"
                                            style={{
                                                color: "blue",
                                                fontWeight: "bold",
                                                opacity: ".5",
                                            }}
                                            onClick={handleSeeMore}>
                                            &nbsp;...see more
                                        </span>
                                    </span>
                                ) : (
                                    description
                                )}
                            </p>
                        )}
                        {description && extendedDescription && (
                            <p
                                onClick={handleSeeMore}
                                style={{
                                    color: "blue",
                                    fontWeight: "bold",
                                    opacity: ".5",
                                }}>
                                See Less
                            </p>
                        )}
                    </div>
                    {name !==
                    "You've seen all of our pets! Check back later" ? (
                        <hr
                            style={{
                                width: "30%",
                                borderWidth: "8px",
                                borderStyle: "dotted none none none",
                                margin: "0 auto 10px auto",
                            }}></hr>
                    ) : (
                        <FaPaw
                            onClick={handleFlipClick}
                            style={styleForBackPaw}
                        />
                    )}
                    {name !==
                        "You've seen all of our pets! Check back later" && (
                        <h3>Contact</h3>
                    )}

                    <div className="contact" onClick={handleFlipClick}>
                        {zipCode && (
                            <p>
                                <strong>Located in:</strong> {zipCode}
                            </p>
                        )}
                        {contactName && (
                            <p>
                                <strong>Contact Name:</strong> {contactName}
                            </p>
                        )}
                        {contactEmail && (
                            <p>
                                <strong>Email:</strong> {contactEmail}
                            </p>
                        )}
                        {contactPhone && (
                            <p>
                                <strong>Phone:</strong> {contactPhone}
                            </p>
                        )}
                        <ArrowForwardIcon
                            style={{
                                position: "absolute",
                                right: "10",
                                bottom: "5",
                                onClick: { handleFlipClick },
                            }}
                        />
                    </div>
                </div>
            </ReactCardFlip>
            {name !== "You've seen all of our pets! Check back later" && (
                <SwipeButton
                    leftFunction={() => {
                        dislike();
                        loadImgLeft();
                    }}
                    rightFunction={() => {
                        like();
                        loadImgRight();
                    }}
                />
            )}
        </div>
    );
}

export default Card;
