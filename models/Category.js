const mongoose=require('mongoose')
const uniqueValidator=require('mongoose-unique-validator')

const CategorySchema=mongoose.Schema({
    name: {type:String , required:true, unique:true},
    description: {type:String},
    products: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
},{timestamps:true}
)

CategorySchema.plugin(uniqueValidator)

module.exports=mongoose.model("Category",CategorySchema)