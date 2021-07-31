import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import ModifyPost from "../components/ModifyPost";

export default function Post() {
	return (
		<Router>
			<Route path="/posts/:id">
				<HomeHeader />
				<ModifyPost />
				<Footer />
			</Route>
		</Router>
	);
}
