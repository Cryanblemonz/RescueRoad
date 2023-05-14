import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import cats from './components/names';
import SwipeButton from './components/SwipeButton';

function Card() {
    const [imageUrl, setImageUrl] = useState(null);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(true);
    let randomNumber = Math.floor(Math.random() * cats.length);

    const [props, set] = useSpring(() => ({ x: 0, opacity: 1 }));

    useEffect(() => {
        fetchNewImage(); // Fetch the first image when the component mounts
    }, []);

    function loadImgRight() {
        set({
            to: { x: 100, opacity: 0},
            onRest: () => {
                setLoading(true);
                setImageLoading(true);
                fetchNewImage();
            },
        });
    }

    function loadImgLeft() {
        set({
            to: { x: -100, opacity: 0 },
            onRest: () => {
                setLoading(true);
                setImageLoading(true);
                fetchNewImage();
            },
        });
    }

    function fetchNewImage() {
        fetch("https://api.thecatapi.com/v1/images/search")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setImageUrl(data[0].url);
                setName(cats[randomNumber]);
                // Reset the animation and stop loading when the new image has been fetched
                set({ x: 0, opacity: 1 });
                setLoading(false);
                setImageLoading(false);
            })
            .catch((error) => console.error("Error:", error));
    }

    return (
        <div className='card-div'>
            <h1 className="petName">{name ? name : "Lets do this!"}</h1>
            {!loading && !imageLoading ? (
                <animated.div style={props}>
                    <div className="card">
                        {imageUrl && (
                            <img src={imageUrl} alt="Random Cat" onLoad={() => setImageLoading(false)} />
                        )}
                    </div>
                </animated.div>
            ) : <div className="card" style={{visibility: "hidden"}}>Loading...</div>}
            <SwipeButton leftFunction={loadImgLeft} rightFunction={loadImgRight}  />
        </div>
    );
}

export default Card;
