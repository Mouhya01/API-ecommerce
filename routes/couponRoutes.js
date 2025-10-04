const express = require('express')
const router = express.Router()

// Importation du controller Coupon
const couponController = require('../controllers/couponController')

//Importation du middleware d'auth
const { auth, isAdmin } = require('../middlewares/auth')

// Créer un nouveau coupon
router.post('/',auth, isAdmin, couponController.createCoupon)

// Récupérer tous les coupons
router.get('/', couponController.getAllCoupons)

// Récupérer un coupon par son ID
router.get('/:id', couponController.getCouponById)

// Mettre à jour un coupon
router.put('/:id',auth, isAdmin, couponController.updateCoupon)

// Supprimer un coupon
router.delete('/:id',auth, isAdmin, couponController.deleteCoupon)

// Export du router
module.exports = router
