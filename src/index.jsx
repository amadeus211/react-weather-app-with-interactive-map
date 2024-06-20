import ReactDOM from "react-dom/client";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { Helmet, HelmetProvider } from "react-helmet-async";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import App from "./components/WeatherPage";
import Header from "./components/Header";

import WeatherPage from "./components/WeatherPage";
import "./App.css";
import Weather from "./components/Weather";
import HomePage from "./components/HomePage";
import WeatherIcon from "./images/weather.png"

import Home from "./images/home.png";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Helmet>
          <title>Home Page</title>
          <link rel="icon" type="image/x-icon" href={Home} />
        </Helmet>
        <HomePage />,
      </>
    ),
  },
  {
    path: "/weather",
    element: (
      <>
        <Helmet>
          <title>Weather</title>
          <link rel="icon" type="image/x-icon" href={WeatherIcon} />
        </Helmet>
        <WeatherPage />,
      </>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </HelmetProvider>
);

document.title = "23423";
