import { faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Image, Modal, Row } from "react-bootstrap";
import jwt_decode from "jwt-decode";

export default function CreatePost(HandleUpdate) {
	const url = "http://localhost:5000/avatars/";

	/// Récupération des données de l'utilisateur ///
	const [user, setUser] = useState("");
	useEffect(() => {
		const token = sessionStorage.getItem("token");
		const decoded = jwt_decode(token);
		const id = decoded.userId;
		Axios.get(`http://localhost:5000/api/users/` + id, {
			headers: {
				Authorization: "Bearer " + token,
			},
		}).then((response) => {
			setUser(response.data);
		});
	}, []);

	/// Selectionner et afficher la preview ///
	const [imageContent, setImageContent] = useState(null);
	const [previewContent, setPreviewContent] = useState(null);
	const imgInputRef = useRef(null);
	useEffect(() => {
		if (imageContent) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewContent(reader.result);
			};
			reader.readAsDataURL(imageContent);
		} else {
			setPreviewContent("./assets/preview.jpg");
		}
	}, [imageContent]);
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

	/// Afficher ou fermer la modal ///
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => {
		setShow(true);
	};

	/// Poster une publication ///
	const [title, setTitle] = useState();
	const [file, setFile] = useState();
	const selectImg = (e) => {
		setFile(e.target.files[0]);
	};
	const selectTitle = (e) => {
		setTitle(e.target.value);
	};
	const validateImg = (e) => {
		selectImg(e);
		handleImageChange(e);
	};
	const handlePost = (e) => {
		e.preventDefault();
		const token = sessionStorage.getItem("token");
		let formData = new FormData();
		formData.append("postTitle", title);
		formData.append("postImg", file);
		Axios.post("http://localhost:5000/api/posts", formData, {
			headers: {
				Authorization: "Bearer " + token,
				"Content-Type": "multipart/form-data",
			},
		})
			.then(() => {
				console.log("Publication créée");
				HandleUpdate.HandleUpdate();
				handleClose();
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<Container className="CreatePost">
				<Image
					src={user.userImg ? url + user.userImg : "./assets/black_avatar.png"}
					className="CreatePost__avatar"
					roundedCircle
				/>
				<div className="CreatePost__text" onClick={handleShow} role="button">
					Bonjour {user.firstname} ! Que souhaitez-vous publier ?
				</div>
			</Container>
			<form>
				<Modal show={show} onHide={handleClose} animation={false}>
					<Modal.Header className="CreatePost__title">
						<Modal.Title>Créer une publication</Modal.Title>
					</Modal.Header>
					<Modal.Body className="CreatePost__modal">
						<Row>
							<Container>
								<Form.Control
									as="textarea"
									className="CreatePost__text"
									onChange={selectTitle}
									placeholder="Mettez un titre à votre publication (50 caractères max)"
									maxLength="50"
								/>
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
									<FontAwesomeIcon htmlFor="image" icon={faImages} size="2x" />
									<input
										type="file"
										accept="image/*"
										id="postImg"
										name="postImg"
										onChange={validateImg}
										ref={imgInputRef}
										style={{ display: "none" }}
									/>
									<span>Ajouter une photo</span>
								</Button>
							</Col>
						</Row>
					</Modal.Body>
					<Modal.Footer className="CreatePost__modal">
						<div className="CreatePost__btns">
							<Row>
								<Col>
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
	);
}
