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
                    </div>
                </animated.div>
                <div className="card card-back">
                    <div className="back-info">
                        {breed && (
                            <p>
                                <strong>Breed: </strong>
                                {breed}
                            </p>
                        )}
                        {age && (
                            <p>
                                <strong>Age: </strong>
                                {age}
                            </p>
                        )}
                        {description && (
                            <p>
                                <strong>Description: </strong>
                                
                                {description.substring(0, 65)} {description.length >= 65 && <span style={{color: "blue", fontWeight: "bold"}}> ..see more</span>}

                            </p>
                        )}
                    </div>
                    <hr
                        style={{
                            width: "30%",
                            borderWidth: "8px",
                            borderStyle: "dotted none none none",
                            margin: "0 auto 20px auto",
                        }}></hr>
                    <p
                        style={{ width: "80%", textAlign: "center"}}
                        onClick={handleFlipClick}>
                            <strong>
                            Think I'm perfect for your home? Message the shelter or
                        foster parent to learn more
                            </strong>

                    </p>
                    <Input
                        type="text"
                        variant="outlined"
                        style={{ overflow: "visible" }}
                        rows="3"
                        multiline></Input>
                    <Fab
                        variant="extended"
                        size="small"
                        color="primary"
                        style={{padding: "2px 22px 2px 36px", marginBottom: "10px"}}
                        aria-label="add">
                        <SendIcon sx={{ mr: 1 }} />
                        </Fab>
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
