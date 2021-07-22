import React from 'react'
import { Image } from 'react-bootstrap'

export default function Comment() {
    return (
        <div className="comment">
        <hr />
        <div className="comment__area">
            <Image src="./assets/black_avatar.png" className="comment__avatar" roundedCircle/>
            <div className="comment__comment">
                <div className="comment__name">Nom de l'utilisateur</div>
                <div className="comment__text">Commentaire</div>
            </div>
        </div>
        <hr />
        <div className="sendComment">
            <input as="textarea" className="sendComment__input" placeholder="Écrivez un commentaire ..."/>
            <Image src="./assets/plus.png" className="sendComment__icon" roundedCircle role="button"/>
        </div>
    </div>
    )
}
