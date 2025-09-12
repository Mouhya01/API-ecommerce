const express=require('express')

const app=express()

const productRouter=require('./routes/productRoutes')

const userRoutes=require('./routes/userRoutes')

const errorHandler=require('./middlewares/errorMiddleware')

//Middleware pour parser les donnée json envoyée par les requete POST
app.use(express.json())

//Routes
app.use('/api/products',productRouter)
app.use('/api/auth',userRoutes)

//Middleware global d'erreurs
app.use(errorHandler)

module.exports=app