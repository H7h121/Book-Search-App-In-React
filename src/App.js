import React from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Authentication from "./Authentication";
function App() {
    return (
        <div className="w-100 h-100">
            <Authentication />
            <ToastContainer />
        </div>
    );
}

export default App;
