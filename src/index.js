import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import Card from "./components/card.jsx";
import Demo from "./components/draggableList.jsx";
import Example from "./components/simpleToggle.jsx";
import SliderComponent from "./components/SlidingCard";

ReactDOM.render(<SliderComponent />, document.getElementById("root"));
registerServiceWorker();
