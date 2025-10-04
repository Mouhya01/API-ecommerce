const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
  // Code promo unique 
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },

  // Type de réduction : pourcentage (%) ou montant fixe
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },

  // Valeur de la réduction (ex: 20% ou 10€)
  discountValue: {
    type: Number,
    required: true,
    min: 1
  },

  // Date de début de validité
  startDate: {
    type: Date,
    default: Date.now
  },

  // Date d’expiration
  expiryDate: {
    type: Date,
    required: true
  },

  // Montant minimum de commande pour utiliser le coupon
  minimumOrderAmount: {
    type: Number,
    default: 0
  },

  // Nombre maximum d’utilisations globales (null = illimité)
  maxUses: {
    type: Number,
    default: null
  },

  // Nombre d’utilisations déjà effectuées
  usedCount: {
    type: Number,
    default: 0
  },

  // Coupon actif ou non
  isActive: {
    type: Boolean,
    default: true
  }
},
{ timestamps: true } // Ajoute createdAt et updatedAt automatiquement
)

module.exports = mongoose.model('Coupon', couponSchema)
