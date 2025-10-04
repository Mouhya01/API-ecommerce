const express = require('express')
const router=express.Router()
const categoryController=require('../controllers/categoryController')
const {auth,isAdmin}=require('../middlewares/auth')

//Créer une category
router.post('/',auth, isAdmin,categoryController.createCategory)

//Recuperer toute les catégorie
router.get('/',categoryController.getCategory)

//Recuper une categorie par son id
router.get('/:id',categoryController.getCategoryById)

//Modifier une category
router.put('/:id',auth, isAdmin, categoryController.updateCategory)

//Supprimer une categorie
router.delete('/:id',auth,isAdmin, categoryController.deleteCategory)


//Exportation des routes
module.exports=router