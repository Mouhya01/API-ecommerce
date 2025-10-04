// middleware/auth.js
const jwt = require('jsonwebtoken');

/**
 * Middleware d'authentification
 * Vérifie que l'utilisateur envoie un token JWT valide
 */
const auth = (req, res, next) => {
  try {
    // Récupération du token depuis les headers
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Token manquant, accès non autorisé' });
    }

    // Vérification et décodage du token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken; // On attache l'utilisateur décodé à la requête

    next(); // on passe au prochain middleware ou au controller
  } catch (error) {
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};

/**
 * Middleware d'autorisation admin
 * Vérifie que l'utilisateur est un admin
 */
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Accès réservé aux administrateurs' });
};

module.exports = { auth, isAdmin };
