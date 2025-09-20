const express=require('express')

const router=express.Router()

const cartController=require('../controllers/cartController')

//Ensemble des routes pour la ressource cart

//Recuperer un panier
router.get('/',cartController.getCart)

//Créer un nouveau panier
router.post('/',cartController.createCart)

//Modifier un panier
router.put('/:id',cartController.modifyCart)

//Vider complétement le panier
router.delete('/',cartController.clearCart)

//Supprimer un panier spécifique
router.delete('/:id',cartController.deleteCart)

//exportation des routes pour l'implémentation
module.exports=router