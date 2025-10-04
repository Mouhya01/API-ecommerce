const Review = require('../models/Review')
const mongoose = require('mongoose')
const Product = require('../models/Product')

exports.createReview = (req, res, next) => {
    const { user, product, rating, comment } = req.body  

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: "La note doit être comprise entre 1 et 5" })
    }

    const review = new Review({
        user: user,
        product: product,
        rating: rating,
        comment: comment,
    })

    review.save()
        .then((savedReview) => {
            //recalcul automatique du rating du produit
            return Review.find({ product: savedReview.product })
                .then((reviews) => {
                    const count = reviews.length
                    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / count
                    return Product.findByIdAndUpdate(savedReview.product, { numReviews: count, rating: avg })
                        .then(() => {
                            res.status(201).json({ message: "Votre review a été créée avec succès", review: savedReview })
                        })
                })
        })
        .catch((error) => next(error))
}

exports.getAllReviews = (req, res, next) => {
    Review.find().populate('product').populate('user')
        .then((reviews) => {
            res.status(200).json({ message: "Reviews trouvées avec succès", review: reviews })
        })
        .catch((error) => next(error))
}

exports.getReviewById = (req, res, next) => {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID invalide" })
    }

    Review.findById(id)
        .then((review) => {
            if (!review) {
                return res.status(404).json({ message: "Review introuvable" })
            }
            res.status(200).json({ message: "Review trouvée avec succès", review: review })
        })
        .catch((error) => next(error))
}

exports.updateReview = (req, res, next) => {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID invalide" })
    }

    const { rating, comment } = req.body

    if (rating !== undefined && (rating < 1 || rating > 5)) {  
        //on vérifie seulement si rating est fourni
        return res.status(400).json({ message: "La note doit être comprise entre 1 et 5" })
    }

    Review.findById(id)
        .then(review => {
            if (!review) {
                return res.status(404).json({ message: "Review introuvable" })
            }

            if(review.user.toString()!==req.user.userId && req.user.role !== 'admin'){
                return res.status(403).json({message:"Action non autorisée"})
            }

            if (rating !== undefined) review.rating = rating   
            if (comment !== undefined) review.comment = comment

            return review.save()
                .then((updatedReview) => {
                    //recalcul du rating produit après update
                    return Review.find({ product: updatedReview.product })
                        .then((reviews) => {
                            const count = reviews.length
                            const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / count
                            return Product.findByIdAndUpdate(updatedReview.product, { numReviews: count, rating: avg })
                                .then(() => {
                                    res.status(200).json({ message: "Review mise à jour avec succès", review: updatedReview })
                                })
                        })
                })
        })
        .catch((error) => next(error))
}

exports.deleteReview = (req, res, next) => {
    const id = req.params.id

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID invalide" })
    }

    Review.findById(id)
        .then((review) => {
            if (!review) {
                return res.status(404).json({ message: "Review introuvable" })
            }


            return review.remove()   
                .then(() => {
                    // recalcul rating produit après suppression
                    return Review.find({ product: review.product })
                        .then((reviews) => {
                            const count = reviews.length
                            const avg = count > 0
                                ? reviews.reduce((sum, r) => sum + r.rating, 0) / count
                                : 0

                            return Product.findByIdAndUpdate(review.product, { numReviews: count, rating: avg })
                                .then(() => {
                                    res.status(200).json({ message: "Review supprimée avec succès" })
                                })
                        })
                })
        })
        .catch((error) => next(error))
}
