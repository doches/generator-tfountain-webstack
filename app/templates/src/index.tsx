import * as React from "react";
import * as ReactDom from "react-dom";

import "./index.less";

// create a top-level div for React to render into
const element = document.createElement("div");
document.body.appendChild(element);

import { App } from "./app";

ReactDom.render(
    (
        <App />
    ),
    element
);