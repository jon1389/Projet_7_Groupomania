import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import Axios from "axios";

export default function LikeDislike(post) {
	const id = post.post.id;
	const value = `; ${document.cookie}`;
	const parts = value.split(`; token=`);
	const token = parts.pop().split(";").shift();

	// const [dislikes, setDislikes] = useState([]);

	// useEffect(() => {
	// 	Axios.get("http://localhost:5000/api/likes/" + id, {
	// 		headers: { Authorization: token },
	// 	}).then(
	// 		(result) => {
	// 			// console.log(result);
	// 		},
	// 		(error) => {
	// 			console.log(error);
	// 		}
	// 	);
	// }, [token]);

	const [allLikes, setAllLikes] = useState(false);
	useEffect(() => {
		Axios.get("http://localhost:5000/api/likes/", {
			headers: { Authorization: token },
		}).then(
			(result) => {
				setAllLikes(result.data.data);
				// console.log(result.data);
				// console.log(post.post);
				// setLikes(result.data.data);
			},
			(error) => {
				console.log(error);
			}
		);
	}, [token]);

	console.log(allLikes);

	const handleLike = () => {
		Axios.post("http://localhost:5000/api/likes/like/" + id, {
			headers: { Authorization: token },
		}).then(
			(like) => {
				// console.log(like);
			},
			(error) => {
				console.log(error);
			}
		);
	};

	// useEffect(() => {
	// 	Axios.get("http://localhost:5000/api/dislikes/", {
	// 		headers: { Authorization: token },
	// 	}).then(
	// 		(result) => {
	// 			console.log(result.data.data.length);
	// 			setDislikes(result.data.data.length);
	// 		},
	// 		(error) => {
	// 			console.log(error);
	// 		}
	// 	);
	// }, [token]);

	// const handleDisLike = () => {
	// 	Axios.post("http://localhost:5000/api/dislikes/dislike/" + id, {
	// 		headers: { Authorization: token },
	// 	}).then(
	// 		(dislike) => {
	// 			// console.log(dislike);
	// 			// setDislikes(dislike.data.length);
	// 		},
	// 		(error) => {
	// 			console.log(error);
	// 		}
	// 	);
	// };

	// return (
	// 	<>
	// 		{likes.map((Like, key) => {
	// 			if (Like.PostId === post.post.id) {
	return (
		<div className="post__bottomLeft">
			<div className="post__bottomLeft__icons">
				<button className="post__bottomLeft__btn" onClick={handleLike}>
					<Image src="../assets/like.png" className="post__bottomLeft__icon" />
				</button>
				<span className="post__bottom__text likeCount">
					{allLikes && allLikes.length ? allLikes.length : 0}
				</span>
				{/* <span className="post__bottom__text likeCount">0</span> */}
			</div>
			{/* <div className="post__bottomLeft__icons">
				<button className="post__bottomLeft__btn" onClick={handleDisLike}>
					<Image src="../assets/dislike.png" className="post__bottomLeft__icon" />
				</button>
				<span className="post__bottom__text dislikeCount">{dislikes ? dislikes : "0"}</span>
			</div> */}
		</div>
	);
	// 			} else {
	// 				return null;
	// 			}
	// 		})}
	// 	</>
	// );
}
