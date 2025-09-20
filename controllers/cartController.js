const mongoose=require('mongoose')

const Cart=require('../models/Cart')

exports.createCart=(req,res,next)=>{
    const cart=new Cart({
        user:req.body.user,
        items: Array.isArray(req.body.items)? req.body.items :[],
    })

    cart.save()
        .then((savedCart)=>{
            res.status(201).json({message:"Panier crée avec succés", cart:savedCart})
        })
        .catch((error)=>next(error))
}

exports.getCart=(req,res,next)=>{
    const user=req.body.user

    if(!mongoose.Types.ObjectId.isValid(user)){
        return res.status(400).json({error:"Id utilisateur invalide"})
    }


    Cart.findOne({ user: user})
        .then((foundCart)=>{

            if(!foundCart){
                return res.status(404).json({message:"Aucun panier trouvé pour cet utilisateur"})
            }
            res.status(200).json({message:"Panier de l'utilisateur trouvé avec succés", cart:foundCart})
        })
        .catch((error)=>next(error))
}

exports.clearCart = (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Id invalide" });
    }

    
    Cart.findByIdAndUpdate(id, { items: [] }, { new: true })
        .then((updatedCart) => {
            if (!updatedCart) {
                return res.status(404).json({ message: "Panier non trouvé" });
            }
            res.status(200).json({ message: "Panier vidé avec succès", cart: updatedCart });
        })
        .catch((error) => next(error));
};

exports.modifyCart=(req,res,next)=>{
    const id=req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message:"L'ID est invalide."})
    }

    Cart.findByIdAndUpdate(id,req.body,{new:true , runValidators:true})
        .then((newCart)=>{
            if(!newCart){
                return res.status(404).json({message:"Cart non trouvée"})

            }

            res.status(200).json({message:"Cart modifier avec succés!", cart:newCart})
        })

        .catch((error)=>next(error))

}

exports.deleteCart=(req,res,next)=>{
    const id=req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message:"L'ID est invalide"})
    }

    Cart.findByIdAndDelete(id)

        .then((deletedCart)=>{
            if(!deletedCart){
                return res.status(404).json({message:"Panier non trouvé!!"})
            }

            res.status(200).json({message:"Panier supprimé avec succés!"})
        })
        .catch((error)=>next(error))
}