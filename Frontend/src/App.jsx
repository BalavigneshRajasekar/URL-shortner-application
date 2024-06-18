/* eslint-disable no-unused-vars */
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Landing from "./components/Landing";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing></Landing>} />
            <Route path="/login" element={<Login></Login>} />
            <Route path="/register" element={<Register></Register>} />
            <Route path="/home" element={<Home></Home>}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
