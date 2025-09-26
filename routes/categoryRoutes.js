const express = require('express')
const router=express.Router()
const categoryController=require('../controllers/categoryController')

//Créer une category
router.post('/',categoryController.createCategory)

//Recuperer toute les catégorie
router.get('/',categoryController.getCategory)

//Recuper une categorie par son id
router.get('/:id',categoryController.getCategoryById)

//Modifier une category
router.put('/:id',categoryController.updateCategory)

//Supprimer une categorie
router.delete('/:id',categoryController.deleteCategory)


//Exportation des routes
module.exports=router