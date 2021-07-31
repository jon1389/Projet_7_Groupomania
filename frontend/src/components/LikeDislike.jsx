import React from "react";
import { Image } from "react-bootstrap";

export default function LikeDislike() {
	return (
		<div className="post__bottomLeft">
			<div className="post__bottomLeft__icons">
				<button className="post__bottomLeft__btn">
					<Image src="../assets/like.png" className="post__bottomLeft__icon" />
				</button>
				<span className="post__bottom__text likeCount">0</span>
			</div>
			<div className="post__bottomLeft__icons">
				<button className="post__bottomLeft__btn">
					<Image src="../assets/dislike.png" className="post__bottomLeft__icon" />
				</button>
				<span className="post__bottom__text dislikeCount">0</span>
			</div>
		</div>
	);
}
