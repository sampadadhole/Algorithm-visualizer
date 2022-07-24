// import dist from "@testing-library/user-event";
import React, { useEffect, useRef, useState } from "react";

const Main = () => {
  const canvasref = useRef(null);
  const contextref = useRef(null);

  const [isDrawingVertex, setIsDrawingVertex] = useState(true);
  const[isDrawingEdges, setIsDrawingEdges] = useState(false);
  const [count, setCount] = useState(0);
  const [info, setInfo] = useState([
    {
      id: 0,
      mode: "vertex",
      offsetX: 0,
      offsetY: 0,
    },
  ]);

  useEffect(() => {
    const canvas = canvasref.current;
    canvas.width = 500;
    canvas.height = 500;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    // context.stroke = 5;
    context.lineWidth = 5;
    context.strokeStyle = "black";
    context.fillStyle = "#FFA500";
    contextref.current = context;

    // const circle = new Path2D();
    // circle.arc(30, 40, 20, 0, 2 * Math.PI);
    // contextref.current.fill(circle);
  }, []);

  const HandleClick = ({ nativeEvent }) => {

    const circles = new Path2D();
    const { offsetX, offsetY } = nativeEvent;
    console.log(circles);
    if (contextref.current.isPointInPath(circles, nativeEvent.offsetX, nativeEvent.offsetY)) {
        alert(offsetX + " " + offsetY);
      }
    else{
        contextref.current.beginPath();
        contextref.current.moveTo(offsetX, offsetY);
        circles.arc(offsetX, offsetY, 20, 0, 2 * Math.PI);
        contextref.current.fill(circles);
        console.log(offsetX + " " + offsetY);
       
    }
    

    

  };

    const DrawVertices = ({ nativeEvent }) => {
        const circles = new Path2D();
        const { offsetX, offsetY } = nativeEvent;
      if (isDrawingVertex === true) {

        contextref.current.beginPath();
        contextref.current.moveTo(offsetX, offsetY);
        console.log(offsetX, offsetY);
        circles.arc(offsetX, offsetY, 20, 0, 2 * Math.PI);
        console.log(offsetX,offsetY);
        contextref.current.fill(circles);
        setCount(count + 1);
        setInfo([
          ...info,
          {
            id: count + 1,
            mode: "vertex",
            offsetX: offsetX,
            offsetY: offsetY,
          },
        ]);

      }
    //   setIsDrawingVertex(true);
      nativeEvent.preventDefault();
    };

  const StopVertices = () => {
    // setIsDrawingVertex(false);
  };

  const addEdge = ({ nativeEvent }) => {

    setIsDrawingVertex(false);
    // setIsDrawingEdges(true);
    console.log("select first edge");
    const {offsetX, offsetY} = nativeEvent;
    
    console.log(info);
    contextref.current.beginPath();
    contextref.current.moveTo(158, 102);
    contextref.current.lineTo(301, 318);
    contextref.current.strokeStyle = "gray";
    contextref.current.stroke();
  };

  return (
    <>
      <canvas
        className="canvas-container"
        ref={canvasref}
        onMouseDown={HandleClick}
        onMouseUp={StopVertices}
      ></canvas>
      <button onClick={addEdge}>Add Edge</button>
    </>
  );
};
export default Main;
