// import React,{ useState, useEffect } from 'react'
// import cats from './components/names';

// function Card() {
//     const [imageUrl, setImageUrl] = useState(null);
//     const [name, setName] = useState("");
//     let randomNumber = Math.floor(Math.random() * cats.length);

//     function loadImg() {
//         setImageUrl("");
//         fetch("https://api.thecatapi.com/v1/images/search")
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error("Network response was not ok");
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 setImageUrl(data[0].url);
//             })
//             .catch((error) => console.error("Error:", error));
//         setName(cats[randomNumber]);
//     }

//     return (
//         <div>
//             <div>
//                 <button onClick={loadImg}>Cat</button>
//             </div>
//             <h1 className="petName">{name ? name : " "}</h1>
//             <div className="card">
//                 {imageUrl && <img src={imageUrl} alt="Random Cat"></img>}
//             </div>
//         </div>
//     )
// }

// export default Card;

import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import cats from './components/names';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

function Card() {
    const [imageUrl, setImageUrl] = useState(null);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    let randomNumber = Math.floor(Math.random() * cats.length);

    const [props, set] = useSpring(() => ({ x: 0, opacity: 1 }));

    function loadImgRight() {
        // Start the swipe animation
        set({
            to: { x: 50, opacity: 0 },
            onRest: () => {
                setLoading(true);
                fetchNewImage();
            },
        });
    }

    function loadImgLeft() {
        // Start the swipe animation
        set({
            to: { x: -50, opacity: 0 },
            onRest: () => {
                setLoading(true);
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
            })
            .catch((error) => console.error("Error:", error));
    }

    return (
        <div>

            {!loading && (
                <animated.div style={props}>
                    <h1 className="petName">{name ? name : " "}</h1>
                    <div className="card">
                        {imageUrl && (
                            <img src={imageUrl} alt="Random Cat" />
                        )}
                    </div>
                </animated.div>
            )}
        <div className="swipe-buttons">   
                <button className="btn sad-face-button" onClick={loadImgLeft}><SentimentVeryDissatisfiedIcon sx={{ fontSize: 50 }}/></button>
                <button className="btn heart-button" onClick={loadImgRight}><FavoriteIcon sx={{ fontSize: 50 }}/></button>  
        </div>
        </div>
    );
}

export default Card;
