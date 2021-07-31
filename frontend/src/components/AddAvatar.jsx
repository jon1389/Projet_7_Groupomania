import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";

export default function AddAvatar() {
	const [image, setImage] = useState(null);
	const [preview, setPreview] = useState(null);
	const userImg = useRef();

	const addImageBtn = () => {
		userImg.current.click();
	};

	useEffect(() => {
		if (image) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(image);
		} else {
			setPreview("../assets/black_avatar.png");
		}
	}, [image]);

	const handleImageChange = (e) => {
		const selected = e.target.files[0];
		if (selected) {
			setImage(selected);
		} else {
			setImage(null);
		}
	};
	return (
		<Form.Group className="signup__avatar text-center">
			<Image src={preview} className="signup__avatar__img" roundedCircle />
			<input
				type="file"
				accept="image/*"
				name="userImg"
				id="image"
				onChange={handleImageChange}
				ref={userImg}
				style={{ display: "none" }}
			/>
			<Button className="avatar__btn" onClick={addImageBtn}>
				Ajouter une photo
			</Button>
		</Form.Group>
	);
}
