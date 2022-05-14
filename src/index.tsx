import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import "./demo.scss";
import Demo from "./Demo";
import { options } from "./apis";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <Demo options={options} />
  </StrictMode>
);
