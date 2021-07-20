import { BrowserRouter as Router, Route} from 'react-router-dom';
import HomeHeader from '../components/HomeHeader';
import Footer from '../components/Footer';
import Post from '../components/Post';
import CreatePost from '../components/CreatePost';

export default function Home() {
    return (
        <Router>
            <Route path="/home">
                <HomeHeader/>
                <CreatePost/>
                <Post/>
                <Footer/>
            </Route>
        </Router>
    )
}
