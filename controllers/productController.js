const mongoose=require('mongoose')

const Product=require('../models/Product')


//Creer un nouveau produit
exports.createProduct=(req,res)=>{
    const product=new Product({
        name: req.body.name,
        description:req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        category: req.body.category
    })
    product.save()
        .then((savedProduct)=>{
            res.status(201).json({message:'Produit créer avec succés !!',product: savedProduct})
        })
        .catch((error)=>next(error))
}


//Lire tout les produit 
exports.getAllProducts=(req,res,next)=>{
    Product.find()
        .then((products)=>{
            res.status(200).json(products)
        })
        .catch((error)=>next(error))
}


//lire un produit par son id
exports.getProductById=(req,res,next)=>{
    const id=req.params.id


    //Verifie que l'ID est un objectID valide
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'ID invalide'})
    }

    Product.findById(id)
        .then((product)=>{

            //Si le produit n'est pas trouve
            if(!product){
                return res.status(404).json({error:'Produit non trouvé'})
            }
            res.status(200).json(product)
        })
        .catch((error)=>next(error))
}

//Modification d'un produit
exports.modifyProduct=(req,res,next)=>{
    const id=req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error:'ID invalide'})
    }

    //Modification et renvoie de l'objet modifier 
    Product.findByIdAndUpdate(id,req.body,{new: true, runValidators:true})
        .then((updatedProduct)=>{
            if(!updatedProduct){
                return res.status(404).json({error:'Produit non trouvé'})
            }

            res.status(200).json({
                message:'Produit modifé avec succés !',product:updatedProduct
            })
        })
        .catch((error)=>next(error))
    
}

//Suppression d'un produit
exports.deleteProduct = (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'ID invalide' });
  }

  Product.findByIdAndDelete(id)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Produit non trouvé' });
      }
      res.status(200).json({
        message: 'Produit supprimé avec succès !',
        product: deletedProduct
      });
    })
    .catch((error)=>next(error))
};