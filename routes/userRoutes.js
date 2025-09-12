const express=require('express')

const router=express.Router()

const userControllers=require('../controllers/userController')


//Route pour l'inscription
router.post('/signup',userControllers.signup)

//Route pour la connexion
router.post('/login',userControllers.login)

//Route pour la deconnexion
router.post('/logout',userControllers.logout)


//exportation du router
module.exports=router