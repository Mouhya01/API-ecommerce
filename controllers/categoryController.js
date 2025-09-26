const Category=require('../models/Category')
const Product=require('../models/Product')
const mongoose=require('mongoose')

//Creation d'une category
exports.createCategory=(req,res,next)=>{

    const { name, description, products } = req.body
    //Verification de l'existence de la category
    Category.findOne({name})
        .then((existingCategory)=>{
            if(existingCategory){
                return res.status(400).json({message:"Cette catégorie existe déja",category:existingCategory})
            }

            const category=new Category({
                name,
                description,
                products:products || []
            })

            return category.save()
        })
        .then((savedCategory)=>{
            if(savedCategory){
                res.status(201).json({message:"Category créer avec succés",category:savedCategory})
            }
        })
        
        .catch((error)=>next(error))
            

        
    

}

exports.getCategory=(req,res,next)=>{
    Category.find()
        .sort({name:1})
        .populate('products')
        .then((category)=>{
            res.status(200).json({message:"Voici la liste de toute les categories:",category:category})

        })
        .catch((error)=>next(error))
}

exports.getCategoryById=(req,res,next)=>{
    const id=req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message:"ID invalide"})
    }

    Category.findById(id)
        .populate('products')
        .then((foundCategory)=>{
            if(!foundCategory){
                return res.status(404).json({message:"Category non-trouvée"})
            }
            res.status(200).json({message:"Category trouvée avec succés!",category:foundCategory})
        })
        .catch((error)=>next(error))
}

exports.updateCategory=(req,res,next)=>{
    const id=req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message:"ID invalide"})
    }

    Category.findByIdAndUpdate(id,req.body,{new:true , runValidators:true})
        .then((modifiedCategory)=>{
            if(!modifiedCategory){
                return res.status(404).json({message:"Category non trouvé"})
            }

            res.status(200).json({message:"Category mis a jour avec succés", category:modifiedCategory})
        })
        .catch((error)=>next(error))
}

exports.deleteCategory=(req,res,next)=>{
    const id=req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({message:"ID invalide"})
    }

    Category.findByIdAndDelete(id)
        .then((deletedCategory)=>{
            if(!deletedCategory){
                return res.status(404).json({message:"Category non trouvé pour la suppresion"})
            }

            res.status(200).json({message:"Category supprimé avec succés", category:deletedCategory})
        })
        .catch((error)=>next(error))
}