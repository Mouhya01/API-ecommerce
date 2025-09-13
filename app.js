const express=require('express')

const app=express()

//Importations des Routes pour la ressource produit
const productRouter=require('./routes/productRoutes')

//Importation des Routes pour la ressource user
const userRoutes=require('./routes/userRoutes')

//Importation des Routes pour la ressource order
const orderRoutes=require('./routes/orderRoutes')

const errorHandler=require('./middlewares/errorMiddleware')

//Middleware pour parser les donnée json envoyée par les requete POST
app.use(express.json())

//Routes
app.use('/api/products',productRouter)
app.use('/api/auth',userRoutes)
app.use('/api/orders',orderRoutes)

//Middleware global d'erreurs
app.use(errorHandler)

module.exports=app