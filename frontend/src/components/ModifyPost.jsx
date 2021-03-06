import { faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Image, Modal, Row } from "react-bootstrap";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

function ModifyPost(postContent) {
	const imgUrl = "http://localhost:5000/images/";
	const token = sessionStorage.getItem("token");

	const [imageContent, setImageContent] = useState(null);
	const [previewContent, setPreviewContent] = useState(null);
	const imgInputRef = useRef(null);
	const currentImg = postContent.postContent.postImg;
	const id = postContent.postContent.id;

	/// Selectionner et afficher la preview ///
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

	const handleImageChange = (e) => {
		const selected = e.target.files[0];
		if (selected) {
			setImageContent(selected);
		} else {
			setImageContent(null);
		}
	};

	/// afficher la modal ///
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
	};

	/// Fonction pour selectionner l'adresse de l'image à envoyer dans la BDD ///
	const selectImg = (e) => {
		setFile(e.target.files[0]);
	};
	const [title, setTitle] = useState("");
	const [file, setFile] = useState();
	const validateImg = (e) => {
		selectImg(e);
		handleImageChange(e);
	};

	/// Modifier la publication ///
	const handleModify = (e) => {
		e.preventDefault();
		let formData = new FormData();
		formData.append("postTitle", title);
		formData.append("postImg", file);
		Axios.put("http://localhost:5000/api/posts/" + id, formData, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then(() => {
				console.log("Votre publication a été modifiée");
				postContent.HandleUpdate();
				handleClose();
			})
			.catch((error) => {
				console.log(error, "Vous ne pouvez pas modifier cette publication");
			});
	};

	/// Supprimer la publication ///
	const handleDelete = () => {
		const confirmation = window.confirm("Voulez vous vraiment supprimer votre publication ?");
		if (!confirmation) return;
		Axios.delete(`http://localhost:5000/api/posts/delete/` + id, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then(() => {
				console.log("Publication supprimée");
				handleClose();
				postContent.HandleUpdate();
			})
			.catch((error) => {
				console.log(error, "Vous ne pouvez pas supprimer cette publication");
				window.alert("Vous ne pouvez pas supprimer cette publication");
			});
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
										name="postImg"
										id="postImg"
										onChange={validateImg}
										ref={imgInputRef}
										style={{ display: "none" }}
									/>
									<span>Modifier votre photo</span>
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
