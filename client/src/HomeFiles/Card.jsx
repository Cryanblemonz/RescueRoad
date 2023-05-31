import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import cats from "../components/names";
import SwipeButton from "../components/SwipeButton";
let i = 0;
import axios from "axios";
import "./Home.css";
import ReactCardFlip from "react-card-flip";
import Input from "../components/Input";
import Fab from "@mui/material/Fab";
import SendIcon from "@mui/icons-material/Send";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Card() {
    const [imageUrl, setImageUrl] = useState(null);
    const [name, setName] = useState("");
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

    const [props, api] = useSpring(() => ({ x: 0, opacity: 1 }));

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
        if (i > 0) {
            axios.get("/api/randomPet").then((response) => {
                api.start({ x: 0, opacity: 1 });
                setLoading(false);
                setImageLoading(false);
                setName(response.data.name);
                setImageUrl(response.data.img);
                setBreed(response.data.breed);
                setGoodWithCats(response.data.goodWithCats);
                setGoodWithKids(response.data.goodWithKids);
                setGoodWithDogs(response.data.goodWithDogs);
                setAge(response.data.age);
                setDescription(response.data.description);
            });
        }
        i++;
    }

    const handleFlipClick = () => {
        setIsFlipped(!isFlipped);
    };

    const handleSeeMore = () => {
        setExtendedDescription(!extendedDescription);
    };

    return (
        <div className="card-div">
            <h1 className="petName-lg">{name ? name : "Lets do this!"}</h1>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <animated.div style={props} ref={props}>
                    <div className="card" onClick={handleFlipClick}>
                        <h1 className="petName-sm">
                            {name ? name : "Lets do this!"}
                        </h1>
                        {imageUrl && <img src={imageUrl} alt="Random Cat" />}
                        <hr
                            style={{
                                width: "20%",
                                borderWidth: "8px",
                                borderStyle: "dotted none none none",
                            }}></hr>
                        <ul
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
                        </ul>
                        <ArrowForwardIcon
                            style={{
                                position: "absolute",
                                right: "10",
                                bottom: "5",
                            }}
                        />
                    </div>
                </animated.div>
                <div className="card card-back">
                    <div className="back-info">
                        {!extendedDescription && breed && (
                            <p onClick={handleFlipClick}>
                                <strong>Breed: </strong>
                                {breed}
                            </p>
                        )}
                        {!extendedDescription && age && (
                            <p onClick={handleFlipClick}>
                                <strong>Age: </strong>
                                {age}
                            </p>
                        )}
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
                    <hr
                        style={{
                            width: "30%",
                            borderWidth: "8px",
                            borderStyle: "dotted none none none",
                            margin: "0 auto 10px auto",
                        }}></hr>
                    <div className="contact">
                        <h3>Contact</h3>
                        <p><strong>I live in:</strong></p>
                        <p><strong>In a:</strong></p>
                        <p><strong>Phone:</strong></p>
                        <p><strong>Email: </strong></p>

                    </div>

                    {/* Save for messaging feature */}

                    {/* <p
                        style={{ width: "80%", textAlign: "center" }}
                        onClick={handleFlipClick}>
                        <strong>
                            Think I'm perfect for your home? Message the shelter
                            or foster parent to learn more
                        </strong>
                    </p>
                    <Input
                        type="text"
                        variant="outlined"
                        style={{ overflow: "visible" }}
                        rows="2"
                        multiline></Input>
                    <Fab
                        variant="extended"
                        size="small"
                        color="primary"
                        style={{
                            padding: "2px 22px 2px 36px",
                            marginBottom: "10px",
                        }}
                        aria-label="add">
                        <SendIcon sx={{ mr: 1 }} />
                    </Fab>
                    <ArrowForwardIcon
                            style={{
                                position: "absolute",
                                right: "10",
                                bottom: "5",
                            }}
                            onClick={handleFlipClick}
                        /> */}
                </div>
            </ReactCardFlip>
            <SwipeButton
                leftFunction={loadImgLeft}
                rightFunction={loadImgRight}
            />
        </div>
    );
}

export default Card;
