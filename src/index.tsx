import React from "react";
import * as ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const titleTag="Network Tools - SUYAMA";

root.render(
    <React.StrictMode>
        <HelmetProvider>
            <head>
                <meta charSet="utf-8" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Noto+Sans+JP&subset=japanese" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <title>{titleTag}</title>
            </head>
        </HelmetProvider>
        <body>
            <App />
        </body>
    </React.StrictMode>
);