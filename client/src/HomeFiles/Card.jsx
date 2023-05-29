import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import cats from "../components/names";
import SwipeButton from "../components/SwipeButton";
let i = 0;
import axios from "axios";
import "./Home.css";
import ReactCardFlip from "react-card-flip";

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

    let randomNumber = Math.floor(Math.random() * cats.length);

    const [props, api] = useSpring(() => ({ x: 0, opacity: 1 }));

    useEffect(() => {
        fetchNewImage();
    }, []);

    function loadImgRight() {
        if(isFlipped){
            setIsFlipped(false)
        setTimeout(() => {api.start({
            to: { x: 100, opacity: 0 },
            onRest: () => {
                setLoading(true);
                setImageLoading(true);
                fetchNewImage();
            },
        });
    }, 300)} else {
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
    if(isFlipped){
        setIsFlipped(false)
    setTimeout(() => {api.start({
        to: { x: -100, opacity: 0 },
        onRest: () => {
            setLoading(true);
            setImageLoading(true);
            fetchNewImage();
        },
    });
}, 300)} else {
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
                                marginLeft: "15px",
                                lineHeight: "25px",
                            }}>
                            {breed && <p>{age}</p>}
                            {goodWithCats && <p>{goodWithCats}</p>}
                            {goodWithDogs && <p>{goodWithDogs}</p>}
                            {goodWithKids && <p>{goodWithKids}</p>}
                        </ul>
                    </div>
                </animated.div>
                <div className="card" onClick={handleFlipClick}>
                    <h1>Back</h1>
                </div>
            </ReactCardFlip>

            {/* Back of card */}

            <SwipeButton
                leftFunction={loadImgLeft}
                rightFunction={loadImgRight}
            />
        </div>
    );
}

export default Card;
