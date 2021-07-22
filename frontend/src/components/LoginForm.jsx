import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { checkEmail, checkPassword } from "./CheckInputs";
import { useHistory } from "react-router";

export default function LoginForm() {
    const email = useRef();
    const password = useRef();

    const history = useHistory();

    const [loginStatus, setLoginStatus] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        const userLogin = {
            email: email.current.value,
            password: password.current.value,
        }
        axios.post("http://localhost:5000/api/auth/login", userLogin)
        .then((response)=>{
            if (!response.data.auth) {
                setLoginStatus(false);
            } else {
                console.log(response.data)
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("auth", response.data.auth)
                console.log(response.data.auth)
                setLoginStatus(true);
            }
            if(response.data.auth === true) {
                history.push("/home");
            }
        }).catch(error => {
            console.log('Echec de la connexion : ', error);
        });
    }
    
    useEffect(() => {
        axios.get("http://localhost:5000/api/auth/login").then((response) => {
            if (response.data.loggedIn === true) {
                setLoginStatus(response.data.user[0].username);
            }else{
                console.log("problème")
            }
        });
    }, []);

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
            <span>{loginStatus}</span>
            <Button variant="primary" type="submit" className="login__btn">
                {/* {isFetching ? <Spinner animation="border" size="sm"/> : "Se connecter"} */}
                Se connecter
            </Button>
            <a href="/signup" className="login__text">Vous n'avez pas de compte?</a>
        </form>
    </Container>
}