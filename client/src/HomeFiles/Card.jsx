import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import cats from "../components/names";
import SwipeButton from "../components/SwipeButton";
let i = 0;
import axios from "axios";
import './Home.css';

function Card() {
    const [imageUrl, setImageUrl] = useState(null);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(true);
    const [breed, setBreed] = useState("")
    const [goodWithCats, setGoodWithCats] = useState("");
    const [goodWithDogs, setGoodWithDogs] = useState("");
    const [goodWithKids, setGoodWithKids] = useState("");
    const [description, setDescription] = useState("");
    const [age, setAge] = useState("");


    let randomNumber = Math.floor(Math.random() * cats.length);

    const [props, api] = useSpring(() => ({ x: 0, opacity: 1 }));

    useEffect(() => {
        fetchNewImage();
    }, []);

    function loadImgRight() {
        api.start({
            to: { x: 200, opacity: 0 },
            onRest: () => {
                setLoading(true);
                setImageLoading(true);
                fetchNewImage();
            },
        });
    }

    function loadImgLeft() {
        api.start({
            to: { x: -100, opacity: 0 },
            onRest: () => {
                setLoading(true);
                setImageLoading(true);
                fetchNewImage();
            },
        });
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

            });
        }
        i++;
    }

    return (
        <div className="card-div">
            <h1 className="petName-lg">{name ? name : "Lets do this!"}</h1>
            {!loading && !imageLoading ? (
                <animated.div style={props} ref={props}>
                    <div className="card">
                        <h1 className="petName-sm">
                            {name ? name : "Lets do this!"}
                        </h1>
                        {imageUrl && <img src={imageUrl} alt="Random Cat" />}
                        <hr style={{width: '20%', borderWidth: "8px", borderStyle: "dotted none none none"}}></hr>
                        <ul style={{display: "block", marginRight: "auto", marginLeft: "15px", lineHeight: "25px"}}>
                            {breed && <p>Breed: {breed}</p>}
                            {goodWithCats && <p>Cats: {goodWithCats}</p>}
                            {goodWithDogs && <p>Cats: {goodWithDogs}</p>}
                            {goodWithKids && <p>Cats: {goodWithKids}</p>}
                        </ul>
                    </div>
                </animated.div>
            ) : (
                <div className="card" style={{ visibility: "hidden" }}>
                    Loading...
                </div>
            )}
            <SwipeButton
                leftFunction={loadImgLeft}
                rightFunction={loadImgRight}
            />
        </div>
    );
}

export default Card;
