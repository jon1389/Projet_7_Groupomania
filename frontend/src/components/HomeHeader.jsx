import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Image } from "react-bootstrap";
import { useEffect } from "react";
import Axios from "axios";
import { Logout } from "./Logout";
import jwt_decode from "jwt-decode";

export default function HomeHeader() {
	const url = "http://localhost:5000/avatars/";

	const [user, setUser] = useState("");

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
			// console.log(decoded);
		});
	}, []);

	return (
		<header className="homeHeader">
			<Container className="homeHeader__container">
				<a href="./home" className="homeHeader__logo">
					<img src="./assets/icon-white-small.png" className="homeHeader__logo1" alt="Logo" />
					<img
						src="./assets/icon-left-font-monochrome-white.svg"
						className="homeHeader__logo2"
						alt="Logo"
					/>
				</a>
				<nav className="homeHeader__navbar">
					<a href="/profile" className="homeHeader__navbar__links">
						<Image
							src={user.userImg ? url + user.userImg : "../assets/white_avatar.png"}
							className="homeHeader__navbar__icon"
							roundedCircle
						/>
						{/* <Image src="../assets/white_avatar.png" className="homeHeader__navbar__icon" roundedCircle/> */}
						{/* <span className='homeHeader__navbar__text'>nom</span> */}
						<span className="homeHeader__navbar__text">
							{user.firstname} {user.lastname}
						</span>
					</a>
					<a href="/logout" className="homeHeader__navbar__links" onClick={Logout}>
						<FontAwesomeIcon icon={faSignOutAlt} size="2x" className="homeHeader__navbar__avatar" />
						<span className="homeHeader__navbar__text">Se déconneter</span>
					</a>
				</nav>
			</Container>
		</header>
	);
}
