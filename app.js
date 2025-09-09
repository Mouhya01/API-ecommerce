const express=require('express')

const app=express()

//Importation depuis le fichier DB.js pour la connexion a la DB
const connectionDB=require('./config/db')

//Middleware pour parser les donnée json envoyée par les requete POST
app.use(express.json())


//route get test
app.get('/',(req,res)=>{
    res.status(200).json({message:"Le début marche correctement !!"})
})

module.exports=app