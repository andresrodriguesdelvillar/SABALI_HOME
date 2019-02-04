import React from "react";
import { render } from "react-dom";
import Provider from "./contexts/Provider";
import "bootstrap/dist/css/bootstrap.css";
import * as serviceWorker from "./serviceWorker";

render(<Provider />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
