import { useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const auth = sessionStorage.getItem("token");
		if (auth) {
			setIsAuthenticated(true);
			console.log("Authentifié");
		} else {
			setIsAuthenticated(false);
			console.log("Non authentifié");
		}
	}, [isAuthenticated]);

	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<Redirect to="/home" />
				</Route>
				<Route path="/profile">{isAuthenticated ? <Profile /> : <Login />}</Route>
				<Route exact path="/login">
					{isAuthenticated ? <Redirect to="/home" /> : <Login />}
				</Route>
				<Route exact path="/signup">
					{isAuthenticated ? <Redirect to="/login" /> : <Signup />}
				</Route>
				<Route path="/home">{isAuthenticated ? <Home /> : <Redirect to="/login" />}</Route>
				<Route path="/logout">
					<Redirect to="/login" />
				</Route>
			</Switch>
		</Router>
	);
}
