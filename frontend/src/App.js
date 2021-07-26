import { useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    if (document.cookie) {
      setIsAuthenticated(true);
      console.log("Authentifié");
    } else {
      setIsAuthenticated(false);
      console.log("Non authentifié");
    }
  },[isAuthenticated])

  return (
    <Router>
      <Switch>
          <Route exact path="/">
              <Redirect to="/home" />
          </Route>
          <Route exact path="/login">
            <Login/>
              {/* { isAuthenticated ? <Redirect to="/home" /> : <Login /> } */}
          </Route>
          <Route exact path="/signup">
            <Signup/>
              {/* { isAuthenticated ? <Redirect to="/home" /> : <Signup /> } */}
          </Route>
          <Route path="/home">
            <Home/>
              {/* { isAuthenticated ? <Home /> : <Redirect to="/login" /> } */}
          </Route>
          <Route path="/logout">
              <Redirect to="/login" />
          </Route>
      </Switch>
    </Router>
  );
}