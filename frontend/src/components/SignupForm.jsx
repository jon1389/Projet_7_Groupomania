import Container from 'react-bootstrap/esm/Container'
import { Button, Col, Form, Row } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import { checkAlpha, checkPassword, checkEmail } from './CheckInputs';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function SignupForm() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const userImg = useRef();
    const firstName = useRef();
    const lastName = useRef();
    const email = useRef();
    const password = useRef();

    useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result)
            }
            reader.readAsDataURL(image);
        } 
        else {
            setPreview("../assets/black_avatar.png")
        }
    }, [image])

    const handleImageChange = (e) => {
        const selected = e.target.files[0];
        if(selected) {
            setImage(selected)
        } 
        else {
            setImage(null);
        }
    }

    const addImageBtn = () => {
        userImg.current.click();
    };

    // axios.defaults.withCredentials = true;


    const handleSignup = (e) => {
        e.preventDefault()
        const value = `; ${document.cookie}`;
        const parts = value.split(`; token=`);
        const token = parts.pop().split(';').shift();
        const formData = new FormData()
        formData.append("firstName", firstName.current.value);
        formData.append("lastName", lastName.current.value);
        formData.append("email", email.current.value);
        formData.append("password", password.current.value);
        formData.append("userImg", userImg.current.files[0]);
        axios.post("http://localhost:5000/api/auth/signup", formData, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((response)=>{
            console.log(response);
            const date = new Date();
            date.setTime(date.getTime() + (24*60*60*1000));
            document.cookie = 'token=' + response.data.token + '; expires=' + date.toUTCString() + '; path=/; SameSite=Strict';
            console.log(userImg.current.files);
            console.log(userImg.current.files[0]);
            // window.location.href = "/login";        
        })
        .catch(error => {
            console.log('Echec de la connexion : ', error);
        })
    }

    const confirmImg = () =>{
        userImg(userImg.current.files[0])
    }

    return <Container className="signup">
        <h1 className="text-center">Inscription</h1>
        <form onSubmit={handleSignup} >
            <Form.Group className="signup__avatar text-center">
                <Image src={preview} className="signup__avatar__img" roundedCircle/>
                <input type='file' accept="image/*" name='userImg' id="image" onChange={handleImageChange} ref={userImg} style={{display: 'none'}} onSubmit={confirmImg}/>
                <Button className="avatar__btn" onClick={addImageBtn}>Ajouter une photo</Button>
            </Form.Group>
            <Row>
                <Col sm={6}>
                    <Form.Group className="signup__field" >
                        <Form.Label className="signup__label">Prénom</Form.Label>
                        <Form.Control type="text" placeholder="Votre prénom" onChange={checkAlpha} ref={firstName} required/>
                        <Form.Control.Feedback type="invalid" >
                        Veuillez renseigner un prénom valide.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="signup__field" >
                        <Form.Label className="signup__label">Nom</Form.Label>
                        <Form.Control type="text" placeholder="Votre nom" onChange={checkAlpha} ref={lastName} required/>
                        <Form.Control.Feedback type="invalid" >
                        Veuillez renseigner un nom valide.
                        </Form.Control.Feedback>
                    </Form.Group>                
                </Col>
            </Row>
            <Form.Group className="signup__field" >
                <Form.Label className="signup__label">Email</Form.Label>
                <Form.Control type="email" placeholder="Votre email" onChange={checkEmail} ref={email} required/>
                <Form.Control.Feedback type="invalid" >
                Veuillez renseigner un email valide.
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="signup__field" >
                <Form.Label className="signup__label">Mot de passe</Form.Label>
                <Form.Control type="password" placeholder="Votre mot de passe" onChange={checkPassword} ref={password}required/>
                <Form.Control.Feedback type="invalid" >
                Le mot de passe doit contenir 8 caractères dont 1 majuscule, 1 minuscule, 1 chiffre et 1 symbole.
                </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" className="signup__btn text-center">
            S'inscrire
            </Button>
            <a href="./login" className="signup__text">Se connecter</a>
        </form>
    </Container>
}