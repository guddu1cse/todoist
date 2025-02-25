import react, { use, useEffect, useState } from "react";

const GridLight = () => {
  const [allFill, setAllFill] = useState(false);
  const [order, setOrder] = useState([]);
  const [grid, setGrid] = useState(() => {
    const grid = Array(3)
      .fill([])
      .map(() => Array(3).fill("white"));
    return grid;
  });

  useEffect(() => {
    if (allFill) {
      setTimeout(() => {
        removeRed();
      }, 1000);
    }
    console.log("all fill : " + allFill);
    console.log("order: " + order);
  }, [allFill]);

  const removeRed = async () => {
    for (let i = order.length - 1; i >= 0; i--) {
      await new Promise((resolve) => {
        setTimeout(() => {
          setGrid((currentGrid) => {
            const newGrid = [...currentGrid];
            newGrid[order[i][0]][order[i][1]] = "white";
            return newGrid;
          });
          resolve();
        }, 500);
      });
    }

    setAllFill(false);
    setOrder([]);
  };

  const handleClick = (rowIndex, colIndex) => {
    if (allFill) return;
    setOrder([...order, [rowIndex, colIndex]]);
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = "red";
    setGrid(newGrid);

    checkAllFill();
  };

  const checkAllFill = () => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j] === "white") {
          return;
        }
      }
    }
    setAllFill(true);
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          width: "600px",
          height: "600px",
          gap: "10px",
        }}
      >
        {grid.map((row, rowIndex) => {
          return row.map((color, colIndex) => {
            return (
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  backgroundColor: color,
                }}
                key={rowIndex + " " + colIndex}
                onClick={() => handleClick(rowIndex, colIndex)}
              ></div>
            );
          });
        })}
      </div>
    </div>
  );
};

export default GridLight;
