const fs = require('fs');

const db = require('../models');

exports.createPost = (req, res, next) => {
    const postTitle = req.body.postTitle;
    db.Post.create({
        postTitle,
        // // ownerId: res.locals.userId,
        postImg: ( req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : null ),
    })
        .then(post => res.status(201).json({ post }))
        .catch(err => {
            res.send('ERROR: ' + err)
        });
}