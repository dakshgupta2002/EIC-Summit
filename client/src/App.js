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

  const [user, setUser] = React.useState(sessionStorage.getItem("user"));

  return (
    <>

      <Router>
        <Routes>

          <Route exact path="/" element={<>
            {user ? <> <Header user={user} /> <Home/> <Footer /> </> : <Error />}
          </>} />
          <Route exact path="events" element={<>
            {user ? <Events user={user} /> : <Error />}
          </>} />

          <Route exact path="/login" element={
            <Login setuser={setUser}/>} />
            
          <Route exact path="/register" element={
            <Register setuser={setUser} />
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
