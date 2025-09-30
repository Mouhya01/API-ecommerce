const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Routes CRUD pour les reviews
router.post('/', reviewController.createReview);          // Créer une review
router.get('/', reviewController.getAllReviews);          // Obtenir toutes les reviews
router.get('/:id', reviewController.getReviewById);       // Obtenir une review par ID
router.put('/:id', reviewController.updateReview);        // Modifier une review
router.delete('/:id', reviewController.deleteReview);     // Supprimer une review

module.exports = router;
