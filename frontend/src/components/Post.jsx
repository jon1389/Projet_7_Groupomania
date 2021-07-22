import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { register } from 'timeago.js';
import Comment from './Comment';
import ModifyPost from './ModifyPost'

export default function Post() {
    const Timeago = (number: number, index: number): [string, string] => {
        return [
            ["à l'instant", 'dans un instant'],
            ['il y a %s secondes', 'dans %s secondes'],
            ['il y a 1 minute', 'dans 1 minute'],
            ['il y a %s minutes', 'dans %s minutes'],
            ['il y a 1 heure', 'dans 1 heure'],
            ['il y a %s heures', 'dans %s heures'],
            ['il y a 1 jour', 'dans 1 jour'],
            ['il y a %s jours', 'dans %s jours'],
            ['il y a 1 semaine', 'dans 1 semaine'],
            ['il y a %s semaines', 'dans %s semaines'],
            ['il y a 1 mois', 'dans 1 mois'],
            ['il y a %s mois', 'dans %s mois'],
            ['il y a 1 an', 'dans 1 an'],
            ['il y a %s ans', 'dans %s ans'],
            ][index];
    }
    register('FR', Timeago);

    const [showComment, setShowComment] = useState(false);

    return <>
        <Container className="post" >
            <div className="post__container">
                <div className="post__top">
                    <div className="post__topLeft">
                        <img className="post__topLeft__img" src="./assets/black_avatar.png" alt="Profil" />
                        <span className="post__topLeft__username">
                            Nom de l'utilisateur                 
                        </span>
                        <span className="post__topLeft__date"> - posté </span>
                        {/* {format(value.createdAt, 'FR')} */}
                    </div>
                    <ModifyPost/>
                </div>
                <hr />
                <div className="post__center">
                    <span className="post__center__text">Titre de la publication</span>
                    <img className="post__center__img" src="./assets/beach.jpg" alt="Plage" />
                </div>
                <div className="post__bottom">
                    <div className="post__bottomLeft">
                        <div className="post__bottomLeft__icons">
                            <button className="post__bottomLeft__btn" >
                                <Image src="../assets/like.png" className="post__bottomLeft__icon" />
                            </button>
                            <span className="post__bottom__text likeCount">0</span>
                        </div>
                        <div className="post__bottomLeft__icons">
                            <button className="post__bottomLeft__btn" >
                                <Image src="../assets/dislike.png" className="post__bottomLeft__icon" />
                            </button>
                            <span className="post__bottom__text dislikeCount">0</span>
                        </div>
                    </div>
                    <button className="post__bottomRight" onClick={() => setShowComment(prev => !prev)}>
                        <Image src="../assets/comment.png" className="post__bottomRight__icon" />
                        <span className="post__bottom__text">0 commentaires</span>
                    </button>
                </div>
                    {showComment && <Comment/> }
            </div>
        </Container>
    </>
}
