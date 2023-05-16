import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";

const CardStack = ({ cards }) => {
  const [index, setIndex] = useState(0);
  const [props, set] = useSpring(() => ({ x: 0, opacity: 1 }));

  const swipe = (direction) => {
    set({
      to: {
        x: direction === "left" ? -50 : 50,
        opacity: 0,
      },
      onRest: () => setIndex((i) => i + 1),
    });
  };

  // Reset the position and opacity when index changes
  useEffect(() => {
    set({ x: 0, opacity: 1 });
  }, [index, set]);

  return (
    <div>
      {cards.map((card, i) => {
        if (i === index) {
          return (
            <animated.div>
              <div>{card}</div>
              <button onClick={() => swipe("left")}>Swipe Left</button>
              <button onClick={() => swipe("right")}>Swipe Right</button>
            </animated.div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default CardStack;
