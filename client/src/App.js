import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import Events from "./Components/Events/Events";
import Error from "./Components/Error";
function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({});

  return (
    <>

      <Router>
        <Routes>

          <Route exact path="/" element={<>
            {isLoggedIn ? <> <Header user={user} />  <Footer /> </> : <Error />}
          </>} />
          <Route exact path="events" element={<>
            {isLoggedIn ? <Events user={user} /> : <Error />}
          </>} />

          <Route exact path="/login" element={
            <Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />} />
          <Route exact path="/register" element={<>
            <Header />REGISTER<Footer />
          </>} />
          <Route path="*" element={<>
            <Header />404<Footer />
          </>} />

        </Routes>

      </Router>

    </>
  );
}

export default App;
