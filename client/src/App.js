import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Header />

      <Router>
          <Routes>

              <Route path="/" element={<h1>Home</h1>} />
              <Route path="about" element={<h1>About</h1>} />
              <Route path="/login" element={<h1>Login</h1>} />
              <Route path="/register" element={<h1>Register</h1>} />
              <Route path="*" element={<h1>Not Found</h1>} />

          </Routes>

      </Router>


      <Footer />
    </>
  );
}

export default App;
