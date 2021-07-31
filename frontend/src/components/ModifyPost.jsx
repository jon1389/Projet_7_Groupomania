import { faImages, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Image, Modal, Row } from "react-bootstrap";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

function ModifyPost(post) {
	const imgUrl = "http://localhost:5000/images/";

	const [imageContent, setImageContent] = useState(null);
	const [previewContent, setPreviewContent] = useState(null);
	const imgInputRef = useRef(null);
	const videoInputRef = useRef(null);

	const currentImg = post.post.postImg;
	useEffect(() => {
		if (imageContent) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewContent(reader.result);
			};
			reader.readAsDataURL(imageContent);
		} else {
			setPreviewContent(imgUrl + currentImg);
		}
	}, [imageContent, currentImg]);

	const onButtonClick = (ref) => {
		ref.current.click();
	};

	/// Fonction pour afficher la preview de l'image
	const handleImageChange = (e) => {
		const selected = e.target.files[0];
		console.log(selected);
		if (selected) {
			setImageContent(selected);
		} else {
			setImageContent(null);
		}
	};

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
		console.log(post.post.postImg);
	};

	const [title, setTitle] = useState("");
	const [postImg, setPostImg] = useState("");

	const handleModify = (e) => {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; token=`);
		const token = parts.pop().split(";").shift();
		const id = post.post.id;
		console.log(id);
		e.preventDefault();
		Axios.post(
			"http://localhost:5000/posts/" + id,
			{
				title: title,
				postImg: postImg,
			},
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		).then((response) => {
			console.log(response);
			handleClose();
		});
	};

	/// Fonction pour selectionner l'adresse de l'image à envoyer dans la BDD
	const selectImg = (e) => {
		setPostImg(e.target.value);
	};

	/// Fonction qui regroupe
	const validateImg = (e) => {
		selectImg(e);
		handleImageChange(e);
	};

	const handleDelete = (props) => {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; token=`);
		const token = parts.pop().split(";").shift();

		// Axios
		// 	.get("http://localhost:5000/api/posts/"  {
		// 		headers: {
		// 			Authorization: "Bearer " + token,
		// 		},
		// 	})
		// 	.then(() => {
		// 		props.deletePost(props.ModifyPost.id);
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 		);
		// 	});
	};

	return (
		<div className="post__topRight">
			<FontAwesomeIcon
				className="post__topRight__icon"
				icon={faEllipsisV}
				role="button"
				onClick={handleShow}
			/>
			<form>
				<Modal show={show} onHide={handleClose} animation={false}>
					<Modal.Header className="modifyPost__title">
						<Modal.Title>Modifier votre publication</Modal.Title>
					</Modal.Header>
					<Modal.Body className="modifyPost__modal">
						<Row>
							<Container>
								<Form.Control
									as="textarea"
									className="modifyPost__text"
									onChange={(e) => {
										setTitle(e.target.value);
									}}
									onClick={handleShow}
									placeholder="Mettez à jour votre titre (50 caractères max)"
									maxLength="50"
								/>
							</Container>
						</Row>
						<Row className="display">
							<Col>
								<Container className="modifyPost__previewContainer">
									<Image
										src={previewContent ? previewContent : imgUrl + currentImg}
										className="modifyPost__preview"
									/>
								</Container>
							</Col>
						</Row>
						<Row>
							<Col>
								<Button className="modifyPost__input" onClick={() => onButtonClick(imgInputRef)}>
									<FontAwesomeIcon icon={faImages} size="2x" />
									<input
										type="file"
										accept="image/*"
										onChange={validateImg}
										ref={imgInputRef}
										style={{ display: "none" }}
									/>
									<span>Modifier votre photo</span>
								</Button>
							</Col>
							<Col>
								<Button className="modifyPost__input" onClick={() => onButtonClick(videoInputRef)}>
									<FontAwesomeIcon icon={faVideo} size="2x" />
									<input
										type="file"
										accept="video/*"
										onChange={validateImg}
										ref={videoInputRef}
										style={{ display: "none" }}
									/>
									<span>Modifier votre vidéo</span>
								</Button>
							</Col>
						</Row>
					</Modal.Body>
					<Modal.Footer className="modifyPost__modal">
						<div className="modifyPost__btns">
							<Row>
								<Col>
									<Button className="modifyPost__btn" variant="danger" onClick={handleDelete}>
										Supprimer
									</Button>
								</Col>
								<Col>
									<Button className="modifyPost__btn" variant="primary" onClick={handleModify}>
										Publier
									</Button>
								</Col>
							</Row>
							<Button
								className="modifyPost__btn modifyPost__btn--cancel"
								variant="secondary"
								onClick={handleClose}
							>
								Annuler
							</Button>
						</div>
					</Modal.Footer>
				</Modal>
			</form>
		</div>
	);
}

export default ModifyPost;
