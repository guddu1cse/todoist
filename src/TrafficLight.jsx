import react, { useEffect, useRef, useState } from "react";

const TrafficLight = () => {
  const [light, setLight] = useState(["gray", "gray", "gray"]);
  const [timer, setTimer] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    excuteRed();
  }, []);

  const excuteRed = () => {
    setLight(["gray", "gray", "red"]);
    setTimer(4);
    let count = 4;

    const interval = setInterval(() => {
      count--;
      setTimer(count);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      excuteYellow();
    }, 5000);
  };

  const excuteYellow = () => {
    setLight(["gray", "yellow", "gray"]);
    setTimer(2);
    let count = 2;

    const interval = setInterval(() => {
      count--;
      setTimer(count);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      excuteGreen();
    }, 3000);
  };

  const excuteGreen = () => {
    setLight(["green", "gray", "gray"]);
    setTimer(8);
    let count = 8;

    const interval = setInterval(() => {
      count--;
      setTimer(count);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      excuteRed();
    }, 9000);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      {light.map((color, index) => (
        <div
          key={index}
          style={{
            backgroundColor: color,
            width: "100px",
            height: "100px",
            borderRadius: "50%",
          }}
        ></div>
      ))}
      <h1>{timer}</h1>
    </div>
  );
};

export default TrafficLight;
