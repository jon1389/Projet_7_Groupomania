import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Comment from "./components/Comment";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Signup from "./pages/Signup";

export default function App() {
  return (
  <div className="app">
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/comments" exact component={Comment} />
        <Route path="/posts/:id" exact component={Post} />
      </Switch>
    </Router>
    <Home/>
    <Signup/>
    <Login/>
  </div>
  );
}