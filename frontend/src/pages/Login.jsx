import { BrowserRouter as Router, Route} from 'react-router-dom';
import Footer from '../components/Footer'
import Header from '../components/Header'
import LoginForm from '../components/LoginForm';

export default function Login() {
    return (
        <Router>
            <Route path="/login">
                <Header/>
                <LoginForm/>
                <Footer/>
            </Route>
        </Router>
    )
}

