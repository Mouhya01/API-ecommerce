const express=require('express')

const app=express()

//Importations des Routes pour la ressource produit
const productRoutes=require('./routes/productRoutes')

//Importation des Routes pour la ressource user
const userRoutes=require('./routes/userRoutes')

//Importation des Routes pour la ressource order
const orderRoutes=require('./routes/orderRoutes')

//Importation des Routes pour la ressource Cart
const cartRoutes=require('./routes/cartRoutes')

//Importation des Routes pour la ressource Category
const categoryRoutes=require('./routes/categoryRoutes')

//Pour la gestion d'erreur
const errorHandler=require('./middlewares/errorMiddleware')

//Middleware pour parser les donnée json envoyée par les requete POST
app.use(express.json())

//Routes
app.use('/api/products',productRoutes)
app.use('/api/auth',userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/carts',cartRoutes)
app.use('/api/categories',categoryRoutes)

//Middleware global d'erreurs
app.use(errorHandler)

module.exports=app