const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const {auth, isAdmin}=require('../middlewares/authMiddleware')

// Routes CRUD pour les reviews
router.post('/',auth, reviewController.createReview);          // Créer une review
router.get('/', reviewController.getAllReviews);          // Obtenir toutes les reviews
router.get('/:id', reviewController.getReviewById);       // Obtenir une review par ID
router.put('/:id',auth, reviewController.updateReview);        // Modifier une review
router.delete('/:id',auth, isAdmin, reviewController.deleteReview);     // Supprimer une review

module.exports = router;
