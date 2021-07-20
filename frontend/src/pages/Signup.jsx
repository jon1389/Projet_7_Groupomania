import { BrowserRouter as Router, Route} from 'react-router-dom';
import Footer from '../components/Footer'
import Header from '../components/Header'
import SignupForm from '../components/SignupForm'

function Signup() {
    return (
        <Router>
            <Route path="/signup">
                <Header/>
                <SignupForm/>
                <Footer/>
            </Route>
        </Router>
    )
}

export default Signup
