import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { checkEmail, checkPassword } from "./CheckInputs";

export default function LoginForm() {
    const email = useRef();
    const password = useRef();

    const [loginStatus, setLoginStatus] = useState("")
    // axios.defaults.withCredentials = true;


    const handleLogin = (e) => {
        e.preventDefault()
        const userLogin = {
            email: email.current.value,
            password: password.current.value,
        }
        axios.post("http://localhost:5000/login", userLogin)
        .then((response)=>{
            if (response.data.message) {
                setLoginStatus(response.data.message)
            } else {
                setLoginStatus(response.data[0].email)
            }
        });
    }

    // useEffect(() => {
    //     axios.get("http://localhost:5000/login")
    //     .then((response) => {
    //         console.log(response);
    //     })
    // }, [])

    useEffect(() => {
        axios.get("http://localhost:5000/login").then((response) => {
            if (response.data.loggedIn === true) {
                setLoginStatus(response.data.user.email);
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
            <span className="login__message"> {loginStatus} </span>
            <Button variant="primary" type="submit" className="login__btn">
                {/* {isFetching ? <Spinner animation="border" size="sm"/> : "Se connecter"} */}
                Se connecter
            </Button>
            <Link to='/signup' className="login__text">Mot de passe oublié</Link>
        </form>
    </Container>
}