import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import Posts from "../components/Posts";

export default function Home() {
	return (
		<Router>
			<Route path="/home">
				<HomeHeader />
				<Posts />
				<Footer />
			</Route>
		</Router>
	);
}
