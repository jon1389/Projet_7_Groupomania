import React from "react";
import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { Image } from "react-bootstrap";

export default function Header() {
	return (
		<header className="header">
			<Container className="header__container">
				<a href="./home" className="header__logo">
					<img src="./assets/icon-white-small.png" className="header__logo1" alt="Logo" />
					<img
						src="./assets/icon-left-font-monochrome-white.svg"
						className="header__logo2"
						alt="Logo"
					/>
				</a>
				<nav className="header__navbar">
					<a href="/login" className="header__navbar__links">
						<Image
							src="../assets/white_avatar.png"
							className="header__navbar__icon"
							roundedCircle
						/>
						<span>Se connecter</span>
					</a>
					<a href="/signup" className="header__navbar__links">
						<FontAwesomeIcon
							icon={faUserPlus}
							size="2x"
							className="header__navbar__icon"
						/>
						<span>Créer un compte</span>
					</a>
				</nav>
			</Container>
		</header>
	);
}
