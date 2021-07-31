import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "../components/Footer";
import HomeHeader from "../components/HomeHeader";
import UserProfile from "../components/UserProfile";

function Profile() {
	return (
		<Router>
			<Route path="/profile">
				<HomeHeader />
				<UserProfile />
				<Footer />
			</Route>
		</Router>
	);
}

export default Profile;
