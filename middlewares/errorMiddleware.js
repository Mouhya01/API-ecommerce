// middlewares/errorMiddleware.js

/**
 * Middleware global de gestion des erreurs
 * ----------------------------------------
 * - Intercepte toutes les erreurs envoyées avec "next(error)"
 * - Centralise leur format de réponse
 * - Evite de répéter res.status(...).json(...) partout dans le code
 */
function errorHandler(err, req, res, next) {
    // Si le statut est déjà défini dans l'erreur, on le garde
    // Sinon on utilise 500 par défaut (erreur serveur)
    const statusCode = err.statusCode || 500;

    // Message d'erreur (utilise celui fourni sinon message générique)
    const message = err.message || "Une erreur est survenue sur le serveur.";

    // Réponse JSON uniforme
    res.status(statusCode).json({
        success: false,       // indique que la requête a échoué
        status: statusCode,   // le code HTTP
        message: message,     // le message explicatif
        // En mode développement, on peut renvoyer plus de détails (stack)
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
}

module.exports = errorHandler;
