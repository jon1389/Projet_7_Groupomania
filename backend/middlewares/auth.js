const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_ENCODED);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Le userId est invalide ! ';
        } 
        else {
            next();
        }
    } 
    catch {
        res.status(401).json({ error: new Error('La requête est invalide !')});
    }
    // try {
    //     // Checks for the presence of the Authorization header
    //     if (!req.headers.authorization) {
    //         throw 'Token d\'authentification manquant !';
    //     }

    //     const token = req.headers.authorization.split(' ')[1];
    //     const decodedToken = jwt.verify(token, process.env.TOKEN_ENCODED);
    //     const userId = decodedToken.userId;
    //     const userRoles = decodedToken.roles;

    //     // Checks if the user sent in request matches the one stored in the token
    //     if (req.body.userId && parseInt(req.body.userId, 10) !== userId) {
    //         throw 'Identifiant utilisateur invalide';
    //     } else {
    //         res.locals.userId = userId;
    //         next();
    //     }
    // } catch (error) {
    //     return res.status(400).json({ error })
    // }
};
