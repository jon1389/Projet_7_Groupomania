import { faEllipsisV, faImages, faVideo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
// import {format} from 'timeago.js';
import { Image } from 'react-bootstrap'

export default function Post() {
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
            setPreviewContent("./assets/1.jpg")
        }
    }, [imageContent])

    const onButtonClick = (ref) => {
        ref.current.click();
    };

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

    return <Container className="post">
            <div className="post__container">
                <div className="post__top">
                    <div className="post__topRight">
                        <img className="post__topRight__img" src="./assets/black_avatar.png" alt="Profil" />
                        <span className="post__topRight__username">
                            Nom de l'utilisateur                 
                        </span>
                        <span className="post__topRight__date"> - posté il y a 5 minutes</span>
                    </div>
                    <div className="post__topLeft">
                        <FontAwesomeIcon className="post__topLeft__icon" icon={faEllipsisV} role="button" onClick={handleShow}/>
                    </div>
                </div>
                <div className="post__center">
                    <span className="post__center__text">Titre du poste</span>
                    <img className="post__center__img" src="./assets/beach.jpg" alt="Plage" />
                </div>
                <div className="post__bottom">
                    <div className="post__bottomLeft">
                        <div className="post__bottomLeft__icons">
                            <button className="post__bottomLeft__btn" >
                                <Image src="../assets/like.png" className="post__bottomLeft__icon" />
                            </button>
                            <span className="post__bottom__text likeCount">0</span>
                        </div>
                        <div className="post__bottomLeft__icons">
                            <button className="post__bottomLeft__btn" >
                                <Image src="../assets/dislike.png" className="post__bottomLeft__icon" />
                            </button>
                            <span className="post__bottom__text dislikeCount">0</span>
                        </div>
                    </div>
                    <button className="post__bottomRight">
                        <Image src="../assets/comment.png" className="post__bottomRight__icon" />
                        <span className="post__bottom__text">0 commentaires</span>
                    </button>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} >
            <Modal.Header className="CreatePost__title">
                <Modal.Title >Mettez à jour votre publication</Modal.Title>
            </Modal.Header>
            <Modal.Body className="CreatePost__modal">
                <Row>
                    <Container>
                        <Form.Control as="textarea" className="CreatePost__text"  onClick={handleShow} placeholder="Mettez à jour votre un titre (50 caractères max)" maxLength="50"/>
                    </Container>
                </Row>
                <Row className="display"> 
                    <Col>
                        <Container className="CreatePost__previewContainer">
                            <Image src={"./assets/beach.jpg"||{previewContent}} className="CreatePost__preview"/>
                        </Container>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button className="CreatePost__input" onClick={() => onButtonClick(imgInputRef)}>
                            <FontAwesomeIcon icon={faImages} size="2x"/>
                            <input type='file' accept="image/*" onChange={handleImageChange} ref={imgInputRef} style={{display: 'none'}}/>
                            <span>Modifiez votre photo</span>
                        </Button>
                    </Col>
                    <Col>
                        <Button className="CreatePost__input" onClick={() => onButtonClick(videoInputRef)}>
                            <FontAwesomeIcon icon={faVideo} size="2x"/>
                            <input type='file' accept="video/*" onChange={handleImageChange} ref={videoInputRef} style={{display: 'none'}}/>
                            <span>Modifiez votre vidéo</span>
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
                        <Col xs={1}></Col>
                        <Col>
                            <Button className="CreatePost__btn" variant="primary" onClick={handleClose}>
                                Publier
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button className="CreatePost__btn" variant="danger" onClick={handleClose}>
                                    Supprimer
                            </Button>
                        </Col>
                    </Row>
                </div>
            </Modal.Footer>
        </Modal>

        </Container>
}
