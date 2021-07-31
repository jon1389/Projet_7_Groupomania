const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, process.env.TOKEN_ENCODED);
		const userId = decodedToken.userId;
		// if (req.body.userId && req.body.userId !== userId) {
		if (req.body.userId && req.body.userId !== userId) {
			throw "Le userId est invalide ! ";
		} else {
			next();
		}
	} catch {
		console.log(req.body.userId);
		res.status(401).json({ error: new Error("La requête est invalide !") });
	}
};
