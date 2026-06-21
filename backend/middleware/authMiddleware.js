const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Récupérer le token du header Authorization
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Accès refusé. Aucun token fourni." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Ajoute l'ID utilisateur décodé à la requête
        next();
    } catch (error) {
        res.status(400).json({ message: "Token invalide ou expiré." });
    }
};

