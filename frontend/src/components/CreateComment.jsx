import React, { useEffect, useReducer, useState } from "react";
import { Image } from "react-bootstrap";
import jwt_decode from "jwt-decode";
import Axios from "axios";

export default function CreateComment(post) {
	const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

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

			// console.log(decoded);
		});
	}, []);

	const [comment, setComment] = useState("");

	const selectTextComment = (e) => {
		setComment(e.target.value);
	};

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
				forceUpdate();
				console.log(response);
			})
			.catch((err) => console.log(err));
	};

	return (
		<form className="sendComment">
			{/* <form className="sendComment"> */}
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
