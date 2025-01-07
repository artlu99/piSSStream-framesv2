import { motion, useScroll, useTransform } from "framer-motion";
import type React from "react";

const SpaceZoom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 600], [4, 1]);
  const opacity = useTransform(scrollY, [0, 300], [0.2, 1]);

  const swipeUpY = useTransform(scrollY, [0, 300], [0, -100]);

  const createRectTransform = (index: number) => {
    const delay = index * 100;
    return useTransform(scrollY, [delay, delay + 300], [0.01, 1]);
  };

  const createRectOpacity = (index: number) => {
    const startFade = 400 + index * 50;
    return useTransform(scrollY, [startFade, startFade + 200], [1, 0]);
  };

  return (
    <>
      <motion.div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      >
        <motion.div
          style={{
            scale,
            opacity,
            fontSize: "2rem",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {children}
        </motion.div>
      </motion.div>

      <motion.div
        style={{

          top: "10px",
          left: "50%",
          transform: `translateX(-50%) translateY(${swipeUpY}px)`,
          fontSize: "1.5rem",
          color: "white",
          zIndex: 2,
        }}
      >
        Swipe up 👆
      </motion.div>

      {/* Border-only rectangles */}
      {Array.from({ length: 5 }).map((_, index) => (
        <motion.div
          key={index}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: "auto",
            width: "80vmin",
            height: "80vmin",
            border: "2px solid rgba(211, 211, 211, 0.5)",
            backgroundColor: "transparent",
            scale: createRectTransform(index),
            opacity: createRectOpacity(index),
            transformOrigin: "center center",
            zIndex: -1,
          }}
        />
      ))}

      {/* Scrollable area */}
      <div style={{ height: "500vh" }} />
    </>
  );
};

export default SpaceZoom;
