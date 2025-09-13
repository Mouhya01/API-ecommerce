const orderController=require('../controllers/orderController')

const express=require('express')

const router=express.Router()

//Ensemble des routes pour la ressource order

router.post('/',orderController.createOrder)
router.get('/',orderController.getOrders)
router.get('/:id',orderController.getOrderById)
router.put('/:id',orderController.modifyOrder)
router.delete('/:id',orderController.deleteOrder)

//Exportation des routes
module.exports=router