import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";

export default function Comment(post) {
	const avatarUrl = "http://localhost:5000/avatars/";
	const value = `; ${document.cookie}`;
	const parts = value.split(`; token=`);
	const token = parts.pop().split(";").shift();

	/// Import des données des commentaires ////
	const [comments, setComments] = useState([]);
	useEffect(() => {
		Axios.get("http://localhost:5000/api/comments", {
			headers: {
				Authorization: "Bearer " + token,
			},
		})
			.then((response) => {
				console.log(response.data);
				setComments(response.data);
			})
			.catch((err) => {
				console.log(err);
				// window.alert('Une erreur est survenue, veuillez réessayer plus tard. Si le problème persiste, contactez l\'administrateur du site');
			});
	}, [token]);

	// console.log(comments.postId);

	return (
		<>
			{comments.map((comment, key) => {
				if (comment.PostId === post.post.id) {
					return (
						<div key={key} className="comment">
							<hr />
							<div className="comment__area">
								<Image
									src={
										comment.User.userImg
											? `${avatarUrl}${comment.User.userImg}`
											: "./assets/black_avatar.png"
									}
									className="comment__avatar"
									roundedCircle
								/>
								<div className="comment__comment">
									<div className="comment__name">
										{comment.User.firstname} {comment.User.lastname}
									</div>
									<div className="comment__text">{comment.commentText}</div>
								</div>
							</div>
						</div>
					);
				} else {
					return null;
				}
			})}
		</>
	);
}
