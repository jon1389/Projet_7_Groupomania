import { faImages, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Image, Modal, Row } from 'react-bootstrap'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'


function ModifyPost() {
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

    const [title, setTitle] = useState("");
    const [postImg, setPostImg] = useState("");
    
    const handlePost = (e) => {
        e.preventDefault()
        // axios.post("http://localhost:5000/posts", {
        //     title: title,
        //     postImg : postImg,
        // })
        // .then((response)=>{
        //     console.log(response);
            handleClose();
        // });
    }

    /// Fonction pour selectionner l'adresse de l'image à envoyer dans la BDD
    const selectImg = (e) => {
        setPostImg(e.target.value)
    }

    /// Fonction qui regroupe
    const validateImg = (e) =>{
        selectImg(e);
        handleImageChange(e)
    }
    return (
        <div className="post__topRight">
            <FontAwesomeIcon className="post__topRight__icon" icon={faEllipsisV} role="button" onClick={handleShow}/>
            <form >
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header className="modifyPost__title">
                        <Modal.Title>Modifier votre publication</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modifyPost__modal" >
                        <Row>
                            <Container>
                                <Form.Control 
                                    as="textarea" 
                                    className="modifyPost__text" 
                                    onChange={(e) => { setTitle(e.target.value) }} 
                                    onClick={handleShow} 
                                    placeholder="Mettez à jour votre titre (50 caractères max)" 
                                    maxLength="50"
                                />
                            </Container>
                        </Row>
                        <Row className="display"> 
                            <Col>
                                <Container className="modifyPost__previewContainer">
                                    <Image src={previewContent} className="modifyPost__preview" />
                                </Container>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button className="modifyPost__input" onClick={() => onButtonClick(imgInputRef)}>
                                    <FontAwesomeIcon icon={faImages} size="2x"/>
                                    <input type='file' accept="image/*" onChange={validateImg} ref={imgInputRef} style={{display: 'none'}}/>
                                    <span>Modifier votre photo</span>
                                </Button>
                            </Col>
                            <Col>
                                <Button className="modifyPost__input" onClick={() => onButtonClick(videoInputRef)}>
                                    <FontAwesomeIcon icon={faVideo} size="2x"/>
                                    <input type='file' accept="video/*" onChange={validateImg} ref={videoInputRef} style={{display: 'none'}}/>
                                    <span>Modifier votre vidéo</span>
                                </Button>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer className="modifyPost__modal">
                        <div className="modifyPost__btns">
                            <Row>
                                <Col >
                                    <Button className="modifyPost__btn" variant="danger" onClick={handleClose}>
                                        Supprimer
                                    </Button>
                                </Col>
                                <Col>
                                    <Button className="modifyPost__btn" variant="primary" onClick={handlePost}>
                                        Publier
                                    </Button>
                                </Col>
                            </Row>
                            <Button className="modifyPost__btn modifyPost__btn--cancel" variant="secondary" onClick={handleClose}>
                            Annuler
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </form>
        </div>
    )
}

export default ModifyPost
