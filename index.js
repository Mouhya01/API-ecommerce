const http=require('http')

const app=require('./app')

//Pour utiliser les donnés sensible contenu dans le fichier .env
require('dotenv').config()

const PORT=process.env.PORT || 3000

const server=http.createServer(app)

//Importation de la fonction de conenxion a la DB
const connectDB=require('./config/db')

//Demarrage du server uniquement si la DB est connecte
connectDB()
    .then(()=>{
        console.log(`Connexion a MongoDB reussie !!`)
        server.listen(PORT, ()=>{
            console.log(`Listening on port ${PORT}`)
        })
    })
    .catch((error)=>{console.log("Connexion a MongoDB échouée donc pas de server qui démarre")})
