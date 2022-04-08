import React from "react";
import { render } from "react-dom";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import App from "./App";
import "./css/Global.css";

const rootElement = document.getElementById("root");
render(<App />, rootElement);
