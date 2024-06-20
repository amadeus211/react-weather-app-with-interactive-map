import ReactDOM from "react-dom/client";
import * as React from "react";
import { createRoot } from "react-dom/client";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/weather",
    element: <WeatherPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
