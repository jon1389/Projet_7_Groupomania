import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import Axios from "axios";

export default function LikeDislike(post) {
	const id = post.post.id;
	const value = `; ${document.cookie}`;
	const parts = value.split(`; token=`);
	const token = parts.pop().split(";").shift();

	const [likes, setLikes] = useState([]);
	const [dislikes, setDislikes] = useState([]);

	useEffect(() => {
		Axios.get("http://localhost:5000/api/likes/", {
			headers: { Authorization: token },
		}).then(
			(result) => {
				setLikes(result.data.data.length);
			},
			(error) => {
				console.log(error);
			}
		);
	}, [token]);

	const handleLike = () => {
		Axios.post("http://localhost:5000/api/likes/like/" + id, {
			headers: { Authorization: token },
		}).then(
			(like) => {
				// console.log(like);
				// setLikes(like.data.length);
			},
			(error) => {
				console.log(error);
			}
		);
	};

	useEffect(() => {
		Axios.get("http://localhost:5000/api/dislikes/", {
			headers: { Authorization: token },
		}).then(
			(result) => {
				setDislikes(result.data.data.length);
			},
			(error) => {
				console.log(error);
			}
		);
	}, [token]);

	const handleDisLike = () => {
		Axios.post("http://localhost:5000/api/dislikes/dislike/" + id, {
			headers: { Authorization: token },
		}).then(
			(dislike) => {
				// console.log(dislike);
				// setDislikes(dislike.data.length);
			},
			(error) => {
				console.log(error);
			}
		);
	};

	return (
		<div className="post__bottomLeft">
			<div className="post__bottomLeft__icons">
				<button className="post__bottomLeft__btn" onClick={handleLike}>
					<Image src="../assets/like.png" className="post__bottomLeft__icon" />
				</button>
				<span className="post__bottom__text likeCount">{likes ? likes : "0"}</span>
			</div>
			<div className="post__bottomLeft__icons">
				<button className="post__bottomLeft__btn" onClick={handleDisLike}>
					<Image src="../assets/dislike.png" className="post__bottomLeft__icon" />
				</button>
				<span className="post__bottom__text dislikeCount">{dislikes ? dislikes : "0"}</span>
			</div>
		</div>
	);
}
