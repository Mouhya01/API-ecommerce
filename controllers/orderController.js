const mongoose=require('mongoose')

const Order=require('../models/Order')


//creation d'une commande
exports.createOrder=(req,res,next)=>{
    const order=new Order({
        userId: req.body.userId,
        products: req.body.products,
        totalPrice: req.body.totalPrice
    })
    order.save()
        .then((savedOrder)=>{
            res.status(201).json({message: "Commande passe avec succés!!",order:savedOrder})
        })
        .catch((error)=>next(error))
}

//lecture de toutes les commandes
exports.getOrders=(req,res,next)=>{
    Order.find()
        .then((order)=>{
            res.status(200).json({order})
        })
        .catch((error)=>next(error))
}

//lecture des commandes par identifiant

exports.getOrderById=(req,res,next)=>{
    const id=req.params.id

    //Verifie que l'ID est un objectID valide
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'ID invalide'})
    }

    Order.findById(id)
        .then((order)=>{
            if(!order){
                return res.status(400).json({message: "Commandes non trouvée!!"})
            }
            res.status(200).json({message: "Commande trouvée avec succés!!",order:order})
        })
        .catch((error)=>next(error))

}

//Modifier une commande
exports.modifyOrder=(req,res,next)=>{
    const id=req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({error:'ID invalide'}) 
    }

    Order.findByIdAndUpdate(id,req.body,{new: true, runValidators:true})
        .then((updatedOrder=>{
            if(!updatedOrder){
                return res.status(404).json({message:"Commande non trouvée!"})
            }

            res.status(200).json({message:"Commande modifié avec succés!", order:updatedOrder})

        }))

        .catch((error)=>next(error))
}


//Supprimer une commande
exports.deleteOrder=(req,res,next)=>{
    const id=req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"Id invalide"})
    }

    Order.findByIdAndDelete(id)
        .then((deletedOrder)=>{
            if(!deletedOrder){
                return res.status(404).json({message:"Commande non trouvée!"})
            }

            res.status(200).json({message:"Commande supprimée avec succés!"})

        })

        .catch((error)=>next(error))
}