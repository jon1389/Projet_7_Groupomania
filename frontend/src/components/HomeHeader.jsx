import React from 'react';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import { Image } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from 'axios';

export default function HomeHeader() {

    useEffect(() => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; token=`);
        const token = parts.pop().split(';').shift();
        axios.get(`http://localhost:5000/api/auth/user`,{
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }).then((response) => {
            console.log(response);
        });
    }, []);

    const logout = () => {
        document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
        return document.location.href = '/login';
    }

	return <header className='homeHeader'>
        <Container className="homeHeader__container">
            <a href="./home" className='homeHeader__logo' >
                <img src="./assets/icon-white-small.png" className='homeHeader__logo1' alt='Logo'/>
                <img src="./assets/icon-left-font-monochrome-white.svg" className='homeHeader__logo2' alt='Logo'/>
            </a>
            <nav className='homeHeader__navbar'>
                <a href="/login" className='homeHeader__navbar__links'>
                <Image src="../assets/white_avatar.png" className="homeHeader__navbar__icon" roundedCircle/>
                <span className='homeHeader__navbar__text'>Nom de l'utilisateur</span>
                </a>
                <a href="/logout" className='homeHeader__navbar__links' onClick={logout}>
                    <FontAwesomeIcon icon={faSignOutAlt} size="2x" className="homeHeader__navbar__avatar"/>
                    <span className='homeHeader__navbar__text'>Se déconneter</span>
                </a>
            </nav>
        </Container>
    </header>
}
