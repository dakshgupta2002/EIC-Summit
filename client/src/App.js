import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/pages/Home.jsx";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import Events from "./Components/Events/Events";
import Error from "./Components/pages/Error";
function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [user, setUser] = React.useState({});

  return (
    <>

      <Router>
        <Routes>

          <Route exact path="/" element={<>
            {isLoggedIn ? <> <Header user={user} /> <Home/> <Footer /> </> : <Error />}
          </>} />
          <Route exact path="events" element={<>
            {isLoggedIn ? <Events user={user} /> : <Error />}
          </>} />

          <Route exact path="/login" element={
            <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
            
          <Route exact path="/register" element={
            <Register setIsLoggedIn={setIsLoggedIn} setUser={setUser} />
          } />

          <Route path="*" element={
            <Error/>
          } />

        </Routes>

      </Router>

    </>
  );
}

export default App;
