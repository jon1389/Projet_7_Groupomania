import axios from "axios";
import { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { checkEmail, checkPassword } from "./CheckInputs";


export default function LoginForm() {
    const email = useRef();
    const password = useRef();

    const handleLogin = (e) => {
        e.preventDefault()
    
        const userLogin = {
            email: email.current.value,
            password: password.current.value,
        }
        axios.post("http://localhost:5000/api/auth/login", userLogin)
        .then((response)=>{
            console.log(response);
            const date = new Date();
            date.setTime(date.getTime() + (24*60*60*1000));
            document.cookie = 'token=' + response.data.token + '; expires=' + date.toUTCString() + '; path=/; SameSite=Strict';
            // window.location.href = "/";
        }).catch(err => {
            let errors = {};
            if (err.response.data.error.errors) {
                for (let error of err.response.data.error.errors) {
                    errors[error.path] = error.message;
                }
            } else if (err.response.data.error) {
                errors['g'] = err.response.data.error;
            }
            this.setState({ errors });
        })
    }
    
	return <Container className="login">
        <h1 className="login__title text-center">Connexion</h1>
        <form onSubmit={handleLogin}>
            <Form.Group className="login__field" >
                <Form.Label className="login__label" >Email</Form.Label>
                <Form.Control type="email" placeholder="Votre email" onChange={checkEmail} ref={email} required/>
                <Form.Control.Feedback type="invalid" >
                Veuillez renseigner un email valide.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="login__field" >
                <Form.Label className="login__label">Mot de passe</Form.Label>
                <Form.Control type="password" placeholder="Votre mot de passe" onChange={checkPassword} ref={password} required/>
                <Form.Control.Feedback type="invalid" >
                Le mot de passe doit contenir 8 caractères dont 1 majuscule, 1 minuscule, 1 chiffre et 1 symbole.
                </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="login__btn">
                {/* {isFetching ? <Spinner animation="border" size="sm"/> : "Se connecter"} */}
                Se connecter
            </Button>
            <a href="/signup" className="login__text">Vous n'avez pas de compte?</a>
        </form>
    </Container>
}