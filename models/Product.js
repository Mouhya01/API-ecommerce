const mongoose=require('mongoose')

const productSchema=mongoose.Schema({
    name:{type:String , required:true},
    description:{type:String},
    price:{type:Number, required:true},
    stock:{type:Number, required:true, default:0},
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    }, 
},
{ timestamps: true } // gère createdAt et updatedAt automatiquement
)

module.exports=mongoose.model('Product',productSchema)