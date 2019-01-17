import React from "react";
import { render } from "react-dom";
import App from "./components/App.jsx";
// import * as serviceWorker from "../service-worker";

render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}

// serviceWorker.register();
