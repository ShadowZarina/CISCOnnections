import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CanvasPrototype } from "./features/canvas-prototype/CanvasPrototype.jsx";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("The app root is missing.");

createRoot(root).render(<StrictMode><CanvasPrototype /></StrictMode>);
