import React from "react";
import * as ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const titleTag="Network Tools - SUYAMA";

root.render(
    <React.StrictMode>
        <HelmetProvider>
            <App />
        </HelmetProvider>
    </React.StrictMode>
);