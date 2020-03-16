import "es6-promise/auto";
import "typeface-roboto";
import "whatwg-fetch";

import "@/styles.css";

import * as React from "react";
import * as ReactDOM from "react-dom";

import Root from "./root";

const rootEl = document.getElementById("root");
if (rootEl) {
  ReactDOM.render(<Root />, rootEl);
}
