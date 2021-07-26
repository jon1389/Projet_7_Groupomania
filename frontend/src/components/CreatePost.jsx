import { faImages, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Image, Modal, Row } from 'react-bootstrap'

export default function CreatePost() {
    const [imageContent, setImageContent] = useState(null);
    const [previewContent, setPreviewContent] = useState(null);
    const imgInputRef = useRef(null);
    const videoInputRef = useRef(null);
    
    useEffect(() => {
        if (imageContent) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewContent(reader.result)
            }
            reader.readAsDataURL(imageContent);
        } 
        else {
            setPreviewContent("./assets/preview.jpg")
        }
    }, [imageContent])

    const onButtonClick = (ref) => {
        ref.current.click();
    };

    /// Fonction pour afficher la preview de l'image
    const handleImageChange = (e) => {
        const selected = e.target.files[0];
        console.log(selected)
        if(selected) {
            setImageContent(selected)
        } 
        else {
            setImageContent(null);
        }
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [title, setTitle] = useState();
    const [file, setFile] = useState();
    
    const handlePost = (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append("title", title);
        data.append("postImg", file);
        axios.post("http://localhost:5000/api/post", data)
        .then((response)=>{
            console.log(response);
            handleClose();
        })
        .catch(err => console.log(err));
    }


    return <>
        <Container className="CreatePost">
            <Image src="./assets/black_avatar.png" className="CreatePost__avatar" roundedCircle/>
            <div className="CreatePost__text" onClick={handleShow} role="button">Bonjour ... ! Que souhaitez-vous publier ? (50 caractères max)</div>
        </Container>
        <form >
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header className="CreatePost__title">
                    <Modal.Title>Créer une publication</Modal.Title>
                </Modal.Header>
                <Modal.Body className="CreatePost__modal" >
                    <Row>
                        <Container>
                            <Form.Control as="textarea" className="CreatePost__text" onChange={(e) => { setTitle(e.target.value) }} onClick={handleShow} placeholder="Mettez un titre à votre publication (50 caractères max)" maxLength="50"/>
                        </Container>
                    </Row>
                    <Row className="display"> 
                        <Col>
                            <Container className="CreatePost__previewContainer">
                                <Image src={previewContent} className="CreatePost__preview" />
                            </Container>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button className="CreatePost__input" onClick={() => onButtonClick(imgInputRef)}>
                                <FontAwesomeIcon icon={faImages} size="2x"/>
                                <input type='file' accept="image/*" onChange={(e) => { setFile(e.target.value) }} ref={imgInputRef} style={{display: 'none'}}/>
                                <span>Ajouter une photo</span>
                            </Button>
                        </Col>
                        <Col>
                            <Button className="CreatePost__input" onClick={() => onButtonClick(videoInputRef)}>
                                <FontAwesomeIcon icon={faVideo} size="2x"/>
                                <input type='file' accept="video/*" onChange={(e) => { setFile(e.target.value) }} ref={videoInputRef} style={{display: 'none'}}/>
                                <span>Ajouter une vidéo</span>
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer className="CreatePost__modal">
                    <div className="CreatePost__btns">
                        <Row>
                            <Col >
                                <Button className="CreatePost__btn" variant="secondary" onClick={handleClose}>
                                    Annuler
                                </Button>
                            </Col>
                            <Col>
                                <Button className="CreatePost__btn" variant="primary" onClick={handlePost}>
                                    Publier
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Modal.Footer>
            </Modal>
        </form>
    </>
}
