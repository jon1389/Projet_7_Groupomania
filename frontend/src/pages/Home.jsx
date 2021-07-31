import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import Posts from "../components/Posts";
import CreatePost from "../components/CreatePost";

export default function Home() {
	return (
		<Router>
			<Route path="/home">
				<HomeHeader />
				<CreatePost />
				<Posts />
				<Footer />
			</Route>
		</Router>
	);
}
