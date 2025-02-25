import { useEffect, useRef, useState } from "react";

const CursorAnimation = () => {
  const cursorRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    document.addEventListener("mousemove", moveCursor);

    return () => document.removeEventListener("mousemove", moveCursor);
  }, []);

  const containerStyle = {
    width: "200px",
    height: "100px",
    background: "lightblue",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "bold",
    position: "relative",
    cursor: "none",
    borderRadius: "10px",
  };

  const cursorStyle = {
    position: "fixed",
    width: "8px",
    height: "8px",
    backgroundColor: "rgba(255, 0, 0, 1)",
    borderRadius: "50%",
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
    transition: "transform 0.1s ease-out",
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      Hover over me!
      {isHovering && <div style={cursorStyle} ref={cursorRef}></div>}
    </div>
  );
};

export default CursorAnimation;
