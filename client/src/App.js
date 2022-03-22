import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/pages/Home.jsx";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import Events from "./Components/Events/Events";
import Error from "./Components/pages/Error";
import Verify from "./Components/User/Verify";
import Create from "./Components/User/Create";

function App() {


  return (
    <>

      <Router>
        <Routes>

          <Route exact path="/" element={<Home/> } />
          <Route exact path="events" element={<>
            {sessionStorage.getItem("user") ? <Events /> : <Error />}
          </>} />

          <Route exact path="/login" element={
            <Login/>} />
            
          <Route path="/register" element={<Register/>} />
          <Route path = "/register/verify" element= {<Verify/>} />
          <Route path="/register/create" element = { <Create/>} />

          
          <Route path="*" element={<Error/>} />

        </Routes>

      </Router>

    </>
  );
}

export default App;
