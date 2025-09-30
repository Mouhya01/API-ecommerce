const express=require('express')

const app=express()

//Importations des Routes pour les differntes ressources
const productRoutes=require('./routes/productRoutes')
const userRoutes=require('./routes/userRoutes')
const orderRoutes=require('./routes/orderRoutes')
const cartRoutes=require('./routes/cartRoutes')
const categoryRoutes=require('./routes/categoryRoutes')
const reviewRoutes=require('./routes/reviewRoutes')

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
app.use('/api/reviews',reviewRoutes)

//Middleware global d'erreurs
app.use(errorHandler)

module.exports=app