import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Axios from "axios";

export default function DeleteComment(comments) {
	console.log(comments.comment.id);
	const value = `; ${document.cookie}`;
	const parts = value.split(`; token=`);
	const token = parts.pop().split(";").shift();

	const id = comments.comment.id;

	const deleteComment = () => {
		Axios.delete(`http://localhost:5000/api/comments/` + id, {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then(() => {
				console.log("Publication supprimée");
				// window.location.href = "/home";
			})
			.catch((err) => {
				console.log(err, "Vous ne pouvez pas supprimer ce commentaire");
				// window.alert("Vous ne pouvez pas supprimer ce commentaire");
			});
	};
	return (
		<>
			<FontAwesomeIcon
				htmlFor="image"
				icon={faTrashAlt}
				className="comment__delete"
				onClick={() => deleteComment()}
				role="button"
			/>
		</>
	);
}
