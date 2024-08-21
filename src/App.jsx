import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { Offline, Online } from "react-detect-offline";
let route = createBrowserRouter([
  {
    path: "",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
]);
function App() {
  return (
    <>
      <RouterProvider router={route}></RouterProvider>
      <Offline>
        <div className=" fixed bottom-4 start-4 p-4 rounded-md bg-yellow-200">
          You are offline, please check you internet
        </div>
      </Offline>
    </>
  );
}

export default App;
