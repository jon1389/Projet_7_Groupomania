import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import Axios from "axios";

export default function CreateComment(post) {
	// console.log(post.post.id);
	const avatarUrl = "http://localhost:5000/avatars/";
	const [user, setUser] = useState("");

	////// Récupérer les informations de l'utilisateur connecté /////
	useEffect(() => {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; token=`);
		const token = parts.pop().split(";").shift();
		const decoded = jwt_decode(token);
		const id = decoded.userId;
		Axios.get(`http://localhost:5000/api/users/` + id, {
			headers: {
				Authorization: "Bearer " + token,
			},
		}).then((response) => {
			setUser(response.data);
			// console.log(response.data);
		});
	}, []);

	const [comment, setComment] = useState();

	const selectTextComment = (e) => {
		setComment(e.target.value);
	};
	const [, setCount] = useState(0);

	const handleComment = () => {
		const id = post.post.id;
		const value = `; ${document.cookie}`;
		const parts = value.split(`; token=`);
		const token = parts.pop().split(";").shift();
		Axios.post(
			`http://localhost:5000/api/comments/${id}`,
			{
				comment,
			},
			{
				headers: {
					Authorization: "Bearer " + token,
				},
			}
		)
			.then((response) => {
				console.log(response);
				setCount((c) => c + 1);
				console.log("Le commentaire ne peut pas être vide");
			})
			.catch((err) => console.log(err));
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleComment(post.id);
		}
	};

	return (
		<form className="sendComment">
			<Image
				src={user.userImg ? `${avatarUrl}${user.userImg}` : "./assets/black_avatar.png"}
				className="comment__avatar"
				roundedCircle
			/>
			<input
				as="textarea"
				className="sendComment__input"
				placeholder="Écrivez un commentaire..."
				onChange={selectTextComment}
				// onKeyDown={handleKeyDown}
			/>
			<Image
				type="submit"
				src="./assets/plus.png"
				className="sendComment__icon"
				roundedCircle
				role="button"
				onClick={() => handleComment(post.id)}
			/>
		</form>
	);
}
