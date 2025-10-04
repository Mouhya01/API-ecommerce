const Coupon = require('../models/Coupon')

//Creer un nouveau coupon
exports.createCoupon = (req, res) => {
  const coupon = new Coupon(req.body)

  coupon.save()
    .then((savedCoupon) => {
      res.status(201).json(savedCoupon)
    })
    .catch((error) => {
      res.status(400).json({ message: 'Erreur lors de la création du coupon', error })
    })
}

//Récuperer tous les coupons
exports.getAllCoupons = (req, res) => {
  Coupon.find()
    .then((coupons) => {
      res.status(200).json(coupons)
    })
    .catch((error) => {
      res.status(400).json({ message: 'Erreur lors de la récupération des coupons', error })
    })
}

//Récuperer un coupon par ID
exports.getCouponById = (req, res) => {
  Coupon.findById(req.params.id)
    .then((coupon) => {
      if (!coupon) {
        return res.status(404).json({ message: 'Coupon non trouvé' })
      }
      res.status(200).json(coupon)
    })
    .catch((error) => {
      res.status(400).json({ message: 'Erreur lors de la récupération du coupon', error })
    })
}

//Mettre a jour un coupon
exports.updateCoupon = (req, res) => {
  Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedCoupon) => {
      if (!updatedCoupon) {
        return res.status(404).json({ message: 'Coupon non trouvé' })
      }
      res.status(200).json(updatedCoupon)
    })
    .catch((error) => {
      res.status(400).json({ message: 'Erreur lors de la mise à jour du coupon', error })
    })
}

//Supprimer un Coupon
exports.deleteCoupon = (req, res) => {
  Coupon.findByIdAndDelete(req.params.id)
    .then((deletedCoupon) => {
      if (!deletedCoupon) {
        return res.status(404).json({ message: 'Coupon non trouvé' })
      }
      res.status(200).json({ message: 'Coupon supprimé avec succès' })
    })
    .catch((error) => {
      res.status(400).json({ message: 'Erreur lors de la suppression du coupon', error })
    })
}
