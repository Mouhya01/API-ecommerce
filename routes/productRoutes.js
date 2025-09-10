const productController=require('../controllers/productController')

const express=require('express')

const router=express.Router()

//Creation des différente routes

router.post('/',productController.createProduct)
router.get('/',productController.getAllProducts)
router.get('/:id',productController.getProductById)
router.put('/:id',productController.modifyProduct)
router.delete('/:id',productController.deleteProduct)

//Exportation du router
module.exports=router