import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Image } from "react-bootstrap";
import { Logout } from "../functions/Logout";
import jwt_decode from "jwt-decode";

export default function UserProfile() {
	const url = "http://localhost:5000/avatars/";

	const [user, setUser] = useState("");

	const token = localStorage.getItem("token");
	const decoded = jwt_decode(token);
	const id = decoded.userId;
	useEffect(() => {
		Axios.get(`http://localhost:5000/api/users/` + id, {
			headers: {
				Authorization: "Bearer " + token,
			},
		}).then((response) => {
			setUser(response.data);
			// console.log(response.data);
		});
	}, [id, token]);

	const handleDelete = () => {
		window.confirm("Voulez vous vraiment supprimer votre compte ?");
		Axios.delete(`http://localhost:5000/api/users/delete/` + id, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then(() => {
				Logout();
				window.location.href = "/login";
			})
			.catch((err) => {
				console.log(err);
				window.alert(
					"Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l'administrateur du site"
				);
			});
	};

	return (
		<Container className="profile">
			<div className="profile__header">
				<Image
					src={user.userImg ? url + user.userImg : "./assets/black_avatar.png"}
					className="profile__header__avatar"
					roundedCircle
				/>
				<h3 className="text-center">
					Bonjour {user.firstname} {user.lastname} <br />
					Que souhaitez-vous faire?
				</h3>
			</div>
			<hr />
			<div className="profile__footer">
				<Button className="profile__footer__btn" variant="danger" onClick={handleDelete}>
					Supprimer votre compte
				</Button>
				<a href="/home " className="profile__footer__btn btn btn-secondary">
					Retour
				</a>
			</div>
		</Container>
	);
}
