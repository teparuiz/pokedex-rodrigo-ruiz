import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "../src/components/login/Login";
import Home from "../src/components/home/Home";
import Details from "../src/components/details/Details";
import Register from "../src/components/login/Register";

import { connect } from "react-redux";
const App = (props) => {
  const [isLogged, setIsLogged] = useState(false);


  return (
    <div>
      <Router>
        <Routes>
          {/* <Route
            path="/"
            element={
              isLogged ? (
                <Home isLogged={isLogged} setIsLogged={setIsLogged} />
              ) : (
                <Login isLogged={isLogged} setIsLogged={setIsLogged} />
              )
            }
          /> */}
           <Route
            path="/"
            element={<Home isLogged={isLogged} setIsLogged={setIsLogged} />}
          />
          
          <Route
            path="/Home"
            element={<Home isLogged={isLogged} setIsLogged={setIsLogged} />}
          />

          <Route
            path="/details/:name"
            element={<Details isLogged={isLogged} setIsLogged={setIsLogged} />}
          />
          <Route
            path="/Login"
            element={<Login isLogged={isLogged} setIsLogged={setIsLogged} />}
          />
          <Route
            path="/Register"
            element={<Register isLogged={isLogged} setIsLogged={setIsLogged} />}
          />
        </Routes>
      </Router>
    </div>
  );
}
const MapStateToProps = ( data ) => {

  return {
    data,
  };
};
export default connect(MapStateToProps)(App);
